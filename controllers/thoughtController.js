const { User, Thought } = require('../models');

// empty endpoint routes: getThoughts, createThought

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
 
  

  createThought(req, res) {
      User.findOne({ _id: req.body.userId })
        .then((user) => {
          if (!user) {
            res.status(404).json({ message: 'No user with that ID' })
          } else {
            let tempBody = req.body;
            if (!tempBody.username) {
              tempBody.username=user.username;
            } 

            Thought.create(tempBody)
              .then((thought) => {
                return User.findOneAndUpdate(
                  { _id: tempBody.userId },
                  // need object method, or thought id sufficient?
                  { $addToSet: { thoughts: thought._id } },
                  { new: true }
                );
              })
              .then((user) =>
                !user
                  ? res.status(404).json({
                      message: 'No such user.',
                    })
                  : res.json('Thought added successfully.')
              )


          }
        })
        .catch((err) => res.status(500).json(err));
    },
      
  


  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that ID.' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
 

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that ID.' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },


  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that ID.' })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'No such user.',
            })
          : res.json({ message: 'Thought successfully deleted.' })
      )
      .catch((err) => res.status(500).json(err));
  },

  

  
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that ID.' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that ID.' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

};



