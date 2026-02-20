import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '../../state/onboardingStore';

export const OnboardingPage = () => {
  const { flow, progress, fetchFlowAndProgress, markStepComplete } = useOnboardingStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchFlowAndProgress();
  }, [fetchFlowAndProgress]);

  const currentStep = useMemo(() => {
    if (!flow) return null;
    const index = progress?.currentStepIndex || 0;
    return flow.steps[index] || flow.steps[0];
  }, [flow, progress]);

  if (!flow || !currentStep) return <p>Loading flow...</p>;

  const completeStep = async () => {
    const payload = currentStep.type === 'checklist' ? checklistState : formData;
    const done = await markStepComplete(currentStep.key, payload);

    if (done) {
      navigate('/product');
      return;
    }

    await fetchFlowAndProgress();
    setFormData({});
    setChecklistState({});
  };

  return (
    <div className="space-y-4 rounded bg-white p-6 shadow">
      <h1 className="text-xl font-semibold">{flow.name}</h1>
      <div>
        <p className="text-sm text-slate-500">Step {Math.min((progress?.currentStepIndex || 0) + 1, flow.steps.length)} of {flow.steps.length}</p>
        <h2 className="text-lg font-medium">{currentStep.title}</h2>
        <p className="text-slate-600">{currentStep.description}</p>
      </div>

      {currentStep.type === 'form' && currentStep.fields?.map((field) => (
        <input
          key={field.key}
          className="w-full rounded border p-2"
          placeholder={field.label}
          value={formData[field.key] || ''}
          onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
        />
      ))}

      {currentStep.type === 'checklist' && (
        <div className="space-y-2">
          {currentStep.checklistItems?.map((item) => (
            <label key={item} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={Boolean(checklistState[item])}
                onChange={(e) => setChecklistState({ ...checklistState, [item]: e.target.checked })}
              />
              {item}
            </label>
          ))}
        </div>
      )}

      <button className="rounded bg-emerald-600 px-4 py-2 text-white" onClick={completeStep}>
        Complete step
      </button>
    </div>
  );
};
