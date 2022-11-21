import express from 'express';
import db from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import imageRoute from './routes/image.route.js';
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb', extended: true }));

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
   res.send('Server is running');
})

app.use('/images', imageRoute);
app.use('/user', userRoute);
app.use('/auth', authRoute);

db.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
   console.log('Connected to DB!');
   app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
   })
});