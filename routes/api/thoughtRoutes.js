const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');



// post a generic thought

// // example data supplied is:
// {
//   "thoughtText": "Here's a cool thought...",
//   "username": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b"
// }

// so, associated user in body rather than endpoint; $push to that user's thought array

router.route('/').get(getThoughts).post(createThought);

// manipulate a thought by its ID
router
  .route('/:thoughtId')
  .get(getSingleThought)
  // .put(updateThought)
  // .delete(deleteThought);


// reaction routes: attach to thought id'd by thoughtID,
// remove reaction id'd by reactionID from thought id'd by thoughtID

// router.route('/:thoughtID/reactions').post(addReaction);
// router.route('/:thoughtId/tags/:reactionId').delete(removeReaction);

module.exports = router;
