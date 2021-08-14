const { MongoClient, ObjectId } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager';

// Connect to db server
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
         return console.log('Unable to connect to database.');
    }
    
    const db = client.db(dbName);

    db.collection('tasks').deleteMany({
        description: 'Make bed'
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })
});