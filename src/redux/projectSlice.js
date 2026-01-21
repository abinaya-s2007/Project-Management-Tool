import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    list: [],
  },
  reducers: {
    addProject: (state, action) => {
      state.list.push({
        ...action.payload,
        tasks: [], 
      });
    },

    deleteProject: (state, action) => {
      state.list = state.list.filter(
        project => project.id !== action.payload
      );
    },

    updateProject: (state, action) => {
      const { id, name, team } = action.payload;
      const project = state.list.find(p => p.id === id);
      if (project) {
        project.name = name;
        project.team = team;
      }
    },

    addTask: (state, action) => {
      const { projectId, task } = action.payload;
      const project = state.list.find(p => p.id === projectId);
      if (project) {
        project.tasks.push(task);
      }
    },

    toggleTask: (state, action) => {
      const { projectId, taskId } = action.payload;
      const project = state.list.find(p => p.id === projectId);
      if (project) {
        const task = project.tasks.find(t => t.id === taskId);
        if (task) task.done = !task.done;
      }
    },

    deleteTask: (state, action) => {
      const { projectId, taskId } = action.payload;
      const project = state.list.find(p => p.id === projectId);
      if (project) {
        project.tasks = project.tasks.filter(t => t.id !== taskId);
      }
    },
    addTask: (state, action) => {
  const { projectId, task } = action.payload;
  const project = state.list.find(p => p.id === projectId);
  if (project) {
    project.tasks.push({
      ...task,
      done: false,
      subtasks: [],
    });
  }
},
updateTaskProgress: (state, action) => {
  const { projectId, taskId, subtasks } = action.payload;
  const project = state.list.find(p => p.id === projectId);
  if (project) {
    const task = project.tasks.find(t => t.id === taskId);
    if (task) {
      task.subtasks = subtasks;
    }
  }
},
addSubtask: (state, action) => {
  const { projectId, taskId, subtask } = action.payload;

  const project = state.list.find(p => p.id === projectId);
  if (!project) return;

  const task = project.tasks.find(t => t.id === taskId);
  if (!task) return;

  task.subtasks.push(subtask);
},

toggleSubtask: (state, action) => {
  const { projectId, taskId, subtaskId } = action.payload;

  const project = state.list.find(p => p.id === projectId);
  if (!project) return;

  const task = project.tasks.find(t => t.id === taskId);
  if (!task) return;

  const subtask = task.subtasks.find(s => s.id === subtaskId);
  if (subtask) {
    subtask.done = !subtask.done;
  }
},


  },
});

export const {
  addProject,
  deleteProject,
  updateProject,
  addTask,
  toggleTask,
  deleteTask,
  addSubtask,
  toggleSubtask,
} = projectSlice.actions;


export default projectSlice.reducer;