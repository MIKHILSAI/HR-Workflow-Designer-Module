# Product Requirements Document (PRD)

## HR Workflow Designer Module

---

**Version:** 1.0  
**Date:** June 2025  
**Status:** Draft  
**Author:** Engineering Team  

---

## 1. Executive Summary

### 1.1 Product Vision
Build an intuitive, visual workflow designer that enables HR teams to design, validate, and simulate approval processes without writing code. The module serves as a no-code canvas for constructing HR automation pipelines using drag-and-drop node-based editing.

### 1.2 Problem Statement
HR departments currently rely on manual processes, spreadsheets, or rigid enterprise tools to manage employee onboarding, leave approvals, performance reviews, and offboarding. These approaches suffer from:
- **Lack of visibility** — Stakeholders cannot see the full approval chain
- **Error-prone handoffs** — Manual transitions between departments cause delays
- **No simulation capability** — Teams discover workflow flaws only in production
- **High technical barrier** — Building custom workflows requires engineering resources

### 1.3 Solution
A browser-based visual workflow designer that allows HR operations teams to:
- Design workflows by dragging and connecting nodes on a canvas
- Configure node properties through a guided form panel
- Validate workflows for structural correctness before deployment
- Simulate execution to preview behavior and catch errors early
- Export/import workflows for version control and sharing

---

## 2. Target Users

| Persona | Role | Goals | Pain Points |
|---------|------|-------|-------------|
| **HR Operations Manager** | Designs and maintains workflows | Build approval chains quickly; ensure compliance | Needs no-code tool; fears breaking live processes |
| **HR Administrator** | Executes day-to-day workflows | Run simulations; troubleshoot issues | Needs clear error messages; wants to test before deploying |
| **IT/Engineering Liaison** | Integrates with HRIS systems | Export workflow definitions; ensure data integrity | Needs structured JSON schemas; wants validation APIs |

---

## 3. User Stories

### US-001: Create a Workflow
> *As an* HR Operations Manager,  
> *I want to* drag nodes onto a canvas and connect them with edges,  
> *so that* I can visually design an approval workflow.

**Acceptance Criteria:**
- Canvas supports drag-and-drop from a node palette
- Five node types available: Start, Task, Approval, Automated, End
- Nodes can be repositioned by dragging
- Edges are created by connecting source handles to target handles
- Canvas includes zoom, fit-view, and minimap controls

### US-002: Configure Node Properties
> *As an* HR Operations Manager,  
> *I want to* click a node to edit its properties,  
> *so that* I can define assignees, approvers, and automated actions.

**Acceptance Criteria:**
- Clicking a node opens a properties panel on the right
- Panel shows node-type-specific form fields
- Changes are saved explicitly via a Save button
- Unsaved changes show a visual indicator
- Panel can be closed with an X button or Escape key

### US-003: Validate Workflow Structure
> *As an* HR Administrator,  
> *I want to* validate my workflow before simulation,  
> *so that* I can fix structural errors early.

**Acceptance Criteria:**
- Validation runs automatically on simulation trigger
- Errors display inline on nodes (red border + tooltip)
- Global errors show in the simulation modal
- Rules enforced: exactly one Start node, no cycles, required fields, at least one End node

### US-004: Simulate Workflow Execution
> *As an* HR Administrator,  
> *I want to* run a mock execution of my workflow,  
> *so that* I can verify logic and preview outcomes.

**Acceptance Criteria:**
- Simulation modal opens from the toolbar
- Displays execution timeline with step-by-step logs
- Each step shows status (success/pending/failed), timestamp, and mock logs
- Summary shows total steps, success/failure status, and errors
- Results can be exported as JSON

### US-005: Export and Import Workflows
> *As an* IT/Engineering Liaison,  
> *I want to* save workflows as JSON files and load them back,  
> *so that* I can version control workflow definitions.

**Acceptance Criteria:**
- Export button downloads current workflow as `.json`
- Import button accepts `.json` files via file picker
- Invalid JSON shows an error alert
- Imported workflow replaces the current canvas state
- Fit-view runs automatically after import

---

## 4. Functional Requirements

### 4.1 Canvas & Node Management

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-001 | Canvas shall support infinite pan and zoom | P0 |
| FR-002 | Node palette shall display 5 draggable node types with icons and descriptions | P0 |
| FR-003 | Dropping a node on canvas shall create it at the drop position | P0 |
| FR-004 | Nodes shall be selectable (single) and movable | P0 |
| FR-005 | Selected nodes shall display a distinct highlight border | P0 |
| FR-006 | Nodes shall have top (target) and bottom (source) connection handles | P0 |
| FR-007 | Edges shall be created by dragging from source to target handle | P0 |
| FR-008 | Edges shall render as smoothstep curves with animated option | P1 |
| FR-009 | Deleting a node shall remove it and all connected edges | P0 |
| FR-010 | Canvas shall include background dots, controls, and minimap | P1 |
| FR-011 | First-time visitors shall see a Start node auto-created on the canvas | P2 |

### 4.2 Properties Panel

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-012 | Clicking a node shall open the properties panel | P0 |
| FR-013 | Panel shall show node metadata (type, ID, position) | P1 |
| FR-014 | Panel shall display type-specific form fields | P0 |
| FR-015 | Form changes shall be tracked with dirty state indicator | P0 |
| FR-016 | Save button shall persist changes to the node | P0 |
| FR-017 | Reset button shall revert unsaved changes | P1 |
| FR-018 | Delete button shall remove the node and close panel | P0 |
| FR-019 | Panel shall include Properties and Advanced tabs | P1 |

### 4.3 Node Types & Fields

#### Start Node
- **Label** (text)
- **Trigger Type** (select: manual, scheduled, webhook)
- **Description** (textarea)

#### Task Node
- **Title** (text, required)
- **Description** (textarea)
- **Assignee** (text/email)
- **Due Date** (date picker)
- **Custom Fields** (dynamic key-value pairs)

#### Approval Node
- **Title** (text)
- **Approver Role** (text, required)
- **Approver Email** (email)
- **Description** (textarea)
- **Auto-Approve** (toggle)

#### Automated Node
- **Title** (text)
- **Action** (select from predefined automations)
- **Action Parameters** (dynamic form based on selected action)

**Predefined Automations:**
| Action ID | Label | Parameters |
|-----------|-------|------------|
| `send_email` | Send Email | to, subject, body |
| `generate_doc` | Generate Document | template, recipient |
| `slack_notify` | Slack Notification | channel, message |
| `create_ticket` | Create JIRA Ticket | project, summary, assignee |
| `update_hris` | Update HRIS Record | employeeId, field, value |

#### End Node
- **Label** (text)
- **Send Summary** (toggle)
- **Summary Recipient** (email, shown when toggle is on)

### 4.4 Validation Engine

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-020 | Graph shall have exactly one Start node | P0 |
| FR-021 | Start node shall have zero incoming edges | P0 |
| FR-022 | Graph shall be acyclic (no circular connections) | P0 |
| FR-023 | Task nodes shall have a non-empty title | P0 |
| FR-024 | Approval nodes shall have a non-empty approver role | P0 |
| FR-025 | Graph shall have at least one End node | P0 |
| FR-026 | Validation errors shall display inline on affected nodes | P0 |
| FR-027 | Validation shall run before simulation | P0 |

### 4.5 Simulation Engine

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-028 | Simulation shall run only on valid graphs | P0 |
| FR-029 | Execution shall follow topological order | P0 |
| FR-030 | Each step shall show node type, title, status, timestamp, and logs | P0 |
| FR-031 | Statuses shall be: success, pending, failed | P0 |
| FR-032 | End nodes shall always simulate as success | P1 |
| FR-033 | Simulation modal shall display JSON payload (collapsible) | P1 |
| FR-034 | Results shall be exportable as JSON file | P1 |
| FR-035 | Simulation shall complete within 2 seconds for graphs under 50 nodes | P1 |

### 4.6 Import / Export

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-036 | Export shall serialize nodes, edges, and node data to JSON | P0 |
| FR-037 | Import shall parse JSON and restore canvas state | P0 |
| FR-038 | Invalid JSON shall show a user-friendly error | P0 |
| FR-039 | Import shall auto-fit the view to show all nodes | P1 |

---

## 5. Non-Functional Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-001 | Canvas shall support up to 100 nodes with 60fps interaction | P1 |
| NFR-002 | Initial load time shall be under 3 seconds on broadband | P0 |
| NFR-003 | UI shall be responsive down to 1280x720 resolution | P1 |
| NFR-004 | Application shall work in Chrome, Firefox, Safari, Edge (latest 2 versions) | P0 |
| NFR-005 | Keyboard navigation shall be supported (Tab, Enter, Escape, Delete) | P1 |
| NFR-006 | Color contrast shall meet WCAG AA standards | P1 |
| NFR-007 | Exported JSON schema shall be versioned for backward compatibility | P2 |

---

## 6. UI/UX Requirements

### 6.1 Design System
- **Color palette:** Neutral grays (#F8FAFC, #E2E8F0, #94A3B8, #475569) with accent colors per node type
- **Typography:** Inter font family, 12px–16px scale
- **Border radius:** 8px–12px for cards, 6px–10px for buttons
- **Shadows:** Subtle elevation (0 1px 4px rgba) for nodes, stronger for modals
- **Spacing:** 4px base grid system

### 6.2 Node Styling

| Type | Fill Color | Accent Color | Icon |
|------|-----------|--------------|------|
| Start | `#E6FFF3` | `#29C08A` | Play |
| Task | `#E8F3FF` | `#2B9CFF` | ClipboardList |
| Approval | `#FFF8E1` | `#FFB020` | CheckSquare |
| Automated | `#F3EDFF` | `#7A5CFF` | Zap |
| End | `#E8EEF5` | `#5E6B7A` | StopCircle |

### 6.3 Layout
- **Header:** App title + status indicator (fixed, 48px height)
- **Left Sidebar:** Node palette (220px width)
- **Center:** Canvas (flexible, full remaining space)
- **Right Panel:** Properties editor (360px width, collapsible via deselect)
- **Modals:** Centered overlay with backdrop blur

### 6.4 Interaction Patterns
- Hover states on all interactive elements
- Active/pressed states on buttons
- Loading spinners for async operations (simulation, data fetch)
- Toast notifications for save confirmations and errors
- Tooltips on icon-only buttons

---

## 7. Data Models

### 7.1 Node Schema

```json
{
  "id": "node_1234567890_1",
  "type": "task | approval | automated | start | end",
  "position": {
    "x": 250,
    "y": 150
  },
  "data": {
    // Type-specific fields (see section 4.3)
  }
}
```

### 7.2 Edge Schema

```json
{
  "id": "e1-2",
  "source": "node_1234567890_1",
  "target": "node_1234567890_2",
  "label": "approved"
}
```

### 7.3 Workflow Export Schema

```json
{
  "version": "1.0",
  "exportedAt": "2025-06-01T00:00:00Z",
  "nodes": [ /* Node objects */ ],
  "edges": [ /* Edge objects */ ]
}
```

### 7.4 Simulation Result Schema

```json
{
  "result": [
    {
      "stepId": "step_1",
      "nodeId": "node_1234567890_1",
      "nodeType": "task",
      "title": "Review Application",
      "status": "success | pending | failed",
      "timestamp": "2025-06-01T00:00:00Z",
      "logs": ["Log entry 1", "Log entry 2"]
    }
  ],
  "summary": {
    "success": true,
    "errors": [],
    "totalSteps": 5,
    "completedAt": "2025-06-01T00:00:00Z"
  }
}
```

---

## 8. Technical Architecture

### 8.1 Frontend Stack
| Layer | Technology |
|-------|------------|
| Framework | React 18 (Functional Components + Hooks) |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS 3.4 |
| UI Components | shadcn/ui (Radix UI primitives) |
| Flow Engine | `@xyflow/react` |
| State Management | React Context + useReducer |
| Icons | `lucide-react` |
| Routing | `react-router-dom` |
| Query | `@tanstack/react-query` |

### 8.2 State Management
- **FlowContext:** Global state for nodes, edges, selection, validation errors, simulation state
- **Local state:** Form inputs in properties panel (dirty tracking before save)
- **Session storage:** First-visit flag for onboarding (auto-create Start node)

### 8.3 Graph Algorithms
- **Cycle Detection:** Depth-First Search (DFS) with color marking
- **Topological Sort:** Kahn's algorithm (in-degree counting)
- **Validation:** Multi-pass validation combining structural and field-level checks

### 8.4 API Layer (Mock)
Current implementation uses mock APIs with artificial delays:
- `fetchAutomations()` — returns predefined automation actions
- `postSimulate(workflow)` — runs validation + topological simulation

Future versions shall integrate with real backend services.

---

## 9. Success Metrics (KPIs)

| Metric | Baseline | Target |
|--------|----------|--------|
| Time to first workflow | — | < 5 minutes for new users |
| Workflow validation pass rate | — | > 90% on first attempt |
| Simulation usage | — | > 70% of created workflows |
| User-reported bugs | — | < 2 per week |
| Canvas performance (100 nodes) | — | 60fps pan/zoom |

---

## 10. Future Roadmap

### Phase 2 (Next Quarter)
- [ ] Undo/redo history (Ctrl+Z / Ctrl+Shift+Z)
- [ ] localStorage auto-save and restore
- [ ] Edge labels and conditional branching (if/else paths)
- [ ] Template library (pre-built HR workflows)

### Phase 3 (Following Quarter)
- [ ] Real backend API integration (persist workflows to database)
- [ ] Role-based access control (view vs. edit permissions)
- [ ] Workflow versioning and diff view
- [ ] Integration with HRIS systems (Workday, BambooHR)

### Phase 4 (Future)
- [ ] Collaborative editing (multiple users on same canvas)
- [ ] AI-assisted workflow suggestions
- [ ] Execution dashboard (monitor live workflow instances)
- [ ] Mobile-responsive canvas view

---

## 11. Assumptions & Constraints

### Assumptions
- Users have modern browsers with JavaScript enabled
- HR teams have basic computer literacy (no coding required)
- Workflows are acyclic by design (DAG structure)

### Constraints
- Maximum recommended nodes per workflow: 100
- Simulation is mock-only; no real backend integration in v1
- Single-tenant deployment per organization
- No real-time collaboration in v1

---

## 12. Open Questions

1. Should we support multiple Start nodes for parallel workflow entry points?
2. What HRIS systems should Phase 3 integrations target first?
3. Should workflow templates be user-created or admin-curated?
4. Is SSO/SAML authentication required for enterprise deployments?

---

## Appendix A: Glossary

| Term | Definition |
|------|------------|
| **Canvas** | The visual workspace where nodes and edges are arranged |
| **DAG** | Directed Acyclic Graph — a graph with no cycles |
| **Edge** | A connection between two nodes representing flow direction |
| **Handle** | A connection point on a node (source = output, target = input) |
| **Node** | A visual element representing a step in the workflow |
| **Simulation** | A mock execution of the workflow for testing purposes |
| **Topological Sort** | Ordering of nodes such that every edge goes from earlier to later |

---

## Appendix B: JSON Export Example

```json
{
  "version": "1.0",
  "exportedAt": "2025-06-01T12:00:00Z",
  "nodes": [
    {
      "id": "node_1717224000000_1",
      "type": "start",
      "position": { "x": 250, "y": 80 },
      "data": { "label": "Start", "triggerType": "manual", "description": "Employee onboarding kickoff" }
    },
    {
      "id": "node_1717224000000_2",
      "type": "task",
      "position": { "x": 250, "y": 200 },
      "data": { "title": "Submit Documents", "description": "Upload ID and address proof", "assignee": "new-hire@company.com", "dueDate": "2025-06-05", "customFields": [] }
    },
    {
      "id": "node_1717224000000_3",
      "type": "approval",
      "position": { "x": 250, "y": 340 },
      "data": { "title": "HR Review", "approverRole": "HR Manager", "approverEmail": "hr@company.com", "description": "Verify submitted documents", "autoApprove": false }
    },
    {
      "id": "node_1717224000000_4",
      "type": "automated",
      "position": { "x": 250, "y": 480 },
      "data": { "title": "Send Welcome Email", "actionId": "send_email", "actionParams": { "to": "new-hire@company.com", "subject": "Welcome!", "body": "Welcome to the team." } }
    },
    {
      "id": "node_1717224000000_5",
      "type": "end",
      "position": { "x": 250, "y": 620 },
      "data": { "label": "End", "sendSummary": true, "summaryRecipient": "hr@company.com" }
    }
  ],
  "edges": [
    { "id": "e1-2", "source": "node_1717224000000_1", "target": "node_1717224000000_2" },
    { "id": "e2-3", "source": "node_1717224000000_2", "target": "node_1717224000000_3" },
    { "id": "e3-4", "source": "node_1717224000000_3", "target": "node_1717224000000_4" },
    { "id": "e4-5", "source": "node_1717224000000_4", "target": "node_1717224000000_5" }
  ]
}
```

---
