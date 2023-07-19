const express = require("express")
require('dotenv').config()
const cors = require('cors')
const { connection } = require("./db")
const { MarketRouter } = require("./Routes/market.route")
const { MarketItemModel } = require("./Modals/marketItems.modal")
const { auth } = require("./Middleware/auth.middleware")
const { dealerRouter } = require("./Routes/dealer.route")
const { OEMRouter } = require("./Routes/OEM.routes")

const app=express()
app.use(cors())
app.use(express.json())


app.get("/",(req,res)=>{
    res.status(200).send("Home page")
})

MarketRouter.get("/",async(req,res)=>{
    try{
        const oldCars = await MarketItemModel.find()
        res.status(200).send(oldCars)
    }catch(err){
        console.log({"msg":"Error Occured","error":err})
    }
})

app.use("/dealerItem",dealerRouter)
app.use(auth)
app.use("/marketItem",MarketRouter)
app.use("/OEM",OEMRouter)

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to DB")
    }catch(err){
        console.log('err:', err)
    }
    console.log(`server running at PORT ${process.env.port}`)
})