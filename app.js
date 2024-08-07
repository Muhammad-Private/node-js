const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');

const Auth_routes=require(`./routes/Auth_routes`)
const products_routes=require(`./routes/products_routes`)




// Middleware
app.use(express.json());
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Serve static files from the "public" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(cookieParser());


app.use(`/auth`,Auth_routes)
app.use(`/`,products_routes)






mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection to MongoDB failed:', err));

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
