import { ActionCreator } from './action';

const fetchProjects = () => (dispatch, _getState) => {
  let keys = Object.keys(localStorage);
  let data = {};
  for (let key of keys) {
    data[key] = JSON.parse(localStorage.getItem(key));
  }
  dispatch(ActionCreator.loadProjects(data));
};

export { fetchProjects };
