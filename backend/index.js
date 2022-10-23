const express=require('express')
const db=require('./db')

const app=express();

// Middleware for sending something in request body(header)
app.use(express.json());

const port=3000;

// Available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port,()=>{
    console.log(`App is running at http://localhost:${port}`)
})