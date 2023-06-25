const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require("dotenv").config();
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 6001;

// middleware
app.use(cors());
app.use(express.json());
// middleware






const uri = `mongodb+srv://${process.env.DB_PROJECT_TITLE}:${process.env.DB_PROJECT_PASS_KEY}@cluster0.cpjgoyc.mongodb.net/?retryWrites=true&w=majority`;

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
        // All Collections 
        const foodsCollections = client.db("HotelFiveDB").collection("foods");
        const roomsCollections = client.db("HotelFiveDB").collection("rooms");


        // Rooms Data route
        app.get('/rooms', async (req, res) => {
            const results = await roomsCollections.find().toArray();
            res.send(results);
        });

        // Foods Data route
        app.get('/foods', async (req, res) => {
            const results = await foodsCollections.find().toArray();
            res.send(results);
        });

        app.get('/foods/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await foodsCollections.findOne(filter);
            res.send(result);
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

app.listen(port, () => {
    console.log(`hotel five on port ${port}`)
})