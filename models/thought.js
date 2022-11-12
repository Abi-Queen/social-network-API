// require mongoose
const { Schema, model, Types } = require('mongoose')

// require dateFormat from /utils
const dateFormat = require('../utils/dateFormat')

// define Reaction schema
const ReactionSchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment _id
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true
    },
    writtenBy: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      }
    },
  {
    toJSON: {
      getters: true
    }
  }
)

const ThoughtSchema = new Schema(
  {
    toughtText: {
      type: String,
      required: true, 
      minLength: 1,
      maxLength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
)

// get total count of comments and replies on retrieval
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
})

// export Thought model
const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;
