const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qthn2pl.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const BookCollation = client.db("hadis").collection("books")
    const ChapterCollation = client.db("hadis").collection("chapter")
    const HadithCollation = client.db("hadis").collection("hadith")


    app.get('/books', async(res, req)=>{
        const result = await BookCollation.find().toArray();
        req.send(result)
    })
    app.get('/chapter', async(res, req)=>{
        const result = await ChapterCollation.find().toArray();
        req.send(result)
    })
    app.get('/hadith', async(res, req)=>{
        const result = await HadithCollation.find().toArray();
        req.send(result)
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', function(req,res) {
    res.send('server is running')
});

app.listen(port, ()=>{
    console.log(`the is school server is running on port: ${port}`)
})