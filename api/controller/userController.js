const User = require('./../models/userModel');
const APIfeatures = require('./../utils/apiFeatures');
const multer = require('multer');
const Subscription = require('./../models/userSupscription');
const privateSubscription = require('./../models/privateSupscriptionModel');
const privateClassSubscription = require('./../models/privateClassSupscription');
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/users');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Please Upload only image'), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.getAllUsers = async (req, res) => {
  try {
    const features = new APIfeatures(User.find(), req.query)
      .filter()
      .sort()
      .limit()
      .paginate();

    const users = await features.query;

    res.status(200).json({
      status: 'success',
      length: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: err.message,
    });
  }
};

exports.updateMe = async (req, res) => {
  try {
    // 1) return error if user send password
    if (req.body.password || req.body.passwordConfirm) {
      throw new Error('This route is not for update password');
    }

    // 2) filter the data, by getting just allowed data
    const filteredData = filterObj(req.body, 'name', 'email');

    // 3) update data

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      filteredData,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message,
    });
  }
};

exports.deleteMe = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });
  res.status(204).json();
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw new Error('This user not found with given id');
    if (user)
      res.status(200).json({
        status: 'success',
      });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: err.message,
    });
  }
};
exports.updateUser = async (req, res) => {
  try {
    if (req.file) req.body.photo = req.file.filename;
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: err.message,
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('subscribe');
    const subscribe = await Subscription.findOne({ user: user._id });
    const private = await privateSubscription.findOne({ trainee: user._id });
    const classes = await privateClassSubscription.find({ trainee: user._id });
    console.log(subscribe);
    user.supscription = subscribe;
    res.status(200).json({
      status: 'success',
      user,
      subscribe,
      private,
      classes,
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: err.message,
    });
  }
};
