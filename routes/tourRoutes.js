const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
// const reviewController = require('./../controllers/reviewController');
const reviewRouter = require('./../routes/reviewsRoutes');

const router = express.Router();

// router.param('id', tourController.checkID);
router.use('/:tourId/reviews', reviewRouter);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAll);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAll)
  .post(tourController.createTour);

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getTourWithin);
// query thì nó vậy /tour-distance?distance=234&center=-40,45&unit=mi nhưng làm cách trên cho đẹp xài params

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

// router
//   .route('/:tourId/reviews/')
//   .get(
//     authController.protect,
//     authController.restrictTo('admin'),
//     reviewController.createReview
//   );

module.exports = router;
