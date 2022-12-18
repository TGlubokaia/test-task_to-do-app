const ActionType = {
  LOAD_PROJECTS: 'projects/loadProjects',
  ADD_PROJECT_ID: 'project/addProjectId',
  ADD_COMMENT: 'comment/addComment',
  ADD_TASK: 'task/addTask',
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
  addTask: (task) => ({
    type: ActionType.ADD_TASK,
    payload: task,
  }),
  addProjectId: (id) => ({
    type: ActionType.ADD_PROJECT_ID,
    payload: id,
  }),
};

export { ActionType, ActionCreator };
