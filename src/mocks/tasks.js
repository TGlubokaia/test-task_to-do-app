const tasks = {
  tasks: {
    byId: {
      1: {
        id: '1',
        title:
          'Сходить на тренировку Сходить на трениро тренировку Сходить на трениро',
        description: 'Task',
        status: 'queue',
        priority: 'low',
        date: '2022-12-20T12:44:47+03:00',
        dueDate: '',
        files: [],
        subtasks: [{ id: 984632, content: '2345', done: false }],
        comments: ['11', '12', '13'],
      },
      2: {
        id: '2',
        title: 'Купить билеты',
        description: 'Task',
        status: 'development',
        priority: 'medium',
        date: '2022-12-19T07:00:47+03:00',
        dueDate: '',
        files: [],
        subtasks: [],
        comments: [],
      },
      3: {
        id: '3',
        title: 'Нарядить елку',
        description: 'Task',
        status: 'done',
        priority: 'high',
        date: '2022-12-20T10:41:47+03:00',
        dueDate: '2022-12-28T20:00:00+03:00',
        files: [1, 2, 3],
        subtasks: [],
        comments: [],
      },
    },
    allIds: ['1', '2', '3'],
  },
  0: {
    byId: {
      11: {
        id: '11',
        text: 'Надо сделать',
        replies: ['21'],
        category: 0,
        level: 1,
      },
      12: {
        id: '12',
        text: 'Не хватает пункта',
        replies: [],
        category: 0,
        level: 1,
      },
      13: {
        id: '13',
        text: 'Не хватает пункта',
        replies: [],
        category: 0,
        level: 1,
      },
    },
    allIds: ['11', '12', '13'],
  },
  1: {
    byId: {
      21: {
        id: '21',
        text: 'Надо сделать',
        replies: [],
        category: 1,
        level: 2,
      },
    },
    allIds: ['21'],
  },
};

const projects = {
  '01': {
    id: '01',
    title: 'Project 1',
    data: tasks,
  },
};

const initialColumns = {
  queue: {
    name: 'queue',
    items: [],
  },
  development: {
    name: 'development',
    items: [],
  },
  done: {
    name: 'done',
    items: [],
  },
};

export { initialColumns, projects };
