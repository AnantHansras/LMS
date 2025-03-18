const express = require('express')
const connect = require('./utils/dbConnect');
const app = express()
const userRoutes = require('./Routes/User')

const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config();
connect();
app.use(express.json());
app.use(
	cors({
		origin:"*",
		credentials:true,
	})
)

app.use('/user',userRoutes)


const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})