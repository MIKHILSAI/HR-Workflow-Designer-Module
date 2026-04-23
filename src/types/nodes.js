// Node type constants
export const NODE_TYPES = {
  START: 'start',
  TASK: 'task',
  APPROVAL: 'approval',
  AUTOMATED: 'automated',
  END: 'end',
};

// Node palette definitions
export const NODE_PALETTE = [
  {
    type: NODE_TYPES.START,
    label: 'Start',
    description: 'Workflow entry point',
    icon: 'Play',
    fill: '#E6FFF3',
    accent: '#29C08A',
  },
  {
    type: NODE_TYPES.TASK,
    label: 'Task',
    description: 'Manual task assignment',
    icon: 'ClipboardList',
    fill: '#E8F3FF',
    accent: '#2B9CFF',
  },
  {
    type: NODE_TYPES.APPROVAL,
    label: 'Approval',
    description: 'Requires sign-off',
    icon: 'CheckSquare',
    fill: '#FFF8E1',
    accent: '#FFB020',
  },
  {
    type: NODE_TYPES.AUTOMATED,
    label: 'Automated',
    description: 'Runs action automatically',
    icon: 'Zap',
    fill: '#F3EDFF',
    accent: '#7A5CFF',
  },
  {
    type: NODE_TYPES.END,
    label: 'End',
    description: 'Workflow exit point',
    icon: 'StopCircle',
    fill: '#E8EEF5',
    accent: '#5E6B7A',
  },
];

export const NODE_META = {
  [NODE_TYPES.START]: { fill: '#E6FFF3', accent: '#29C08A', icon: 'Play', label: 'Start' },
  [NODE_TYPES.TASK]: { fill: '#E8F3FF', accent: '#2B9CFF', icon: 'ClipboardList', label: 'Task' },
  [NODE_TYPES.APPROVAL]: { fill: '#FFF8E1', accent: '#FFB020', icon: 'CheckSquare', label: 'Approval' },
  [NODE_TYPES.AUTOMATED]: { fill: '#F3EDFF', accent: '#7A5CFF', icon: 'Zap', label: 'Automated' },
  [NODE_TYPES.END]: { fill: '#E8EEF5', accent: '#5E6B7A', icon: 'StopCircle', label: 'End' },
};

export function getDefaultNodeData(type) {
  switch (type) {
    case NODE_TYPES.START:
      return { label: 'Start', triggerType: 'manual', description: '' };
    case NODE_TYPES.TASK:
      return { title: 'New Task', description: '', assignee: '', dueDate: '', customFields: [] };
    case NODE_TYPES.APPROVAL:
      return { title: 'Approval', approverRole: '', approverEmail: '', description: '', autoApprove: false };
    case NODE_TYPES.AUTOMATED:
      return { title: 'Automated Action', actionId: '', actionParams: {} };
    case NODE_TYPES.END:
      return { label: 'End', sendSummary: false, summaryRecipient: '' };
    default:
      return { label: type };
  }
}