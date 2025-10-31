const mongoose=require('mongoose')

mongoose.connect(process.env.MONGO_URL).then((res)=>{
  console.log("server is connected to Mongodb")
}).catch((err)=>{
  console.log(err)
})