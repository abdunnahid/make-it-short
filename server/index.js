const express = require('express');
const app = express();

require('./db');

app.use(express.json({ extended: false }));
app.use('/', require('./routes/makeitshort'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});