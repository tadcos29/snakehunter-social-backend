const { User, Thought } = require('../models');

// empty endpoint routes: getThoughts, createThought

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
 
  // createThought(req, res) {
  //   Thought.create(req.body)
  //     .then((thought) => {
  //       return User.findOneAndUpdate(
  //         { _id: req.body.userId },
  //         // need object method, or thought id sufficient?
  //         { $addToSet: { thoughts: thought._id } },
  //         { new: true }
  //       );
  //     })
  //     .then((user) =>
  //       !user
  //         ? res.status(404).json({
  //             message: 'No such user.',
  //           })
  //         : res.json('Thought added successfully.')
  //     )
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json(err);
  //     });
  // },


  createThought(req, res) {
      User.findOne({ _id: req.body.userId })
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            :  Thought.create(req.body)
              .then((thought) => {
                return User.findOneAndUpdate(
                  { _id: req.body.userId },
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
              
            
        )
        .catch((err) => res.status(500).json(err));
    },
      
  





  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.courseId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No application with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // // TODO: Add comments to the functionality of the updateApplication method
  // updateApplication(req, res) {
  //   Application.findOneAndUpdate(
  //     { _id: req.params.applicationId },
  //     { $set: req.body },
  //     { runValidators: true, new: true }
  //   )
  //     .then((application) =>
  //       !application
  //         ? res.status(404).json({ message: 'No application with this id!' })
  //         : res.json(application)
  //     )
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json(err);
  //     });
  // },



  
  // // TODO: Add comments to the functionality of the deleteApplication method
  // deleteApplication(req, res) {
  //   Application.findOneAndRemove({ _id: req.params.applicationId })
  //     .then((application) =>
  //       !application
  //         ? res.status(404).json({ message: 'No application with this id!' })
  //         : User.findOneAndUpdate(
  //             { applications: req.params.applicationId },
  //             { $pull: { applications: req.params.applicationId } },
  //             { new: true }
  //           )
  //     )
  //     .then((user) =>
  //       !user
  //         ? res.status(404).json({
  //             message: 'Application created but no user with this id!',
  //           })
  //         : res.json({ message: 'Application successfully deleted!' })
  //     )
  //     .catch((err) => res.status(500).json(err));
  // },
  // // TODO: Add comments to the functionality of the addTag method
  // addTag(req, res) {
  //   Application.findOneAndUpdate(
  //     { _id: req.params.applicationId },
  //     { $addToSet: { tags: req.body } },
  //     { runValidators: true, new: true }
  //   )
  //     .then((application) =>
  //       !application
  //         ? res.status(404).json({ message: 'No application with this id!' })
  //         : res.json(application)
  //     )
  //     .catch((err) => res.status(500).json(err));
  // },
  // // TODO: Add comments to the functionality of the addTag method
  // removeTag(req, res) {
  //   Application.findOneAndUpdate(
  //     { _id: req.params.applicationId },
  //     { $pull: { tags: { tagId: req.params.tagId } } },
  //     { runValidators: true, new: true }
  //   )
  //     .then((application) =>
  //       !application
  //         ? res.status(404).json({ message: 'No application with this id!' })
  //         : res.json(application)
  //     )
  //     .catch((err) => res.status(500).json(err));
  // },
};
