require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const noteRouter = require('./routes/noteRouter');

const app = express();
//middlewares===
app.use(cors());
app.use(express.json());

// app.get('/', (req, res) => {
//     res.send("MY FIRST PROJECT TO BE COMPLETED SOON");
// })

// Routes
app.use('/users', userRouter);
app.use('/api/notes', noteRouter);

//Connect to mongoDB
const URI = process.env.mongo_URL;
const connectDB = async () => {
    try {
      await mongoose.connect(URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });
  
      console.log('MongoDB Connected');
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
};
connectDB();

// Below MongoDB and  Above Listen Sever
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res) =>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    });
}

//Create a listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port`, PORT);
});