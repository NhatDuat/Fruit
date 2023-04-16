import Users from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// user registration
export const register = async (req, res) => {
  try {
    //hashing password
    const name = await Users.findOne({ username: req.body.username });
    const email = await Users.findOne({ email: req.body.email });
    if (name || email) {
      return res.status(400).json({
        success: true,
        message: 'tene va email bij trungf',
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUSer = await new Users({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const accountUser = await newUSer.save();

    res.status(200).json({
      success: true,
      message: 'Successfully created',
      data: accountUser,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ success: false, message: 'Failed to create.Try again' });
  }
};
//user login

export const login = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    //nếu người dùng không tồn tại
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    } else {
      //nếu người dùng tồn tại thì hãy kiểm tra mật khẩu hoặc so sánh mật khẩu

      const password = await bcrypt.compare(req.body.password, user.password);
      if (!password) {
        return res
          .status(404)
          .json({ success: false, message: 'Password not found' });
      } else {
        // create jwt token
        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET_KEY,
          { expiresIn: '15d' }
        );

        // res.cookie('accessToken', token, {
        //   httpOnly: true,
        //   expires: token.expiresIn,
        // });

        const { _id, username, email, photo, role } = user;

        res
          .cookie('accessToken', token, {
            httpOnly: true,
            expires: token.expiresIn,
          })
          .status(200)
          .json({
            success: true,
            message: 'thanh ocn',
            data: { _id, username, email, photo, role },
          });
      }
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Bad request' });
  }
};
