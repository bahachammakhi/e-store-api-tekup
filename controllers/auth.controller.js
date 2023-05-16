import userModel from "../models/user.model.js";
import CommonController from "./common.controller.js";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "longsecretthatidontknow";

class AuthController extends CommonController {
  constructor() {
    super(userModel);
    this.createToken = this.createToken.bind(this);
    this.signToken = this.signToken.bind(this);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.protect = this.protect.bind(this);
  }
  signToken(user) {
    console.log("user", user);
    return jwt.sign({ id: user._id, email: user.email }, jwtSecret, {
      expiresIn: process.env.JWT_EXPIRES_IN || "2days",
    });
  }

  createToken(user, res) {
    user.password = undefined;
    delete user.password;
    const token = this.signToken(user);

    res.status(200).json({
      token,
      data: {
        user: user,
      },
    });
  }

  async signup(req, res, next) {
    const user = new userModel(req.body);
    const result = await user.save();
    this.createToken(result, res);
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Please provide email and password", 400));
    }
    //2 check if the user exist and the password is correct
    const user = await userModel.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    this.createToken(user, res);
  }

  async protect(req, res, next) {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      console.log(
        "🚀 ~ file: auth.controller.js:66 ~ AuthController ~ protect ~ token:",
        token
      );
    }
    if (!token) {
      return res.status(401).json({
        message: "Your are not logged in! Please login to get access",
      });
    }

    const decoded = jwt.verify(token, jwtSecret);
    console.log(
      "🚀 ~ file: auth.controller.js:78 ~ AuthController ~ protect ~ decoded:",
      decoded
    );

    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        message: "The user belonging to this token does not longer exist.",
      });
    }
    req.user = user;
    next();
  }

  async hasRole(role) {
    return (req, res, next) => {
      const isValid = role === req.user.role;
      if (!isValid) {
        return res.status(401).json({
          message: "You do not have perrmisson to perform this action",
        });
      }
      next();
    };
  }

  async isOwner() {
    return async (req, res, next) => {
      const id = req.params.id;
      const item = await itemModel.findById(id);
      const userId = req.user.id;
      const isValid = item.owner === userId;
      if (!isValid) {
        return res.status(401).json({
          message: "You do not have permission to perform this action",
        });
      }
      next();
    };
  }
}

export default new AuthController();
