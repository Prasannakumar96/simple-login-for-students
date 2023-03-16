const { MongoClient } = require("mongodb");

// new link
const uri = "mongodb+srv://prasannakumar:pk@cluster0.p97np.mongodb.net/test"
//digital ocean link
// const uri =  'mongodb+srv://doadmin:6FWe5792crI10i4o@db-mongodb-cschool-83895681.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=db-mongodb-cschool'
const client = new MongoClient(
  uri,
  { useUnifiedTopology: true },
  { useNewUrlParser: true },
  { connectTimeoutMS: 30000 },
  { keepAlive: 1 },
  console.log("db connected")
);


const database = client.db("testfs");

exports.user = database.collection("user");