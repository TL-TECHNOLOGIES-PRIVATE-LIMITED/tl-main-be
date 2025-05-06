import express from 'express'
import dotenv from 'dotenv'
// import adminRoute from './routes/admin/indexRoute.js'
import webRoute from './src/route/web/indexRoute.js'
import cors from 'cors'

dotenv.config()
const app =express()

const port =process.env.PORT
const url =process.env.URL

// Middleware
app.use(cors("*"));
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 

// Health Check Route
app.get("/", (req, res) => {
    res.send("TL-MAIN RUNNING");
  });

// app.use(dbConnectionCheck)

// app.use('/api/v1/admin',adminRoute)
app.use('/api/v1/web',webRoute)


app.listen(port,()=>{
console.log(`Server started successfully : ${url}${port}`);
    
})