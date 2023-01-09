const express = require('express');
const router = require('./router');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const app = express(); 

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(cors({
    origin: 'https://hereattendance.tech'
}));

app.use(cookieParser());
// support parsing of application/json type post data
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(express.json());


// Serve static files from the React app in root directory
app.use(express.static(path.join(__dirname, 'client/build')));


// Put all API endpoints under '/api'
app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
    }
);



// Use router
app.use('/api', router);

// Create server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    }
);


