import mongoose from 'mongoose';

const AnalyticsEventSchema = new mongoose.Schema(
  {
    startupId: { type: String, default: 'default_startup', index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    flowId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flow', required: true },
    eventType: {
      type: String,
      enum: ['step_completed', 'activation_completed', 'onboarding_completed'],
      required: true
    },
    stepKey: { type: String, default: null },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} }
  },
  { timestamps: true }
);

export const AnalyticsEvent = mongoose.model('AnalyticsEvent', AnalyticsEventSchema);
