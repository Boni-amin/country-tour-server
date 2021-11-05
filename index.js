const express = require("express");
const bodyParser = require("body-parser");
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
        const ordersCollection  = database.collection('orders')


        //GET service API
            app.get('/services', async (req, res) => {
                const cursor = serviceCollection.find({});
                const users = await cursor.toArray();
                res.send(users);
            });
        //GET Order API
            app.get('/manageOrder', async (req, res) => {
                const cursor = ordersCollection.find({});
                const users = await cursor.toArray();
                res.send(users);
                console.log(users)
            });
            

        //add service
            app.post("/addservices", (req, res) => {
                // console.log(req.body);
                serviceCollection.insertOne(req.body).then((documents) => {
                res.send(documents.insertedId);
                });
            });


            //add order in database

                app.post("/addOrders", (req, res) => {
                    ordersCollection.insertOne(req.body).then((result) => {
                    res.send(result);
                    });
                });


            // get all order by email query
            // app.get("/myOrder/:email", (req, res) => {
            //     console.log(req.params);
            //     ordersCollection
            //     .find({ email: req.params.email })
            //     .toArray((err, results) => {
            //         res.send(results);
            //     });
            // });

            app.get("/myOrders/:email", async (req, res) => {
                const result = await ordersCollection
                  .find({ email: req.params.email })
                .toArray();
                res.send(result);
              });

            //   app.delete("/delteOrderItem/:id", async (req, res) => {
            //     const result = await ordersCollection.deleteOne({
            //       _id: ObjectId(req.params.id),
            //     });
            //     res.send(result);
            //     console.log(result)
            //   });
            
            app.delete('/delteOrderItem/:id', async (req, res) => {
                const id = req.params.id;
                const query = { _id: ObjectId(id) };
                const result = await ordersCollection.deleteOne(query);
                res.json(result);
            })


            //GET service API
            app.get('/allOrders', async (req, res) => {
                const cursor = ordersCollection.find({});
                const users = await cursor.toArray();
                res.send(users);
            });

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