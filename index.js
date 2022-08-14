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

const bodyParser = require('body-parser');
app.use(bodyParser.json())


//port
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
})

//mongo config
const { MongoClient, ObjectId } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://admin:admin@cluster0.ozomu.mongodb.net/cars?retryWrites=true&w=majority";
const client = new MongoClient(url);
                      
 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db("cars");

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
      error: "GET error",
      value: error
    })
  }
  
});


app.post('/brands', async (req, res) => {
 try {
  await client.connect()

    const col = client.db('cars').collection('brands')

  
 

 let newBrand = {
  "brand": req.body.brand,
  "description": req.body.description
 }

 await col.insertOne(newBrand)
 res.status(200).json(newBrand)
 return
}

 catch (error) {
  console.log(error);
  res.status(500).send("POST error")
 }
 

});

app.put('/brands/:id', async (req, res) => {
try{
  await client.connect()

    const col = client.db('cars').collection('brands')

    const query = {
      _id: ObjectId(req.params.id)
    }

    const updatedCars = {
      $set: 
      {
        description: req.body.description
      }
    }
    await col.updateOne(query, updatedCars)
    res.status(200).json({
      message: "succeeded"
    })
} catch (error) {
  console.log(error);
  res.status(500).send("PUT error")
 }
})
 

