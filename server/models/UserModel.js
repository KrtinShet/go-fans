const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a name"],
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    profileImage: {
      type: String,
      default: "default.jpg",
    },
    role: {
      type: String,
      enum: ["user", "publisher"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    description: {
      type: String,
    },
    tagline: {
      type: String
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  if (this.password) {
    const salt = await bcrypt.genSalt(11);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

UserSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex"); //Never storing it in the database

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", UserSchema);
