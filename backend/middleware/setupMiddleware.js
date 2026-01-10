const cors = require('cors');
const bodyParser = require('body-parser');

const setupMiddleware = (app) => {
  app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  app.use(bodyParser.json());
};

module.exports = setupMiddleware;