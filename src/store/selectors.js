const getProjectId = (state) => state.projectId;

const getProjects = (state) => state.projects;

const getEntity = (state, id) => state['entity' + id];

export { getProjectId, getProjects, getEntity };
