const { Schema, Types, model } = require('mongoose');

const thoughtSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
 
    createdAt: {
      type: Date,
      default: Date.now,
    },

    username: {
      type: String,
      required: true
    },

    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reaction',
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


thoughtSchema.virtual('reactionCount').get(function () {return this.reactions.length; });
// format date: slightly risky attempt?
// thoughtSchema.virtual('createdAt').get(
//   return (this.createdAt.toString)
// )

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },

  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);



const Thought = model('thought', thoughtSchema);

module.exports = Thought;
