import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/user.js';
import postsRoutes from './routes/posts.js';
import bookingsRoutes from './routes/bookings.js';

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

app.use('/user', userRoutes);
app.use('/posts', postsRoutes);
app.use('/bookings', bookingsRoutes);

app.get('/', (req, res) => {
    res.send("APP is running");
});

const CONNECTION_URL = 'mongodb+srv://DiamondMongo:Jalda2020@cluster0.zqtv6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error));