const router = require("express").Router();
const { db, admin, verifyToken } = require("../util/firebase");
const { generateAccessToken, getSubscription, cancelSubscription, getPlans} = require("../util/paypal.js")

function routes(app) {
    router.get("/capture/paypal", async (req,res) => {
        const {subscriptionId, token, plan } = req.query;
        const uid = await verifyToken(token)
        if (!uid){
            return res.json({ message: 'Invalid token' });
        }      
        //Check the plan on paypal
        const subscriptionDetails = await getSubscription(subscriptionId)
    
        //Save the user into db
        const data = {
            subscriptionId: subscriptionId,
            subscriptionPlan: plan,
            subsciptionPlanId: subscriptionDetails.plan_id,
            subscriptionStatus: subscriptionDetails.status
        }
        try {
            await db.collection("users").doc(uid).set(data, {merge: true})
            res.redirect("/appstore")
        } catch (e) {
            return res.json({ message: 'Internal Error' });
        }
      })
      
      // router.post("/cancel/paypal", async (req, res) => { 
      //   const subsciptionId = req.body.subsciptionId
      //   const reason = req.body.reason 
      //   cancelSubscription(subsciptionId, reason)
      //   return res.json({status: 200})
      // })
      router.get("/plan", async (req,res) => {
        //this route gives back the current plan of the user
        console.log("REQEUEST")
        
        const uid = await verifyToken(req.query.token)
        const user = await db.collection("users").doc(uid).get()
        if(!user._fieldsProto){ //If no document is found create a document with a free plan
          const data = {
            subscriptionPlan: "free"
          }
          await db.collection("users").doc(uid).set(data)
          return res.json({ status: 200, subsciptionPlan : "free"})
        }
        if (user._fieldsProto.subscriptionPlan.stringValue == "free") { 
          return res.json({status: 200, subscriptionPlan: "free"})
        }
        
        var subscriptionId = user._fieldsProto.subscriptionId.stringValue
        var subscriptionDetails = await getSubscription(subscriptionId)
        if (user._fieldsProto.subscriptionStatus != subscriptionDetails.status){ //If they don't match update the subscription in the db
          const data = {
            subscriptionStatus: subscriptionDetails.status
          }
          await db.collection("users").doc(uid).set(data, {merge: true})
        }
        console.log(subscriptionId)
        return res.json({status: 200, subscriptionPlan: user._fieldsProto.subscriptionPlan.stringValue, subscriptionId: subscriptionId, subscriptionPlanId: subscriptionDetails.plan_id, subscriptionStatus: subscriptionDetails.status})
      })
      // router.get("/plans", async (req,res) => {
      //   getPlans();
      //   return res.json({status: 200})
      // })
 

  return router;
}

module.exports = routes;