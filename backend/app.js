import express from 'express';
import morgan from 'morgan';
import connect from './db/db.js';

connect();

const app = express();


app.use(morgan('dev'));// logging middleware
app.use(express.json());// install middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Hello World!');
});//temp route for testing

export default app;