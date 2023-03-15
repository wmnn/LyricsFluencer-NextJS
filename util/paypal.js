var base64 = require("base-64");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config()

const PAYPAL_CLIENT_ID = `${process.env.PAYPAL_CLIENT_ID}`
const PAYPAL_SECRET = `${process.env.PAYPAL_SECRET}`
const base = `${process.env.PAYPAL_BASE}`

async function generateAccessToken() {
    const auth = Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_SECRET).toString('base64')
    const res = await fetch(`${base}/v1/oauth2/token`, {
      method: "post",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    const data = await res.json();
    return data.access_token;
}

const verifyPaypalSubscription = async (subscriptionId) => {
    const access_token = await generateAccessToken()
    res = await fetch(`${base}/v1/billing/subscriptions/${subscriptionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data = await res.json();
    //console.log(data)
    //console.log("data " + JSON.stringify(data))
    return {
        status: data.status,
        plan_id: data.plan_id,
    }
}
const cancelPaypalSubscription = async(subscriptionId, reason) => {
  const access_token = await generateAccessToken()
    response = await fetch(`${base}/v1/billing/subscriptions/${subscriptionId}/cancel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        reason: reason
      })
    });
    const data = await response.json();
    return data
}
const getPaypalPlans = async() => {
  const accessToken = await generateAccessToken();
  var planData

  await fetch(`${base}/v1/billing/plans/?page_size=10&page=1`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error retrieving products');
    }
    return response.json();
  })
  .then(data => {
    //console.log('Product data:', data);
    planData = data
  })
  .catch(error => {
    console.error(error);
  });
  return planData
  }
const createPaypalProduct = async () => {
  const access_token = await generateAccessToken();
  response = await fetch(`${base}/v1/catalogs/products`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
        "name": "Premium Plan", //required
        "type": "DIGITAL", // required type can be PHYSICAL, SERVICE or DIGITAL
        //"description": "Cotton XL", //not required, description of the product
        //"id": "{{$timestamp}}", //not required
        //"category": "CLOTHING", //not required view docs for all possible variants
        //"image_url": "https://example.com/gallary/images/{{$timestamp}}.jpg", //not required
        //"home_url": "https://example.com/catalog/{{$timestamp}}.jpg" //not required
    })
  });
  const data = await response.json();
  return data
}
const getPaypalProducts = async () => {
    const access_token = await generateAccessToken();
    console.log(access_token)
    response = await fetch(`${base}/v1/catalogs/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data = await response.json();
    return data
}    
const createPaypalPlan = async() => {
  const access_token = await generateAccessToken();
  const product_id = "PROD-0K61324219676230K"
        response = await fetch(`${base}/v1/billing/plans`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify({
            "product_id": product_id, //required
            "name": "LyricsFluencer Premium Plan", //required
            //"description": "Video Streaming Service basic plan", //not required
            "billing_cycles": [ //required
              {
                "frequency": {
                  "interval_unit": "MONTH",
                  "interval_count": 1 
                },
                "tenure_type": "REGULAR", //required, REGULAR OR TRIAL
                "sequence": 1, //what is this? The order in which this cycle is to run among other billing cycles. For example, a trial billing cycle has a sequence of 1 while a regular billing cycle has a sequence of 2, so that trial cycle runs before the regular cycle.
                //"total_cycles": 12, //not required, amount of cycles 0=infinite
                "pricing_scheme": {
                  "fixed_price": {
                    "value": "19.99", 
                    "currency_code": "EUR" //usually EUR or USD
                    }
                }
              }
            ],
            "payment_preferences": { //required
              "auto_bill_outstanding": true, //Indicates whether to automatically bill the outstanding amount in the next billing cycle.
              "setup_fee": { //The initial set-up fee for the service.
                "value": "0", 
                "currency_code": "EUR"
              },
              "setup_fee_failure_action": "CANCEL", //CONTINUE or CANCEL => The action to take on the subscription if the initial payment for the setup fails.
              "payment_failure_threshold": 0 //The maximum number of payment failures before a subscription is suspended.
            },
      //			"taxes": { //not required
      //		    "percentage": "10",
      //		    "inclusive": false
      //		  }
          })
        });
        const data = await response.json();
        return data
}
  
module.exports = {generateAccessToken, verifyPaypalSubscription, cancelPaypalSubscription, getPaypalPlans, createPaypalProduct, createPaypalPlan, getPaypalProducts}