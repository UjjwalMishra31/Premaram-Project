import { Flow } from '../models/Flow.js';

export const getFlowForSegment = async ({ startupId, segment }) => {
  const exactMatch = await Flow.findOne({ startupId, segment });
  if (exactMatch) return exactMatch;
  return Flow.findOne({ startupId, segment: 'general' });
};

export const seedDefaultFlows = async () => {
  const existing = await Flow.countDocuments();
  if (existing > 0) return;

  await Flow.create({
    startupId: 'default_startup',
    segment: 'general',
    name: 'General Startup Onboarding',
    activationStepKey: 'connect_workspace',
    steps: [
      {
        key: 'welcome',
        title: 'Welcome to the product',
        description: 'Learn what activation means for your startup users.',
        type: 'info'
      },
      {
        key: 'profile_details',
        title: 'Tell us a little more',
        description: 'Add your context for personalized setup.',
        type: 'form',
        fields: [
          { key: 'teamSize', label: 'Team Size', inputType: 'text', required: true },
          { key: 'useCase', label: 'Primary Use Case', inputType: 'text', required: true }
        ]
      },
      {
        key: 'connect_workspace',
        title: 'Connect Your Workspace',
        description: 'Perform your first core action to reach activation.',
        type: 'action'
      },
      {
        key: 'launch_checklist',
        title: 'Launch Checklist',
        description: 'Complete final setup tasks.',
        type: 'checklist',
        checklistItems: ['Invite one teammate', 'Create first project', 'View dashboard']
      }
    ]
  });

  console.log('Seeded default onboarding flow');
};
