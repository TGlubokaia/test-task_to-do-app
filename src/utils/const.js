import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

const AppRoute = {
  ROOT: '/',
  PROJECT: '/project/:id',
};

const getDate = (fulldate, date) => {
  if (!date) {
    return;
  }
  if (fulldate) {
    return dayjs(date).format('DD MMM YYYY HH:mm')
  }
  return dayjs(date).format('DD MMM HH:mm')
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
  } return title;
};


export { AppRoute, getDate, getDuration, getShortTitle};
