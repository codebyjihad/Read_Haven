const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000;

// middlware

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
   res.send(`Welcome to Read_Haven Server`)
})

// connect mongoDB

const uri = process.env.MONGODB_URL


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    await client.connect();
    
    // create db and collections

    const db = client.db('readhaven')
    const booksCollection = db.collection('books')
     
    // create a book (POST)
    
    app.post('/books' , async(req , res) => {
        const bookData = req.body
         
        try{
          const book = await booksCollection.insertOne(bookData)
          res.status(201).json({message:'Book Added Successfully !' , book})

        }catch(err){
            res.status(500).json({error: 'Internal Server Error !' , err})
        }
    
    })
    
    // get alll books 
    app.get('/books' , async(req , res) => {
        const {page , limit, genre , minYear , maxYear , minPrice , maxPrice , sortBy , order  , search} = req.query;
        
        const currentPage = Math.max(1 , parseInt(page) || 1)
        const perPage = parseInt(limit) || 10;
        const skip  = (currentPage - 1) * perPage;
        
        const filter = {};
        if(search){
          filter.$or = [
            {title: {$regex: search , $options:'i'}},
            {description: {$regex: search , $options:"i"}}
          ]
        }

        try{

           const books = await booksCollection.find().toArray()
           res.status(201).json(books)

        }catch(err) {
             res.status(500).json({error: 'Internal Server Error !' , err})
        }
    })
   
   
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// admin
// abuZSIppXy9FIqBt