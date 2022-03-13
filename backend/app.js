const express = require('express');

const routes = require('./routes/route')

const app = express();

app.use(express.json());



app.use('/api', routes);

const PORT = 4000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));