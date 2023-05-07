// require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
// const url = process.env.DB_URL

var db, collection;

const url = 'mongodb+srv://maimounatraoredev:Enai123@cluster0.ikhc6zs.mongodb.net/prayerbook?retryWrites=true&w=majority'
const dbName = "prayerbook";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to host 3000`" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('prayers').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {post: result})
  })
})


app.post('/input', (req, res) => {

  db.collection('prayers').insertOne({msg: req.body.msg, heart: 0, verse:''}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/input', (req, res) => {
  console.log(req.body.verse)
  db.collection('prayers')
  .findOneAndUpdate({msg: req.body.msg}, {
    $set: {
      heart:req.body.heart + 1,
      verse: req.body.verse
      
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/input', (req, res) => {
  db.collection('prayers').findOneAndDelete({msg: req.body.msg}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})



