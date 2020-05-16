import mongoose, { Schema } from 'mongoose';

const { ObjectId } = mongoose.Types;
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscription: {
    type: String,
    enum: ['free', 'pro', 'premium'],
    default: 'free',
  },
  token: { type: String, required: true },
});

userSchema.statics.getUserEmail = getUserEmail;
userSchema.statics.createUser = createUser;
userSchema.statics.updateUser = updateUser;
userSchema.statics.findUserByToken = findUserByToken;

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

export const userModel = mongoose.model('User', userSchema);
