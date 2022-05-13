const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();
const ProductInfo = require('./models/ProductInfo')
const app = express();
const port = process.env.PORT || 5000;

// app.use(cors);
mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.uk9xj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
    .then(() => {
        console.log("Database Integration");
    })
    .catch((error) => {
        console.log(error);
    })
app.get("/", (req, res) => {
    res.json({ statusCode: 200, message: "Welcome to DQ" });
});

//This is an optional route that can be used in future in case of addition of new Products is required
app.get('/create', async (req, res) => {
    const barcodeId= req.query.barCodeID;
    const Name= req.query.Name;
    const ProductType= req.query.productType;
    const Quantity= req.query.quantity;
    const MRP= req.query.mrp;
    const imageURL= req.query.imageURL;
    const newProduct = await ProductInfo.create({
        barcodeId,
        Name,
        ProductType,
        Quantity,
        MRP,
        imageURL
    })
    res.json({statusCode:200, data: newProduct});
})

app.get("/product", async (req, res) => {
    const barCodeID=req.query.barCodeID;
    try {
        const info = await ProductInfo.find({barcodeId:barCodeID});
        res.json({ statusCode: 200, data: info });
    } catch (error) {
        res.json({ statusCode: 400, data: error });
    }
});

app.listen(port, () => {
    console.log("Welcome to Dequeue!!");
    console.log("=====================");
    console.log("-------------------------------");
    console.log(`| Server running at port ${port} |`);
    console.log("-------------------------------");
});
