const router = require("express").Router();
const paypal = require('paypal-rest-sdk');


function routes(app) {
    
paypal.configure({
    mode: 'sandbox', // or 'live'
    client_id:`${process.env.PAYPAL_CLIENT_ID}`,
    client_secret: `${process.env.PAYPAL_API_SECRET}`,
  });
    /*
    router.get("/plan", async (req, res) => {
      //const data = await handleSearch(req.body.searchQuery);
      
      paypal.Subscription.get('SUBSCRIPTION_ID').then(function(subscription) {
        // Handle the subscription details
        console.log('Subscription ID: ' + subscription.id);
        console.log('Plan ID: ' + subscription.plan_id);
        console.log('Billing Cycle: ' + subscription.billing_info.cycle_executions[0].frequency);
        console.log('Payment Status: ' + subscription.status);
      }).catch(function(error) {
        // Handle any errors
        console.error('Error retrieving subscription details:', error);
    });
    
      res.json({ status: 200, data: "NONE" });
    });
    */
    return router;
}

module.exports = routes;
