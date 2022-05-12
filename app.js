 const express = require('express');
const app = express();
const port = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.json({ "statusCode": 200, message: "Welcome to DQ" });
});


app.listen(port, () => {
    console.log("Welcome to Dequeue!!");
    console.log("=====================");
    console.log("-------------------------------");
    console.log(`| Server running at port ${port} |`);
    console.log("-------------------------------");
});