const updateData = (project) => {
  const newProject = JSON.stringify(project);
  localStorage.setItem(`${project.id}`, newProject);
};

const updateTask = (project, task) => {
  project.data.tasks.byId[task.id] = task;
  updateData(project);
};

export { updateData, updateTask };
