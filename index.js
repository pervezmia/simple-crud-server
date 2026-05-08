const express = require("express")
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://simple-crud-server:VYHEqi454kEAhSsk@cluster0.onlskrj.mongodb.net/?appName=Cluster0";
const cors = require('cors')
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

//simple-crud-server
//VYHEqi454kEAhSsk

//mongodb+srv://<db_username>:<db_password>@cluster0.onlskrj.mongodb.net/?appName=Cluster0

//mongodb+srv://simple-crud-server:VYHEqi454kEAhSsk@cluster0.onlskrj.mongodb.net/?appName=Cluster0

const run = async () => {
    try{
        await client.connect();

        const database = client.db('simpleCrud')
        const userCollection = database.collection("users");

        app.get('/users', async (req, res) => {
            const cursor = userCollection.find();
            const result = await cursor.toArray();
            res.send(result)
        })

        app.get("/users/:id", async(req, res) => {
            const id = req.params.id;
            const query = {
                _id: new ObjectId(id)
            }
            const user = await userCollection.findOne(query);
            console.log('user id',id);
            // res.send("Get user by id");
            res.send(user);
        })

        app.delete("/users/:id", async (req, res) => {
            const id = req.params.id;
            const query = {
                _id: new ObjectId(id)
            }
            const result = await userCollection.deleteOne(query);
            res.send(result)
        })


        await client.db("admin").command({ping: 1});
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // await client.close();
    }

}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Hello world!")
})


app.listen(port, () => {
    console.log(`Simple curd server is serving ${port}`);
})