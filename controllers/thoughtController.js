const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
    // get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // get a single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // create a new thought
    // userId will be provided in the body
    async createThought(req, res) {
        try {
            const dbThoughtData = await Thought.create(req.body);

            const user = await User.findOneAndUpdate(
                { _id: req.body.userId},
                { $addToSet: {thoughts: dbThoughtData._id }},
                { runValidators: true, new: true }
            );

            if (!user){
                return res.status(404).json({ message: 'Created thought, but no user to add it to' });
            }
            res.json(dbThoughtData);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if(!thought){
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({_id: req.params.thoughtId});
            if (!thought){
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // create a reaction and add it to a thought
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );
        
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
        
            res.json(video);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // remove a reaction from a thought
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: {reactionId: req.params.reactionId}} },
                { runValidators: true, new: true }
            );
        
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
        
            res.json(video);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};