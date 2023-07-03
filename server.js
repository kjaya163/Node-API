const express = require('express'); 

// Using Node.js `require()`
const mongoose = require('mongoose');
const Product = require('./models/productModel');
const app = express()


//routes
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.get('/', (req, res) => {
    res.send('Hello NODE API');
})

app.get('/blog', (req, res) => {
    res.send('This Is My Blog')
})

app.get('/testblog', (req, res) => {
    res.send('This Is My New Blog')
})

app.get('/product', async(req, res) =>{
  try {
    const product = await Product.find({})
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

app.post('/product', async(req, res) =>{
  try {
    const product = await Product.create(req.body)
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
})

app.get('/product/:id', async(req, res) => {
  try{
    const {id} = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  }catch(error){
    res.status(500).json({ message: error.message });
  }
})

app.put('/product/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if(!product){
      return res.status(404).json({ message: `connot find any product with ID: ${id}` });
    }
    const updatedProduct = await Product.findById(id);

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

app.delete('/product/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    if(!product){
      return res.status(404).json({message: `connot find any product with ID: ${id}`});
    }
    const updatedProducts = await Product.find({});
    res.status(200).json(updatedProducts);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

mongoose.set("strictQuery", false);

mongoose.connect('mongodb://0.0.0.0:27017/school', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Your code after successfully connecting to MongoDB
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

app.listen(3000, ()=> {
    console.log('Node API App is Running on port 3000')
})
