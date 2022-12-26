import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const AppRoute = {
  ROOT: '/',
  PROJECT: '/project/:id',
};

const commentData = {
  id: null,
  text: '',
  replies: [],
  level: null,
  category: null,
};

const initialSubtaskState = {
  id: '',
  content: '',
  done: false,
};

const getInitialTaskData = (taskId) => ({
  id: taskId,
  title: '',
  description: '',
  priority: 'low',
  status: 'queue',
  dueDate: '',
  files: [],
  date: '',
  subtasks: [],
  comments: [],
});

const getDate = (format, date) => {
  switch (format) {
    case 'item':
      return dayjs(date).format('DD MMM HH:mm');
    case 'info':
      return dayjs(date).format('DD MMM YYYY HH:mm');
    case 'form':
      return dayjs(date).format('YYYY-MM-DDTHH:mm');
    default:
      return '';
  }
};

const getDuration = (date) => {
  dayjs.extend(relativeTime);
  const duration = dayjs(date).fromNow(true);
  return duration;
};

const getShortTitle = function (title) {
  if (title.length > 45) {
    title = title.substring(0, 45) + `...`;
    return title;
  }
  return title;
};

const setVisuallyHiddenClass = (show) => {
  if (!show) {
    return 'visually-hidden';
  }
  return '';
};

const getUniqueId = () => {
  const number = new Date().getTime();
  return number.toString().slice();
};

const getNumberOfComments = (comments) => {
  let sum = 0;
  if (comments.length) {
    sum += comments.length;
    for (let comment of comments) {
      sum += getNumberOfComments(comment.replies);
    }
  }
  return sum;
};

export {
  AppRoute,
  commentData,
  initialSubtaskState,
  getDate,
  getDuration,
  getShortTitle,
  setVisuallyHiddenClass,
  getUniqueId,
  getNumberOfComments,
  getInitialTaskData,
};
