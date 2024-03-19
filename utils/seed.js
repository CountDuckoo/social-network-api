const connection = require('../config/connection');
const { User, Thought } = require('../models');
const {usernames, emails, createThoughts} = require('./data');

connection.on('error', (error) => error);

connection.once('open', async () =>{
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    }
  
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    }
    const users = [];
    // get lists of usernames and emails from data
    // for each username, call createThoughts, which calls createReactions for each thought
    // then await an insertMany, which returns the documents that were created
    // add a user to the array with the _id's from the created thoughts in the thoughts array
    for (let i=0; i<usernames.length; i++){
        // create 2-5 thoughts for each user
        const thoughtList = createThoughts(Math.floor(Math.random()*4)+2, i);
        // returns an object, which includes an array-like object of the inserted ObjectIds, which is then put in the variable
        const createdThoughtList = Object.values((await Thought.collection.insertMany(thoughtList)).insertedIds);
        console.log(createdThoughtList);
        users.push({
            username: usernames[i],
            email: emails[i],
            thoughts: createdThoughtList,
        });
    }
    userIdList = Object.values((await User.collection.insertMany(users)).insertedIds);
    // add the user to the friend list of the next/previous user
    for(let k=0; k<userIdList.length-1; k+=2){
        await User.findOneAndUpdate(
            { _id: userIdList[k]},
            { $addToSet: {friends: userIdList[k+1]}},
            { runValidators: true}
        );
        await User.findOneAndUpdate(
            { _id: userIdList[k+1]},
            { $addToSet: {friends: userIdList[k]}},
            { runValidators: true}
        );
    }
    console.info('Finished seeding database.')
    process.exit(0);
});