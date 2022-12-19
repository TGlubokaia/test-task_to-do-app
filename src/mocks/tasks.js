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
        date: '',
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
        date: '',
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
        date: '',
        dueDate: '1',
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
        replies: ['22'],
        category: 0,
        level: 1,
      },
      13: {
        id: '13',
        text: 'Не хватает пункта',
        replies: ['23'],
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
        replies: ['31'],
        category: 1,
        level: 2,
      },
      22: {
        id: '22',
        text: 'Надо сделать',
        replies: [],
        category: 1,
        level: 2,
      },
      23: {
        id: '23',
        text: 'Надо сделать',
        replies: [],
        category: 1,
        level: 2,
      },
    },
    allIds: ['21', '22', '23'],
  },
  2: {
    byId: {
      31: {
        id: '31',
        text: 'Надо сделать',
        replies: [],
        category: 2,
        level: 3,
      },
    },
    allIds: ['31'],
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
