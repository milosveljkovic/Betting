const express = require('express');
const mongoose = require('mongoose');
const UsersRouter = require('./routes/user');
const MatchesRouter = require('./routes/match');
const TicketsRouter = require('./routes/ticket');

const app=express();
app.use(express.json());

const port=5000;

const databaseName='betting'
const mongoUrl=`mongodb://localhost:27017/${databaseName}`;

mongoose.connect(mongoUrl,{ useUnifiedTopology: true, useNewUrlParser: true  } );
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("Connection to MONGO_DB is established. Database that we use is betting.")
})

app.use('/user',UsersRouter);
app.use('/match', MatchesRouter);
app.use('/ticket', TicketsRouter);

app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`)
})