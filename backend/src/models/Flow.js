import mongoose from 'mongoose';

const StepSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    type: {
      type: String,
      enum: ['info', 'form', 'action', 'checklist'],
      required: true
    },
    fields: [
      {
        key: String,
        label: String,
        inputType: { type: String, default: 'text' },
        required: { type: Boolean, default: false }
      }
    ],
    checklistItems: [String],
    activationCriteria: {
      type: {
        type: String,
        enum: ['stepCompletion', 'fieldEquals'],
        default: 'stepCompletion'
      },
      stepKey: String,
      fieldKey: String,
      expectedValue: String
    }
  },
  { _id: false }
);

const FlowSchema = new mongoose.Schema(
  {
    startupId: { type: String, default: 'default_startup', index: true },
    segment: { type: String, required: true, index: true },
    name: { type: String, required: true },
    activationStepKey: { type: String, required: true },
    steps: [StepSchema]
  },
  { timestamps: true }
);

FlowSchema.index({ startupId: 1, segment: 1 }, { unique: true });

export const Flow = mongoose.model('Flow', FlowSchema);
