const { Schema, Types, model } = require('mongoose');
const dayjs = require('dayjs');



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
      get: (createdAt) => dayjs(createdAt).format('MMMM D[th], YYYY [at] HH:mm')
    },

  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);





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
      get: (createdAt) => dayjs(createdAt).format('MMMM D[th], YYYY [at] HH:mm')
    },

    username: {
      type: String,
      required: true
    },

    reactions: [reactionSchema],

  },
  {
    toJSON: {
      virtuals: true,
      getters:true
    },
    id: false,
  }
);


thoughtSchema.virtual('reactionCount').get(function () {return this.reactions.length; });




const Thought = model('thought', thoughtSchema);

module.exports = Thought;
