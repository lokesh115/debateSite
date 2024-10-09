function config() {
    const mongoose = require('mongoose');

    // MongoDB connection URL - use the container name (mongodb) instead of localhost
    const mongoHost = 'mongodb';
    const mongoPort = '27017';
    const mongoDB = 'UserService';
    
    const mongoURI = `mongodb://userservice-db:27017/userservice-db `;


    // Establish the connection
    mongoose.connect(mongoURI)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error.message);
        });

    const db = mongoose.connection;

    db.on('error', (error) => {
        console.error('MongoDB connection error:', error);
    });

    db.once('open', () => {
        console.log('Connected to MongoDB');
    });

    db.on('disconnected', () => {
        console.log('Disconnected from MongoDB');
    });
}

module.exports = config;
