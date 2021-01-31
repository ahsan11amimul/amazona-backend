// require core module from package
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// initialize app
const app = express();
// middleware configuration
app.use(cors());
app.use(express.json({ extented: true }));
app.use(express.urlencoded({ extended: true }));
// Database connection && Port Creation
const port = process.env.PORT || 5000;
const connectionString = require('./config/keys').connectionString;
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        app.listen(port, () => console.log('Server is running well!!'))
    }).catch(error => console.log(error.message));



// api routes
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/order');
app.use('/api/', productRoutes);
app.use('/api/', userRoutes);
app.use('/api/', orderRoutes);
//greeting routes
app.get('/', (req, res) => {
    res.send('<h1>Wellcome to my Mern E-commerce App</h1>');
});