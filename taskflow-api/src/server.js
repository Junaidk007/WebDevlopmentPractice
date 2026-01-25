require('dotenv').config();
const app = require('./app.js');
const dbConnect = require('./config/db.js');
const port = process.env.PORT || 3000;

dbConnect().catch(e => console.log(`Error in db connection ${e}`));

app.listen(port, () => console.log(`server is live ${port}`));