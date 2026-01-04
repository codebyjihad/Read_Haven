const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

    app.post('/books', async (req, res) => {
      const bookData = req.body

      try {
        const book = await booksCollection.insertOne(bookData)
        res.status(201).json({ message: 'Book Added Successfully !', book })

      } catch (err) {
        res.status(500).json({ error: 'Internal Server Error !', err })
      }

    })

    // get alll books 
    app.get('/books', async (req, res) => {
      const { page, limit, genre, minYear, maxYear,
        author, minPrice, maxPrice, sortBy, order, search } = req.query;

      try {

        const currentPage = Math.max(1, parseInt(page) || 1)
        const perPage = parseInt(limit) || 10;
        const skip = (currentPage - 1) * perPage;

        const filter = {};
        if (search) {
          filter.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: "i" } }
          ]
        }

        if (genre) filter.genre = genre

        if (minYear || maxYear) {
          filter.publishedYear = {
            ...(minYear && { $gte: parseInt(minYear) }),
            ...(maxYear && { $lte: parseInt(maxYear) })
          }
        }

        if (author) filter.author = author;

        if (minPrice || maxPrice) {
          filter.price = {
            ...(minPrice && { $gte: parseFloat(minPrice) }),
            ...(maxPrice && { $lte: parseFloat(maxPrice) })
          }
        }

        const sortOpdations = { [sortBy || 'title']: order === 'desc' ? -1 : 1 }
        
        
        const [books , totalBook] = await Promise.all([booksCollection.find(filter).sort(sortOpdations).skip(skip).limit(perPage).toArray() , booksCollection.countDocuments(filter)])
        
        res.status(201).json({books , totalBook , currentPage , totalPages: Math.ceil(totalBook / perPage)})
        


      } catch (err) {
        res.status(500).json({ error: 'Internal Server Error !', err })
      }
    })

    // get book by ID(get)
    
    app.get('/books/:id' , async(req , res) => {
      const bookId = req.params.id;
      try{
        const book = await booksCollection.findOne({_id: new ObjectId(bookId)})
         
        if(!book) return res.status(404).json({Message:'Book Not Found !'})

        res.status(201).json(book)
        
      }catch(err){
         res.status(500).json({ error: 'Internal Server Error !', err })
      }
    })
    
    // updated books 
    
    app.put('/books/:id' , async(req , res) => {
      try{
        const updateBook = await booksCollection.updateOne({_id: new ObjectId(req.params.id)} , {$set: req.body}) ;
        res.json(updateBook)
      }catch(err){
         res.status(500).json({ error: 'Internal Server Error !', err })
      }
    })

    // deleted books 
    app.delete('/books/:id' , async(req , res) => {
      try{
        await booksCollection.deleteOne({_id: new ObjectId(req.params.id)})
        res.json({message:'Books Deleted'})
      }catch(err){
         res.status(500).json({ error: 'Internal Server Error !', err })
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

