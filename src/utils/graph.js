// Graph utility: topological sort + cycle detection via DFS

export function detectCycle(nodes, edges) {
  const adj = {};
  nodes.forEach(n => { adj[n.id] = []; });
  edges.forEach(e => { if (adj[e.source]) adj[e.source].push(e.target); });

  const WHITE = 0, GRAY = 1, BLACK = 2;
  const color = {};
  nodes.forEach(n => { color[n.id] = WHITE; });

  function dfs(u) {
    color[u] = GRAY;
    for (const v of (adj[u] || [])) {
      if (color[v] === GRAY) return true; // back edge -> cycle
      if (color[v] === WHITE && dfs(v)) return true;
    }
    color[u] = BLACK;
    return false;
  }

  for (const n of nodes) {
    if (color[n.id] === WHITE && dfs(n.id)) return true;
  }
  return false;
}

export function topologicalSort(nodes, edges) {
  const adj = {};
  const inDegree = {};
  nodes.forEach(n => { adj[n.id] = []; inDegree[n.id] = 0; });
  edges.forEach(e => {
    if (adj[e.source]) adj[e.source].push(e.target);
    if (inDegree[e.target] !== undefined) inDegree[e.target]++;
  });

  const queue = nodes.filter(n => inDegree[n.id] === 0).map(n => n.id);
  const order = [];

  while (queue.length) {
    const u = queue.shift();
    order.push(u);
    for (const v of (adj[u] || [])) {
      inDegree[v]--;
      if (inDegree[v] === 0) queue.push(v);
    }
  }

  return order;
}

export function validateGraph(nodes, edges) {
  const errors = {}; // nodeId -> string[]
  const globalErrors = [];

  const startNodes = nodes.filter(n => n.type === 'start');
  const endNodes = nodes.filter(n => n.type === 'end');

  if (startNodes.length === 0) globalErrors.push('Workflow must have exactly one Start node.');
  if (startNodes.length > 1) globalErrors.push('Workflow must have only one Start node.');

  // Start node must have no incoming edges
  startNodes.forEach(s => {
    const incoming = edges.filter(e => e.target === s.id);
    if (incoming.length > 0) {
      errors[s.id] = errors[s.id] || [];
      errors[s.id].push('Start node must not have incoming edges.');
    }
  });

  // Cycle detection
  if (detectCycle(nodes, edges)) {
    globalErrors.push('Workflow contains a cycle. Remove circular connections.');
  }

  // Task node: title required
  nodes.filter(n => n.type === 'task').forEach(n => {
    if (!n.data?.title?.trim()) {
      errors[n.id] = errors[n.id] || [];
      errors[n.id].push('Task title is required.');
    }
  });

  // Approval node: approverRole required
  nodes.filter(n => n.type === 'approval').forEach(n => {
    if (!n.data?.approverRole?.trim()) {
      errors[n.id] = errors[n.id] || [];
      errors[n.id].push('Approver role is required.');
    }
  });

  // End reachable check (simple: end node exists and there's a path)
  if (endNodes.length === 0 && nodes.length > 0) {
    globalErrors.push('Workflow must have at least one End node.');
  }

  return { errors, globalErrors };
}

export function mockSimulate(nodes, edges) {
  // Returns mock simulation steps
  const order = topologicalSort(nodes, edges);
  const nodeMap = {};
  nodes.forEach(n => { nodeMap[n.id] = n; });

  const result = order.map((nodeId, idx) => {
    const node = nodeMap[nodeId];
    if (!node) return null;
    const statuses = ['success', 'success', 'success', 'success', 'pending'];
    const status = node.type === 'end' ? 'success' : statuses[idx % statuses.length];
    const title = node.data?.title || node.data?.label || node.type;
    const logs = generateMockLogs(node, status);
    return {
      stepId: `step_${idx + 1}`,
      nodeId,
      nodeType: node.type,
      title,
      status,
      timestamp: new Date(Date.now() + idx * 1200).toISOString(),
      logs,
    };
  }).filter(Boolean);

  return {
    result,
    summary: {
      success: true,
      errors: [],
      totalSteps: result.length,
      completedAt: new Date().toISOString(),
    },
  };
}

function generateMockLogs(node, status) {
  const type = node.type;
  const title = node.data?.title || node.data?.label || type;
  const base = {
    start: [`Workflow triggered.`, `Trigger type: ${node.data?.triggerType || 'manual'}`],
    task: [`Task "${title}" assigned to ${node.data?.assignee || 'Unassigned'}.`, `Due: ${node.data?.dueDate || 'No deadline set'}.`, `Status: ${status}`],
    approval: [`Approval request sent to role: ${node.data?.approverRole || 'Unknown'}.`, `Auto-approve: ${node.data?.autoApprove ? 'Yes' : 'No'}.`, `Decision: Approved`],
    automated: [`Running action: ${node.data?.actionId || 'none'}.`, `Params loaded.`, `Execution complete.`],
    end: [`Workflow completed successfully.`, `${node.data?.sendSummary ? 'Summary email sent.' : 'No summary email configured.'}`],
  };
  return base[type] || [`Step executed.`];
}