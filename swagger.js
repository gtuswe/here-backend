const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./router.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "Here API",
        description: "API Documentation for Here - Quick Attendance "
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js')
})