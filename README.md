# Social-Network-API [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This is a simple Social Network API, mainly designed to show off usage of Mongo.db and mongoose.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#Contributing)
- [Questions](#Questions)

## Installation

To install this project, you need Node.js to run it in the command line, and either GitBash or a ZIP extracter to download it. You need Node Package Manager to install the dependencies and run various scripts. You also need mysql set up on your computer. Once the server is running, you need Thunder Client or another REST API to make calls to it.

## Usage

To run this project, download it, either by cloning the repository or by downloading a ZIP of it and extracting it. Then use the command line to navigate to the folder it is in. First, type 'npm i' to install the dependencies, which might take a moment. Type 'npm run seed' to create and seed the database. Note that if the database already had data, this will delete it and create new data.  Once everything is set up, type 'npm run start' to run the server.

Open Thunder Client or any other REST API.

All routes start with 'http://localhost:3001/api', so fill this in for the '...' in the routes below. when \*id\* is required, it needs the ObjectId, which can be obtained through the general get route in the _id field.

The following routes work for both \*users\* and \*thoughts\*, so replace \*endpoint\* with that:

GET .../\*endpoint\*  
Returns all users or thoughts

GET .../\*endpoint\*/\*id\*  
Returns the user or thought with that id, including any connected users, thoughts, or reactions

DELETE .../\*endpoint\*/\*id\*  
Deletes the specific user or thought with that id. If a user is deleted, all their thoughts and reactions will be removed, and they will be removed from all friendlists that contain them.

POST/PUT .../\*endpoint\* for POST or .../\*endpoint\*/\*id\* for PUT  
Creates or updates a user or thought. These routes require JSON content, which is specified for each endpoint below. The POST route needs all fields unless marked as optional, while PUT only needs the ones that are being updated.

users:  
"username": string, must be unique  
"email": string, must be unique and be in the correct format for an email

thoughts:   
"thoughtText": string  
"username": string  
"userId": id value of a user, most easily obtained through GET .../users

There are several more routes that do not follow this same pattern:

POST .../users/\*id\*/friends/\*id2\*  
Adds the second user to the first user's friendlist

DELETE .../users/\*id\*/friends/\*id2\*  
Removes the second user from the first user's friendlist

POST .../thoughts/\*id\*/reactions  
Creates a reaction and adds it to the specified thought. This requires JSON content, with the following fields:  
"reactionBody": string  
"username": string

DELETE .../thoughts/\*id\*/reactions/\*id2\*  
Removes the reaction with ReactionId \*id2\* from the specified thought

[Demonstration Video](https://drive.google.com/file/d/1uve05Df8f1CA2s_A3xoHwsrQfFk4Qyme)

## License

This project is covered under the MIT License.

[Link to License Page](/LICENSE)

## Contributing

Feel free to contribute to this project by cloning it and making a fork. You can contact me at the email address listed below if you wish to merge the fork into the main branch.

## Questions

If you have any questions, you can reach me at one of these place(s):  

GitHub: [CountDuckoo](github.com/CountDuckoo)

Email: [countsuperc@gmail.com](mailto:countsuperc@gmail.com)



