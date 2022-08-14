//express
const { query } = require('express');
const express = require('express');
const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'));

//root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/data/info.html')
})

//port
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
})

//mongo config
const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://admin:admin@cluster0.ozomu.mongodb.net/cars?retryWrites=true&w=majority";
const client = new MongoClient(url);
 
 // The database to use
 const dbName = "cars";
                      
 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);

         // Use the collection "brands"
         const col = db.collection("brands");

        
         // Find one document
         const myDoc = await col.find({}).toArray();
         // Print to the console
         console.log(myDoc);

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run().catch(console.dir);


//GET all car brands
app.get('/brands', async (req, res) => {
  try {
    await client.connect()

    const col = client.db('cars').collection('brands')
    const brands = await col.find({}).toArray();

    

    if (brands){
      res.status(200).send(brands);
      return;
    } else {
      res.status(400).send("request not found")
    }
  
    
  }
  catch(error) {
    console.log(error);
    res.status(500).send({
      error: "test",
      value: error
    })
  }
  
})