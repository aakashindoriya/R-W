require("dotenv").config()
const express=require("express")
const cors=require("cors")
const connect = require("./db/connect.db")


const app=express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    try {
        res.status(200).send("Welcome to R&W")
    } catch (error) {
        res.send(500).send("error",error)
    }
})


app.listen(process.env.PORT,async()=>{
    await connect()
    console.log("server is running on ",process.env.PORT )
})

