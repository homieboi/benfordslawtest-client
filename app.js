const express = require('express');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
const routes = require('./routes/routes')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes)

const mongoAuthString = 'mongodb+srv://aleks:USXDWfcBYScGSVgO@cluster0-bg5kb.mongodb.net/benfords-law-test'

const start = async () => {
  try {
    await mongoose.connect(mongoAuthString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    })

    app.listen(PORT, () => {
      console.log('Server has been started .....')
    })
  } catch (err) { console.log(err) }
}

start()

module.exports = app;
