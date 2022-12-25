const updateData = (project) => {
  const newProject = JSON.stringify(project);
  localStorage.setItem(`${project.id}`, newProject);
};

const addTask = (project, task) => {
  project.data.tasks.byId[task.id] = task;
  project.data.tasks.allIds.push(task.id);
  updateData(project);
};

const getProject = (id) => {
  const project = JSON.parse(localStorage.getItem(`${id}`));
  return project;
};

export { updateData, addTask, getProject };
