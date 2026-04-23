import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { addEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import { getDefaultNodeData } from '@/types/nodes';

const FlowContext = createContext(null);

const initialState = {
  nodes: [],
  edges: [],
  selectedNodeId: null,
  validationErrors: {},  // nodeId -> string[]
  automations: [],
  simulationResult: null,
  isSimulating: false,
  simulationOpen: false,
};

function flowReducer(state, action) {
  switch (action.type) {
    case 'SET_NODES':
      return { ...state, nodes: action.nodes };
    case 'SET_EDGES':
      return { ...state, edges: action.edges };
    case 'ADD_NODE':
      return { ...state, nodes: [...state.nodes, action.node] };
    case 'UPDATE_NODE_DATA': {
      const nodes = state.nodes.map(n =>
        n.id === action.nodeId ? { ...n, data: { ...n.data, ...action.data } } : n
      );
      return { ...state, nodes };
    }
    case 'REMOVE_NODE': {
      const nodes = state.nodes.filter(n => n.id !== action.nodeId);
      const edges = state.edges.filter(e => e.source !== action.nodeId && e.target !== action.nodeId);
      const selectedNodeId = state.selectedNodeId === action.nodeId ? null : state.selectedNodeId;
      return { ...state, nodes, edges, selectedNodeId };
    }
    case 'SELECT_NODE':
      return { ...state, selectedNodeId: action.nodeId };
    case 'ADD_EDGE':
      return { ...state, edges: addEdge(action.params, state.edges) };
    case 'APPLY_NODE_CHANGES':
      return { ...state, nodes: applyNodeChanges(action.changes, state.nodes) };
    case 'APPLY_EDGE_CHANGES':
      return { ...state, edges: applyEdgeChanges(action.changes, state.edges) };
    case 'SET_VALIDATION_ERRORS':
      return { ...state, validationErrors: action.errors };
    case 'SET_AUTOMATIONS':
      return { ...state, automations: action.automations };
    case 'SET_SIMULATION_RESULT':
      return { ...state, simulationResult: action.result };
    case 'SET_SIMULATING':
      return { ...state, isSimulating: action.value };
    case 'SET_SIMULATION_OPEN':
      return { ...state, simulationOpen: action.value };
    case 'LOAD_GRAPH':
      return { ...state, nodes: action.nodes, edges: action.edges, selectedNodeId: null };
    case 'CLEAR_GRAPH':
      return { ...state, nodes: [], edges: [], selectedNodeId: null, simulationResult: null, validationErrors: {} };
    default:
      return state;
  }
}

let nodeIdCounter = 1;
function genId() {
  return `node_${Date.now()}_${nodeIdCounter++}`;
}

export function FlowProvider({ children }) {
  const [state, dispatch] = useReducer(flowReducer, initialState);

  const addNode = useCallback((type, position) => {
    const id = genId();
    const node = {
      id,
      type,
      position,
      data: { ...getDefaultNodeData(type), errors: [] },
    };
    dispatch({ type: 'ADD_NODE', node });
    dispatch({ type: 'SELECT_NODE', nodeId: id });
    return id;
  }, []);

  const updateNodeData = useCallback((nodeId, data) => {
    dispatch({ type: 'UPDATE_NODE_DATA', nodeId, data });
  }, []);

  const removeNode = useCallback((nodeId) => {
    dispatch({ type: 'REMOVE_NODE', nodeId });
  }, []);

  const selectNode = useCallback((nodeId) => {
    dispatch({ type: 'SELECT_NODE', nodeId });
  }, []);

  const onNodesChange = useCallback((changes) => {
    dispatch({ type: 'APPLY_NODE_CHANGES', changes });
  }, []);

  const onEdgesChange = useCallback((changes) => {
    dispatch({ type: 'APPLY_EDGE_CHANGES', changes });
  }, []);

  const onConnect = useCallback((params) => {
    dispatch({ type: 'ADD_EDGE', params: { ...params, type: 'smoothstep', animated: false, style: { stroke: '#94a3b8', strokeWidth: 2 } } });
  }, []);

  const setValidationErrors = useCallback((errors) => {
    dispatch({ type: 'SET_VALIDATION_ERRORS', errors });
  }, []);

  const setAutomations = useCallback((automations) => {
    dispatch({ type: 'SET_AUTOMATIONS', automations });
  }, []);

  const setSimulationResult = useCallback((result) => {
    dispatch({ type: 'SET_SIMULATION_RESULT', result });
  }, []);

  const setSimulating = useCallback((value) => {
    dispatch({ type: 'SET_SIMULATING', value });
  }, []);

  const setSimulationOpen = useCallback((value) => {
    dispatch({ type: 'SET_SIMULATION_OPEN', value });
  }, []);

  const loadGraph = useCallback((nodes, edges) => {
    dispatch({ type: 'LOAD_GRAPH', nodes, edges });
  }, []);

  const clearGraph = useCallback(() => {
    dispatch({ type: 'CLEAR_GRAPH' });
  }, []);

  const serialize = useCallback(() => {
    return {
      nodes: state.nodes.map(n => ({
        id: n.id,
        type: n.type,
        position: n.position,
        data: n.data,
      })),
      edges: state.edges.map(e => ({
        id: e.id,
        source: e.source,
        target: e.target,
        label: e.label,
      })),
    };
  }, [state.nodes, state.edges]);

  const selectedNode = state.nodes.find(n => n.id === state.selectedNodeId) || null;

  const value = {
    ...state,
    selectedNode,
    addNode,
    updateNodeData,
    removeNode,
    selectNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setValidationErrors,
    setAutomations,
    setSimulationResult,
    setSimulating,
    setSimulationOpen,
    loadGraph,
    clearGraph,
    serialize,
  };

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
}

export function useFlow() {
  const ctx = useContext(FlowContext);
  if (!ctx) throw new Error('useFlow must be used inside FlowProvider');
  return ctx;
}