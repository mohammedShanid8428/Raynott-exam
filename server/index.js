require('dotenv').config()
const express=require("express")
const cors=require('cors')
require('./connection/dbConnect')

const productRoutes = require('./routes/productRoutes');

const server = express();


server.use(cors());
server.use(express.json());

server.use('/api',productRoutes)





const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running at: ${PORT}`);
});