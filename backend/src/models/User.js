import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    startupId: { type: String, default: 'default_startup', index: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: null },
    goal: { type: String, default: null },
    segment: { type: String, default: null },
    onboardingCompleted: { type: Boolean, default: false },
    activatedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

export const User = mongoose.model('User', UserSchema);
