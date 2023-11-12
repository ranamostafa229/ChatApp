const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({
        msg: "Incorrect Username or Password ",
        status: false,
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ msg: "Incorrect Username or Password", status: false });
    }
    delete password;
    res.json({ status: true, user });
  } catch (ex) {
    next(ex);
    console.log(ex.message);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({
        msg: "Username is already used",
        status: false,
      });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({
        msg: "Email is already used",
        status: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    delete user.password;

    res.json({
      user,
      status: true,
    });
  } catch (error) {
    next(error);
  }
};
module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports.checkUsername = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      return res.json({
        status: false,
        msg: "Username is already taken",
      });
    } else {
      return res.json({
        status: true,
        msg: "Username is available.",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.firebaseLogin = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (email) {
      const user = await User.findOne({ email });
      if (user) {
        delete user.password;
        return res.json({ status: true, user });
      } else {
        return res.json({
          status: false,
          msg: "Email not found in database",
        });
      }
    }
  } catch (error) {
    next(error);
  }
};
module.exports.logout = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};
