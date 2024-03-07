const User = require('../Models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const Food = require('../Models/Food')
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: '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'
    }
  })
);

const salt = bcrypt.genSaltSync(10);
const jwtSecret = 
exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
   
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        
          return res.status(422).json({ error: 'Email already registered' });
      }

    
      const newUser = await User.create({
          name,
          email,
          password: bcrypt.hashSync(password, salt)
      });
    
      res.json(newUser);
  } catch (e) {
      res.status(422).json(e);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      const token = jwt.sign(
        {
          id: userDoc._id,
          email: userDoc.email,
          isAdmin: userDoc.isAdmin, 
          name:userDoc.name
        },
        "ILOVEANNA",
        { expiresIn: '1h' }
      );
    
      res
        .cookie("token", token, {
          httpOnly: true,
        })
        .json(userDoc);
    } else {
     
      res.status(422).json({ error: 'Incorrect email or password' });
    }
  } else {
    
    res.status(422).json({ error: 'Incorrect email or password' });
  }
};



exports.profile = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, "ILOVEANNA", {}, async (err, userData) => {
      if (err) {
       
        res.clearCookie('token').json({ error: 'Token expired or invalid. Please log in again.' });
      } else {
        const { name, email, _id, isAdmin } = await User.findById(userData.id);
        res.json({ name, email, _id, isAdmin });
      }
    });
  } else {
    res.json(null);
  }
}

exports.logout = async(req, res) => {
  res.clearCookie('token').json(true);
}






exports.getUsers = async (req,res,next)=>{
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}


exports.deleteUser = async (req,res,next)=>{
  try {
    await User.findByIdAndDelete(req.params.favouriteId);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
}


exports.getUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    
    const foods = await Food.find({ owner: userId });
    res.status(200).json(foods);
  } catch (err) {
    next(err);
  }
}