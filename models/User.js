const { Schema, Types, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
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
      validate: {

        // adapted from the Mongoose API docs
        validator: function(v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`
      },
      required: [true, 'User email address required.']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length
  })
  
  // attempt to implement remove middleware
userSchema.pre('remove', function(next) {
    Thought.remove({_id: this.username}).exec();
    next();
});
// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
