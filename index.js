const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.5jjbyfi.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  const PostCollection = client.db("helpRoom").collection("posts");
  app.post("/post", async (req, res) => {
    const query = req.body;
    const result = await PostCollection.insertOne(query);
    res.send(result);
  });
}
run().catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("I am from helpRoom");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
