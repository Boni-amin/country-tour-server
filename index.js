const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
require('dotenv').config()
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dx6wy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri)

async function run() {
    try {
        await client.connect();
        const database = client.db('country_tour');
        const serviceCollection = database.collection('services')

        //GET service API
        app.get('/services', async (req, res) => {
            const cursor = serviceCollection.find({});
            const count = await cursor.count();
            services = await cursor.toArray();
            res.send(services)
            
        });

        //add service
            app.post("/addservices", (req, res) => {
                console.log(req.body);
                serviceCollection.insertOne(req.body).then((documents) => {
                res.send(documents.insertedId);
                });
            });

        //  make route and get data

       

        // 
        

       

    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('tour country');
});

app.listen(port, () => {
    console.log('Server running at port', port);
})