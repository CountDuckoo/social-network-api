const { Schema, Types } = require('mongoose');
const {formatDate} = require('../utils/utilities');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => formatDate(date), //add a function to format the date
        },
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
    }
);

module.exports = reactionSchema;