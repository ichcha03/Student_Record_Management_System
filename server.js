const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const methodOverride = require('method-override');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const studentRoutes = require('./routes/students');
app.use('/', studentRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/studentDB')
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});