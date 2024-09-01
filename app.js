const express=require("express");
const ejs=require("ejs");
const app=express();
const path=require("path");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
require('dotenv').config();
const port = process.env.PORT || 3000;
const connectDb=require("./config/mongoose-connection");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bookModel=require("./models/bookmodel");
const User=require("./models/usermodel");
connectDb();

app.set('view engine', 'ejs');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const protect=require("./middlewares/authMiddleware");
  app.get("/login", (req, res)=> {
    res.render("login.ejs");
  });
app.post("/register",async(req, res, next)=>{
  const { name, email, password } = req.body;
  try {
      const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(400).send({ message: 'User already exists' });
    }

    
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.render("login.ejs");
} catch (error) {
    res.status(500).send({ message: 'Error registering user', error });
}
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
      
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '10h' });

      res.cookie('token', token, { httpOnly: true,secure: true});

      res.render("index.ejs");
  } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
  }
});
app.get("/logout", (req, res) => {
  res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
});









let f=1;
app.get("/",async(req,res)=>{
   res.render("index.ejs");
   if(f)
   {
   async function createBooks() {
    try {
      // Book 1
      const book1 = new bookModel({
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        publishYear: 1925,
        price: 10.99
      });
  
      // Book 2
      const book2 = new bookModel({
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        publishYear: 1960,
        price: 7.99
      });
  
      // Save both books
      await book1.save();
      await book2.save();
  
      
    } catch (error) {
      console.error('Error creating books:', error.message);
    }
  }
  
  // Run the function
  createBooks();
}
f=0;

 });
 app.get("/allbooks",async(req,res)=>{
  try {
    const books = await bookModel.find();  
    res.render('allbooks.ejs', { books });     
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).send('Internal Server Error');
  }
 });  
 app.get("/addnew",protect,(req,res)=>{
  res.render("addbook.ejs");
 });
 app.post('/create', async (req, res) => {
  const { title, author, publishYear, price } = req.body;

  try {
    const newBook = new bookModel({
      title: title,
      author: author,
      publishYear: publishYear,
      price: price
    });

    await newBook.save();
    try {
      const books = await bookModel.find();  
      res.render('allbooks.ejs', { books, message: 'Book Created Successfully'});     
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).send('Internal Server Error');
    }
   
  } catch (error) {
    res.status(400).send('Error in creating new book: ' + error.message);
  }
});
app.get("/findbook",(req, res)=>{
  res.render("findbook.ejs");
 });
 app.get("/viewmore/:id",async(req, res)=>{
  const bookId = req.params.id;
  try {
        if (!ObjectId.isValid(bookId)) {
          res.status(400).send('Invalid book ID format.');    }
   
    const book = await bookModel.findById(bookId);

    if (!book) {
      res.status(404).send('Book not found');
        }

   
    res.render("viewmore.ejs",{book:book});
  } catch (error) {
    console.error('Error finding book by ID:', error);
     res.status(500).send('Internal Server Error!');
  }
 
 });
 app.post("/books/:id",async(req,res)=>{
  const bookId = req.params.id;
  try {
        if (!ObjectId.isValid(bookId)) {
          res.status(400).send('Invalid book ID format.');    }
   
    const book = await bookModel.findById(bookId);

    if (!book) {
      res.status(404).send('Book not found');
        }

   
    res.render("viewmore.ejs",{book:book});
  } catch (error) {
    console.error('Error finding book by ID:', error);
     res.status(500).send('Internal Server Error!');
  }
 });
 app.get("/edit/:id",protect, async (req, res) => {
  const bookId = req.params.id;

  try {
      if (!ObjectId.isValid(bookId)) {
      return res.status(400).send('Invalid book ID format.');
    }

    const book = await bookModel.findById(bookId);

    if (!book) {
      return res.status(404).send('Book not found.');
    }
    res.render('editbook.ejs', { book });
  } catch (error) {
    console.error('Error finding book for edit:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.post("/update/:id",async(req, res) => {
  const bid=(req.params.id);
  const { title, author, publishYear, price } = req.body;
  try {
  
    if (!ObjectId.isValid(bid)) {
      return res.status(400).send('Invalid book ID format.'); 
    }
    const updatedBook = await bookModel.findByIdAndUpdate(
      bid,
      { title, author, publishYear, price },   
      { new: true, runValidators: true }       
          );

    if (!updatedBook) {
      return res.status(404).send('Book not found');  
    }

   
      res.render("viewmore.ejs",{book:updatedBook});
  } catch (error) {
    console.error('Error updating book:', error);     
    res.status(500).send('Internal Server Error',error);     
  }
});
app.get("/delete/:id",protect,async(req, res) => {
  const bookId = req.params.id;
  const deletedBook = await bookModel.findByIdAndDelete(bookId);
  if (!deletedBook) {
    return res.status(404).send('Book not found.');
  }
  try {
    const books = await bookModel.find();  
    res.render('allbooks.ejs', { books });     
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).send('Internal Server Error');
  }
});







app.listen(port, ()=>{
   console.log(`Server is running on port ${port}`);
});
