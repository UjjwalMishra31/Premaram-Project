export const resolveSegment = ({ role, goal }) => {
  if (!role || !goal) return 'general';
  return `${role.toLowerCase()}_${goal.toLowerCase().replace(/\s+/g, '_')}`;
};
