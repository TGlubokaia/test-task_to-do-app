import { ActionType } from './action';

const initialState = {
  projects: {},
  projectId: null,
};

const getProjects = (currentProjects, state = initialState) => {
  console.log(Object.keys(currentProjects));
  console.log(state);
  state = { ...state, projects: currentProjects };
  for (let key of Object.keys(currentProjects)) {
    state = { ...state, [key]: currentProjects[key] };
    for (let entity of Object.keys(currentProjects[key].data)) {
      state = {
        ...state,
        ['entity' + key]: {
          ...state['entity' + key],
          [entity]: currentProjects[key].data[entity],
        },
      };
    }
    return state;
  }
};

const addComment = (state, payload) => {
  const [comment, projectId, taskId, root] = payload;
  const entity = 'entity' + projectId;
  const category = comment.category;

  state = { ...state };
  if (state[entity][category] === undefined) {
    state = {
      ...state,
      [entity]: {
        ...state[entity],
        [category]: { byId: {}, allIds: [] },
      },
    };
  }

  state = {
    ...state,
    [entity]: {
      ...state[entity],
      [category]: {
        ...state[entity][category],
        byId: {
          ...state[entity][category].byId,
          [comment.id]: comment,
        },
        allIds: [...state[entity][category].allIds, comment.id],
      },
    },
  };

  if (comment.category === 0) {
    return (state = {
      ...state,
      [entity]: {
        ...state[entity],
        tasks: {
          ...state[entity].tasks,
          byId: {
            ...state[entity].tasks.byId,
            [taskId]: {
              ...state[entity].tasks.byId[taskId],
              comments: [
                ...state[entity].tasks.byId[taskId].comments,
                comment.id,
              ],
            },
          },
        },
      },
    });
  } else {
    const rootCategory = root.category;
    return (state = {
      ...state,
      [entity]: {
        ...state[entity],
        [rootCategory]: {
          ...state[entity][rootCategory],
          byId: {
            ...state[entity][rootCategory].byId,
            [root.id]: {
              ...state[entity][rootCategory].byId[root.id],
              replies: [
                ...state[entity][rootCategory].byId[root.id].replies,
                comment.id,
              ],
            },
          },
        },
      },
    });
  }
};

const toggleSubtask = (state, payload) => {
  const [subtask, projectId, taskId] = payload;
  const entity = 'entity' + projectId;

  state = { ...state };
  return (state = {
    ...state,
    [entity]: {
      ...state[entity],
      tasks: {
        ...state[entity].tasks,
        byId: {
          ...state[entity].tasks.byId,
          [taskId]: {
            ...state[entity].tasks.byId[taskId],
            subtasks: state[entity].tasks.byId[taskId].subtasks.map((task) => {
              if (task.id === subtask.id) {
                return subtask;
              } else {
                return task;
              }
            }),
          },
        },
      },
    },
  });
};

const addTask = (state, payload) => {
  const [projectId, task] = payload;
  const entity = 'entity' + projectId;

  return (state = {
    ...state,
    [entity]: {
      ...state[entity],
      tasks: {
        ...state[entity].tasks,
        byId: {
          ...state[entity].tasks.byId,
          [task.id]: task,
        },
        allIds: [...state[entity].tasks.allIds, task.id],
      },
    },
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_PROJECTS:
      return getProjects(action.payload, state);
    case ActionType.ADD_COMMENT:
      return addComment(state, ...action.payload);
    case ActionType.ADD_PROJECT_ID:
      return { ...state, projectId: action.payload };
    case ActionType.TOGGLE_SUBTASK:
      return toggleSubtask(state, ...action.payload);
    case ActionType.ADD_TASK:
      return addTask(state, ...action.payload);
    default:
      return state;
  }
};

export { reducer };
