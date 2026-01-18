const app = require('./app.js');
const dbConnect = require('./config/db.js');
const port = 8080;

dbConnect().catch(e => console.log(`Error in db connection ${e}`));

app.listen(port, () => console.log('server is live'))