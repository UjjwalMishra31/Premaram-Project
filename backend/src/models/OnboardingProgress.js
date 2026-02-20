import mongoose from 'mongoose';

const OnboardingProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true
    },
    flowId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flow',
      required: true
    },
    currentStepIndex: { type: Number, default: 0 },
    completedStepKeys: { type: [String], default: [] },
    stepData: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {}
    },
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

export const OnboardingProgress = mongoose.model('OnboardingProgress', OnboardingProgressSchema);
