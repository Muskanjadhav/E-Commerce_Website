import express from "express";
import bcrypt from "bcrypt";
import stripe from 'stripe';

//init server
const app = express();

//middlewares
app.use(express.static("public"));
app.use(express.json()); //enables form sharing

//routes
//home route
app.get('/index', (req, res) => {
    res.sendFile("index.html", { root : "public" })
})

//Add-Product
app.get('/add-product', (req, res) => {
    res.sendFile("add-product.html", { root : "public" })
})

//dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile("dashboard.html", { root : "public" })
})

//product
app.get('/product', (req, res) => {
    res.sendFile("product.html", { root : "public" })
})

//search
app.get('/search', (req, res) => {
    res.sendFile("search.html", { root : "public" })
})

//seller
app.get('/seller', (req, res) => {
    res.sendFile("seller.html", { root : "public" })
})

//cart
app.get('/cart', (req, res) => {
    res.sendFile("cart.html", { root : "public" })
})

//checkout
app.get('/checkout', (req, res) => {
    res.sendFile("checkout.html", { root : "public" })
})

// login
app.get('/login', (req, res) => {
    res.sendFile("login.html", { root : "public" })
})


// signup
app.get('/signup', (req, res) => {
    res.sendFile("signup.html", { root : "public" })
})
//stripe payment
let stripeGateway = stripe(process.env.stripe_key);

let DOMAIN = process.env.DOMAIN;

app.post('/stripe-checkout', async(req, res) => {
    const session = await stripeGateway.checkout.sessions.create({
        payment_method_types:["card"],
        mode: "payment",
        success_url: '${DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}&order=${JSON.stringify(req.body)}',
        cancel_url: '${DOMAIN}/checkout',
        line_items:req.body.items.map(item =>{
            return{
                price_data: {
                    currency: "usd",
                    product_data:{
                        name: item.name,
                        description: item.shortDes,
                        images: [item.image]
                    },
                    unit_amount: item.price*100
                },
                quantity: item.item
            }
        })
    })
    res.json(session.url)
})
app.get('/success', (req, res)=>{
    let {order, session_id} = req.query;

    try{
        const session = await stripeGateway.checkout.session.retrieve(session_id);
        const custome = await stripeGateway.customers.retrieve(session.customer);

        let date = new Date();

        let orders_collection = collection(db, "orders");
        let docname = '${customer.email}-order-${date.getTIME()}';

        SetDoc(doc(orders_collection, docName), JSON.parse(order))
        .then(data =>{
            res.redirect('/checkout?payment=done')
        })
    }catch{
        res.redirect("/404");
    }
})
//404 route
app.get('./404', (req, res) => {
    res.sendFile("404.html", { root : "public"})
})

app.use((req, res) => {
    res.redirect('/404.html')
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})