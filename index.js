const app = require('./server/app');

// Start the server
const port = process.env.PORT || 9000;
app.listen(port);
console.log('Server listening at', port);