const express=require("express")
const app=express()
const mongoose=require("mongoose")
const ShortUrl=require("./schema")

app.set("view engine","ejs")
app.use(express.urlencoded({extended:false}))

app.get("/", async (req,res)=>{
    const shortUrls=await ShortUrl.find()
    res.render("index",{shortUrls:shortUrls})
})

app.post("/shortUrls", async (req,res)=>{
    await ShortUrl.create({full: req.body.fullurl})

    res.redirect("/")
})

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)
  
    shortUrl.clicks++
    shortUrl.save()
  
    res.redirect(shortUrl.full)
  })

const port=5002 || process.env.PORT
app.listen(port,()=>{
    console.log(`server started at port ${port}`)
})

// mongoose.connect("mongodb://localhost:27017/url-shortener",(err)=>{
//     if(!err){
//         console.log("connected to db")
//     }
// })

mongoose.connect("mongodb://localhost/url-shortener",{
    useNewUrlParser:true, useUnifiedTopology:true
})