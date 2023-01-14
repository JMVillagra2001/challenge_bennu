const express = require('express')
const { connectToDatabase } = require('./utils/database')
const app = express()
const port = process.env.PORT || 3000
require('dotenv').config({path: './.env'})
const User = require('./models')
// connection to db
connectToDatabase()

app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.status(200).send({users: users, users_count: users.length})   
});

app.get('/users/count', async(req, res) => {
    const users = await User.count();
    res.status(200).send({users_count: users})
});


app.post('/users', async (req, res) => {
    const newUser = new User(req.body)
    newUser.save();
    res.status(200).send({message: newUser})
});
