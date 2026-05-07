const express = require("express")
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
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