// require mongoose
const { Schema, model } = require('mongoose');

// validate email function
// var validateEmail = function(email) {
//     var re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
//     return re.test(email)
// }

// define User schema
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    //   validate: [validateEmail, 'Please provide a valid email address'],
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please provide a valid email address.']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
)

// get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length
})

// export User model
const User = model('User', UserSchema);
module.exports = User;
