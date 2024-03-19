const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
    // get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // get a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            .populate('friends');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // create a new user
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // update a user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if(!user){
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // delete a user and associated thoughts, and removes them from all friends lists
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({_id: req.params.userId});
            if (!user){
                return res.status(404).json({ message: 'No user with that ID' });
            }
            console.log(user.username);
            // deletes all of the thoughts that have a matching username
            await Thought.deleteMany({username: user.username});
            // might also want to delete reactions with a matching username
            // not 100% sure if this is formatted correctly
            await Thought.updateMany(
                {'reactions.username': user.username},
                {$pull: {reactions: {username: user.username}}}
            );
            await User.updateMany(
                {friends: req.params.userId},
                {$pull: {friends: req.params.userId}}
            );
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // add a provided friend to a specific user
    async addFriend(req, res){
        try {
            // check if the friend exists
            const friend = await User.findOne({ _id: req.params.friendId });
            if (!friend){
                return res.status(404).json({ message: 'No user with that ID to add as a friend' });
            }
            // try to add the friend to the user
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: {friends: req.params.friendId }},
                { runValidators: true, new: true }
            );
            if(!user){
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // remove a friend from a user's friends array
    async removeFriend(req, res){
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: { _id: req.params.friendId } } },
                { runValidators: true, new: true }
            );
            if(!user){
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};
