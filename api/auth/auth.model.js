import mongoose, { Schema } from 'mongoose';

const { ObjectId } = mongoose.Types;
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

export const USER_STATUSES = {
  NOT_VERIFY: 'NOT_VERIFY',
  ACTIVE: 'ACTIVE',
};

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscription: {
    type: String,
    enum: ['free', 'pro', 'premium'],
    default: 'free',
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(USER_STATUSES),
    default: USER_STATUSES.NOT_VERIFY,
  },
  avatarURL: { type: String, required: true },
  token: { type: String },
});

userSchema.statics.getUserEmail = getUserEmail;
userSchema.statics.createUser = createUser;
userSchema.statics.updateUser = updateUser;
userSchema.statics.findUserByToken = findUserByToken;
userSchema.statics.getUserByIdAndDeleteToken = getUserByIdAndDeleteToken;
userSchema.statics.updateUserAvatar = updateUserAvatar;

function getUserEmail(email) {
  return this.findOne({ email });
}

function createUser(userAuth) {
  return this.create(userAuth);
}

function updateUser(email, token) {
  return this.findOneAndUpdate({ email }, { token });
}

function findUserByToken(token) {
  return this.findOne({ token });
}

function getUserByIdAndDeleteToken(userId) {
  if (!ObjectId(userId)) {
    return null;
  }
  return this.findByIdAndUpdate(userId, { token: '' });
}

function updateUserAvatar(email, avatarURL) {
  return this.findOneAndUpdate({ email }, { avatarURL });
}

export const userModel = mongoose.model('User', userSchema);
