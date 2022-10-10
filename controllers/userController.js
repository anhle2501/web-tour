const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');
const factory = require('./../controllers/handleFactory');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const user = await User.find({});
  if (!user) {
    return next(new AppError('Something is wrong', 500));
  }
  res.status(200).json({
    status: 'success',
    message: {
      user
    }
  });
  // res.status(500).json({
  //   status: 'error',
  //   message: 'This route is not yet defined!'
  // });
});

exports.getUser = factory.getOne(User);

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined! Please use sign up instead'
  });
};

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
// user update
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1. create error if user Post passworđata
  console.log('dang chay update me');
  if (req.body.password || req.body.passwordConfirm) {
    console.log('dang chay update me2 ');
    return next(
      new AppError(
        'This route is not for password update please use updateMyPassword',
        400
      )
    );
  }
  // filter field wanted to update
  const filterBody = filterObj(req.body, 'name', 'email');
  // 2. Update user document

  const updateUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true
  });
  // user.name = 'admin';
  // await user.save();
  res.status(200).json({
    status: 'success',
    data: {
      updateUser
    }
  });
});

// administrator use
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
// exports.deleteUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined!'
//   });
// };
exports.deleteUser = factory.deleteOne(User);

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null
  });
});
