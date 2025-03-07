import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi:'3.0.0',
        info: {
            title: 'Movie Mood API',
            version: '1.0.0',
            description:'Test',
            contact: {
                name: 'Sup',
                email: 'sup@sum.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Serveur de Dev'
            }
        ]
    },
    apis: ['./src/routes/*.ts']
};

export const specs = swaggerJsdoc(swaggerOptions);

