//express
const express = require('express');
const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/data/info.html')
})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
})


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
