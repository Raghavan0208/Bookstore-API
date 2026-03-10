require('dotenv').config();
const connectToDB = require('./database/db');
const express = require('express');
const loggerMiddleware = require('./middlewares/logger-middleware');
const bookRoutes = require('./routes/book-routes');
const userRoutes = require('./routes/user-routes');
const app = express();
const PORT = process.env.PORT || 3000;

// connect to our database
// Connect to DB
connectToDB();

// Built-in middleware
app.use(express.json());

// Logger custom middleware using morgan package
app.use(loggerMiddleware);

// ################# health route ###############################
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'SUCCESS',
    timestamp: new Date().toISOString(),
  });
});

// ################  All Routes here ############################
app.use('/api', bookRoutes);
app.use('/api/user', userRoutes);
// ################  All Routes end here ##########################

// running server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
