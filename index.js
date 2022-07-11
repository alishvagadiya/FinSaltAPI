const express = require('express');
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require('body-parser')

const { dbConnect } = require("./db/connect.js")
const signup = require("./routes/signup.router")
const login = require("./routes/login.router")
const user = require("./routes/user.router")
const category = require("./routes/category.router")
const advisor = require("./routes/advisor.router")
const cart = require("./routes/cart.router")

const app = express();
const PORT = 3000;
app.use(cors())
app.use(bodyParser.json());

dbConnect();
// called before any route handler

app.use("/signup", signup);
app.use("/login", login);
app.use("/userdetails", user);
app.use("/category", category);
app.use("/advisor", advisor);
app.use("/cart", cart);

app.get('/', (req, res) => {
  res.json({ "postman Api Collection link": "https://www.postman.com/alishvagadiya/workspace/portfolio-projects/collection/19525837-4ea872bc-2618-46f2-a112-8ad0a2754afa?ctx=documentation"})
});

// Error Handler
// Don't move
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "error occured, see the errMessage key for more details", errorMessage: err.message})
})

//  404 Route Handler
//  Note: Do NOT move. This should be the last route
app.use((req, res) => {
  res.status(404).json({ success: false, message: "route not found on server, please check"})
})

app.listen(PORT, () => {
  console.log('server started on port: ', PORT);
});