const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/auth')(app);
require('./routes/user')(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

