const { stripeSecretKey } = require("../config")
const stripe = require("stripe")(stripeSecretKey)
const endpointSecret = "whsec_574b5e6d71b2db24901e07ba1e8a43d6226b98dc672b982bc3f69f45c060a5b0";

class Payments{
    
    // Payment session
    async createIntent(amount){
        const intent = await stripe.paymentIntents.create({
            amount,//price
            currency:"usd" // "mxn", "cop", "ar$","eur"
        })

        //consulta ´para guardar costumer

        return intent.client_secret
    }

    async confirm(data,signature){
        let event;
        try {
            event=stripe.webhooks.constructEvent(data,signature,endpointSecret)
            
        } catch (err) {
            return{sucess:false,message:`Webhook Error : ${err.message}`}
        }
    

        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                console.log(paymentIntent)
                // Then define and call a function to handle the event payment_intent.succeeded
            break;
            // ... handle other event types
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
        return {
            success:true,
            message:'OK'
        }
    }
}

module.exports = Payments;