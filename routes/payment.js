const router = require("express").Router();
const { db, admin, verifyToken, deleteUser} = require("../util/firebase");
const { generateAccessToken, verifyPaypalSubscription, cancelPaypalSubscription, getPaypalPlans, createPaypalPlan, getPaypalProducts, createPaypalProduct} = require("../util/paypal.js")
const { createStripeSession, createStripeCustomer, verifyStripeSubscription } = require("../util/stripe.js")

function routes(app) {
    router.get("/capture/paypal", async (req,res) => {
        const {subscriptionId, token } = req.query;
        const plan = "premium"
        const { uid }  = await verifyToken(token)
        if (!uid){
            return res.json({ message: 'Invalid token' });
        }      
        //Check the plan on paypal
        const subscriptionDetails = await verifyPaypalSubscription(subscriptionId)
    
        //Save the user into db
        const data = {
            subscriptionId: subscriptionId,
            subscriptionPlan: plan,
            subscriptionProvider: "PAYPAL",
            subscriptionStatus: subscriptionDetails.status
        }
        try {
            await db.collection("users").doc(uid).set(data, {merge: true})
            res.redirect("/onboarding/appstore")
        } catch (e) {
            return res.json({ message: 'Internal Error' });
        }
      })
      router.get("/getPaypalPlans", async (req,res) => {
          const data = await getPaypalPlans();
          return res.json({status: 200, data: data})
      })
      router.get("/getPaypalProducts", async (req,res) => {
        const data = await getPaypalProducts();
        return res.json({status: 200, data: data})
      })
      /*router.get('/createPaypalProduct', async (req,res) => {
        const data = await createPaypalProduct();
        return res.json({status: 200, data: data})
      });
      router.get('/createPaypalPlan', async (req,res) => { //creates a plan
        const data = await createPaypalPlan();
        return res.json({data: data})
      })*/

      router.get("/cancel/paypal", async (req, res) => { 
        const { token } = req.query;
        const reason = "LOREM IPSUM"
        const { uid }  = await verifyToken(token)
        if (!uid){
          return res.json({ message: 'Invalid token' });
        }  
        const user = await db.collection("users").doc(uid).get()
        if(!user._fieldsProto){ //If no document is found create a document with a free plan
          return res.json({status: 404})
        }
        if (user._fieldsProto.subscriptionProvider.stringValue == "PAYPAL" && user._fieldsProto.subscriptionStatus.stringValue != "EXPIRED"){
          const data = await cancelPaypalSubscription(user._fieldsProto.subscriptionId.stringValue, reason) 
          return res.json({status: 200})
        }
      })
      router.delete("/account", async (req,res) => { //Delete account endpoint
        const { token } = req.query;
        const reason = "LOREM IPSUM"
        const { uid }  = await verifyToken(token)
        if (!uid){
          return res.json({ message: 'Invalid token' });
        }  
        const user = await db.collection("users").doc(uid).get()
        if(!user._fieldsProto){ //If no document is found create a document with a free plan
          return res.json({status: 404})
        }
        console.log(user._fieldsProto)
        if (user._fieldsProto.subscriptionPlan.stringValue == "special" || user._fieldsProto.subscriptionPlan.stringValue == "free"){
          await deleteUser(uid);
          return res.json({status: 200})
        }
        if (user._fieldsProto.subscriptionProvider.stringValue == "PAYPAL" && user._fieldsProto.subscriptionStatus.stringValue != "EXPIRED"){
          const data = await cancelPaypalSubscription(user._fieldsProto.subscriptionId.stringValue, reason)
        }
        await deleteUser(uid);
          return res.json({status: 200})
      })
      router.get("/stripe", async (req,res) => {
        const productId = process.env.STRIPE_PRICE_ID
        const { token } = req.query
        const { uid, email } = await verifyToken(token)
        if (!uid){ //Not valid user
          return res.redirect("/")
        }
        const costumer_id = await createStripeCustomer(email)
        const sessionUrl = await createStripeSession(productId, `${process.env.ROOT}/payment/capture/stripe?token=${token}&costumer_id=${costumer_id}`, costumer_id);
        return res.redirect(sessionUrl) //redirecting the user to the stripe checkout
      })

      router.get("/capture/stripe", async (req,res) => {
          const { token , costumer_id } = req.query
          const { uid } = await verifyToken(token)
          if (!uid){
            return res.redirect("/")
          }
          const subscription = await verifyStripeSubscription(costumer_id);
          if( subscription.data[0].status == "active"){
            //Add to db
            const data = {
              subscriptionId: costumer_id,
              subscriptionPlan: "premium",
              subscriptionProvider: "STRIPE",
              subscriptionStatus: "ACTIVE"
            }
            try {
                await db.collection("users").doc(uid).set(data, {merge: true})
                return res.redirect("/onboarding/appstore")
            } catch (e) {
                return res.json({ message: 'Internal Error' });
            } 
          }
      })
      router.get("/plan", async (req,res) => {
        //this route verifies the current plan of the user    
        const { uid }  = await verifyToken(req.query.token)
        const user = await db.collection("users").doc(uid).get()
        if(!user._fieldsProto){ //If no document is found create a document with a free plan
          const data = {
            subscriptionPlan: "free"
          }
          await db.collection("users").doc(uid).set(data)
          return res.json({ status: 200, subscriptionPlan : "free"})
        }
        if (user._fieldsProto.subscriptionPlan.stringValue == "free") { 
          return res.json({status: 200, subscriptionPlan: "free"})
        }
        if (user._fieldsProto.subscriptionPlan.stringValue == "special") { 
          return res.json({status: 200, subscriptionPlan: "special"})
        }
        var firebaseSubscriptionId = user._fieldsProto.subscriptionId.stringValue
        var firebaseSubscriptionProvider = user._fieldsProto.subscriptionProvider.stringValue
        var firebaseSubscriptionStatus = user._fieldsProto.subscriptionStatus.stringValue
        //Different handling based on the subscription Service
        if (firebaseSubscriptionProvider == "PAYPAL"){
          var paypalSubscriptionDetails = await verifyPaypalSubscription(firebaseSubscriptionId) //Current subscription details
          if (firebaseSubscriptionStatus != paypalSubscriptionDetails.status){ //If the db status don't match with the status of the api update the subscription in the db
            const data = {
              subscriptionStatus: paypalSubscriptionDetails.status
            }
            await db.collection("users").doc(uid).set(data, {merge: true})
          }
          return res.json({status: 200, subscriptionPlan: user._fieldsProto.subscriptionPlan.stringValue, subscriptionId: firebaseSubscriptionId, subscriptionPlanId: paypalSubscriptionDetails.plan_id, subscriptionStatus: paypalSubscriptionDetails.status})
        }else if(firebaseSubscriptionProvider == "STRIPE"){
          const stripeSubscriptionDetails = await verifyStripeSubscription(firebaseSubscriptionId);
          var stripeSubscriptionStatus = stripeSubscriptionDetails.data[0].status;
          if(stripeSubscriptionStatus == "active"){
            stripeSubscriptionStatus = "ACTIVE"
          }else{
            stripeSubscriptionStatus = "EXPIRED"
          }
          if( firebaseSubscriptionStatus != stripeSubscriptionStatus){
          
            const data = {
              subscriptionStatus: stripeSubscriptionStatus
            }
            await db.collection("users").doc(uid).set(data, {merge: true})
          } 
          return res.json({status: 200, subscriptionPlan: "premium", subscriptionId: firebaseSubscriptionId, subscriptionStatus: stripeSubscriptionStatus})
        }
      })
  return router;
}

module.exports = routes;