# HR Workflow Designer

A visual workflow builder for HR teams built with React, Vite, and Tailwind CSS. Design, validate, and simulate HR approval processes using an intuitive drag-and-drop canvas.

![Tech Stack](https://img.shields.io/badge/React-18.2-blue?logo=react)
![Tech Stack](https://img.shields.io/badge/Vite-6.1-purple?logo=vite)
![Tech Stack](https://img.shields.io/badge/Tailwind-3.4-cyan?logo=tailwindcss)
![Tech Stack](https://img.shields.io/badge/ReactFlow-12.10-orange)

## Features

- **Visual Canvas** — Drag-and-drop node-based workflow designer powered by `@xyflow/react`
- **5 Node Types** — Start, Task, Approval, Automated, and End nodes
- **Validation Engine** — Real-time graph validation (cycle detection, required fields, start/end constraints)
- **Workflow Simulator** — Run mock simulations with execution logs and JSON export
- **Import / Export** — Save workflows as JSON files and load them back
- **Responsive UI** — Built with Tailwind CSS and shadcn/ui components

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + Vite 6 |
| Styling | Tailwind CSS 3.4 + shadcn/ui (Radix UI primitives) |
| Flow Engine | `@xyflow/react` (React Flow) |
| State | React Context + useReducer |
| Icons | `lucide-react` |
| Auth | `@base44/sdk` |
| Charts | `recharts` |
| Query | `@tanstack/react-query` |

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Run typecheck
npm run typecheck
```

## Project Structure

```
src/
├── api/                    # API clients
│   └── base44Client.js
├── components/
│   ├── Canvas/             # Canvas UI (toolbar, sidebar, flow canvas)
│   │   ├── CanvasToolbar.jsx
│   │   ├── FlowCanvas.jsx
│   │   └── Sidebar.jsx
│   ├── Common/
│   │   └── AppHeader.jsx
│   ├── NodeForm/           # Node property editors
│   │   ├── NodeFormPanel.jsx
│   │   ├── StartForm.jsx
│   │   ├── TaskForm.jsx
│   │   ├── ApprovalForm.jsx
│   │   ├── AutomatedForm.jsx
│   │   ├── EndForm.jsx
│   │   └── FormField.jsx
│   ├── Nodes/              # Custom node renderers
│   │   ├── NodeBase.jsx
│   │   ├── StartNode.jsx
│   │   ├── TaskNode.jsx
│   │   ├── ApprovalNode.jsx
│   │   ├── AutomatedNode.jsx
│   │   └── EndNode.jsx
│   ├── Sandbox/            # Simulation UI
│   │   ├── SimulatorPanel.jsx
│   │   └── ExecutionLog.jsx
│   └── ui/                 # shadcn/ui components
├── context/
│   └── FlowContext.jsx     # Global flow state (nodes, edges, selection)
├── hooks/
│   └── use-mobile.jsx
├── lib/                    # Utilities & shared logic
│   ├── utils.js
│   ├── app-params.js
│   ├── query-client.js
│   ├── AuthContext.jsx
│   └── PageNotFound.jsx
├── pages/
│   └── WorkflowDesigner.jsx
├── services/
│   └── api.js              # API layer (mock automations + simulation)
├── types/
│   └── nodes.js            # Node type definitions & defaults
├── utils/
│   ├── graph.js            # Graph algorithms (cycle detection, topo sort, validation)
│   └── index.ts
├── App.jsx
├── main.jsx
└── index.css
```

## Node Types

| Type | Color | Description | Configurable Fields |
|------|-------|-------------|---------------------|
| **Start** | `#29C08A` | Workflow entry point | Trigger type, description |
| **Task** | `#2B9CFF` | Manual task assignment | Title, description, assignee, due date, custom fields |
| **Approval** | `#FFB020` | Requires sign-off | Title, approver role, approver email, auto-approve |
| **Automated** | `#7A5CFF` | Runs action automatically | Action ID, action params |
| **End** | `#5E6B7A` | Workflow exit point | Send summary, summary recipient |

## Graph Validation Rules

The engine enforces the following rules before simulation:

1. **Exactly one Start node** — Workflows must have one (and only one) entry point
2. **No incoming edges to Start** — The start node cannot be targeted by other nodes
3. **No cycles allowed** — Circular connections are detected via DFS and rejected
4. **Required fields** — Task nodes need a title; Approval nodes need an approver role
5. **At least one End node** — Every workflow must have an exit point
6. **End reachability** — End nodes should exist in connected graphs

## Workflow Simulation

Click **Simulate** in the toolbar to open the simulator modal. It will:

1. Validate the current graph
2. Run a topological execution order
3. Generate mock execution logs per node
4. Display a timeline with success / pending / failed statuses
5. Allow exporting the full result as JSON

The simulation uses mock data for automated actions:
- `send_email`, `generate_doc`, `slack_notify`, `create_ticket`, `update_hris`

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Delete` | Remove selected node |
| `Shift + Click` | Multi-select nodes |
| `Drag` | Move nodes or create edges |

## Data Model

### Node
```json
{
  "id": "node_1234567890_1",
  "type": "task",
  "position": { "x": 250, "y": 150 },
  "data": {
    "title": "Review Application",
    "description": "",
    "assignee": "",
    "dueDate": "",
    "customFields": []
  }
}
```

### Edge
```json
{
  "id": "e1-2",
  "source": "node_1234567890_1",
  "target": "node_1234567890_2",
  "label": "approved"
}
```

## License

MIT

