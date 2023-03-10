const express = require('express');
const router = express.Router();
const authCpntroller = require('./../controller/authController');
const userController = require('./../controller/userController');

router.post('/signup', authCpntroller.uploadUserPhoto, authCpntroller.signup);
router.post('/login', authCpntroller.login);
router.post('/forgotPassword', authCpntroller.forgotPassword);
router.patch('/resetPassword/:token', authCpntroller.resetPassword);
router.patch(
  '/updatePassword',
  authCpntroller.protect,
  authCpntroller.updatePassword
);
router.patch('/updateMe', authCpntroller.protect, userController.updateMe);
router.delete('/deleteMe', authCpntroller.protect, userController.deleteMe);

router.route('/').get(userController.getAllUsers);
router
  .route('/:id')
  .delete(userController.deleteUser)
  .patch(userController.uploadUserPhoto, userController.updateUser)
  .get(userController.getOne);

module.exports = router;
