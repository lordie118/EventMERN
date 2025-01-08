const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const participantRouter = require('./routes/participantRouter');
const eventRouter = require('./routes/eventRouter');

const app = express();
app.use(cors())
app.use(express.json());
app.use('/api', participantRouter);
app.use('/api', eventRouter);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}).catch((error) => {
  console.error('Connection error', error);
});
