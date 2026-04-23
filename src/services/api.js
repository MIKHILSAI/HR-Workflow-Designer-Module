import { validateGraph, mockSimulate } from '@/utils/graph';

const MOCK_AUTOMATIONS = [
  { id: 'send_email', label: 'Send Email', params: ['to', 'subject', 'body'] },
  { id: 'generate_doc', label: 'Generate Document', params: ['template', 'recipient'] },
  { id: 'slack_notify', label: 'Slack Notification', params: ['channel', 'message'] },
  { id: 'create_ticket', label: 'Create JIRA Ticket', params: ['project', 'summary', 'assignee'] },
  { id: 'update_hris', label: 'Update HRIS Record', params: ['employeeId', 'field', 'value'] },
];

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchAutomations() {
  await delay(400);
  return MOCK_AUTOMATIONS;
}

export async function postSimulate(workflow) {
  await delay(800);
  const { errors, globalErrors } = validateGraph(workflow.nodes, workflow.edges);

  if (globalErrors.length > 0 || Object.keys(errors).length > 0) {
    return {
      result: [],
      summary: {
        success: false,
        errors: [...globalErrors, ...Object.values(errors).flat()],
        totalSteps: 0,
        completedAt: new Date().toISOString(),
      },
    };
  }

  return mockSimulate(workflow.nodes, workflow.edges);
}