const { MongoClient, ObjectId } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager';
const id = new ObjectId();
console.log(id);
console.log(id.getTimestamp());

// Connect to db server
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
         return console.log('Unable to connect to database.');
    }
    
    const db = client.db(dbName);

    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Evan',
    //     age: 26
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Could not insert user');
    //     }

    //     console.log(result.ops);
    // });

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 21
    //     }, 
    //     {
    //         name: 'Evan',
    //         age: 26
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Could not insert user');
    //     }

    //     console.log(result.ops);
    // });

    db.collection('tasks').insertMany([
        {
            description: 'Make bed',
            completed: false
        }, {
            description: 'Complete this project',
            completed: false
        }, {
            description: 'Drink 3 liters of water',
            completed: false
        }
    ], (error, result)=> {
        if (error) {
            return console.log('Could not insert tasks');
        }

        console.log(result.ops);
    });
});
