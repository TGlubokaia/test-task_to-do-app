const ActionType = {
  LOAD_PROJECTS: 'projects/loadProjects',
  ADD_PROJECT_ID: 'project/addProjectId',
  ADD_COMMENT: 'comment/addComment',
  ADD_TASK: 'task/addTask',
  TOGGLE_SUBTASK: 'subtask/toggleSubtask',
};

const ActionCreator = {
  loadProjects: (projects) => ({
    type: ActionType.LOAD_PROJECTS,
    payload: projects,
  }),
  addComment: (comment, projectId, taskId, root) => ({
    type: ActionType.ADD_COMMENT,
    payload: [comment, projectId, taskId, root],
  }),
  addTask: (projectId, task) => ({
    type: ActionType.ADD_TASK,
    payload: [projectId, task],
  }),
  addProjectId: (id) => ({
    type: ActionType.ADD_PROJECT_ID,
    payload: id,
  }),
  toggleSubtask: (subtask, projectId, taskId) => ({
    type: ActionType.TOGGLE_SUBTASK,
    payload: [subtask, projectId, taskId],
  }),
};

export { ActionType, ActionCreator };
