import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../store/selectors';
import { ActionCreator } from '../../store/action';
import DndTasksList from '../dnd-tasks-list/dnd-tasks-list';
import TaskFormModal from '../task-form-modal/task-form-modal';
import TaskInfoModal from '../task-info-modal/task-info-modal';
import TaskSearchModal from '../task-search-modal/task-search-modal';
import { getUniqueId } from '../../utils/const';

const handleModalOpen = (cb) => {
  document.body.style.overflow = 'hidden';
  cb();
};

const handleModalClose = (cb) => {
  document.body.style.overflow = 'auto';
  cb();
};

function TasksScreen() {
  const params = useParams();
  const projectId = params.id;

  const stateProjects = useSelector(getProjects);
  const dispatch = useDispatch();

  const project = { ...stateProjects[projectId] };
  const tasks = project.data.tasks;
  const taskId = getUniqueId();

  const [showTaskInfo, setShowTaskInfo] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [currentTaskId, setTaskId] = useState(null);
  const [isLoading, setLoading] = useState(false);

  if (!isLoading) {
    dispatch(ActionCreator.addProjectId(projectId));
    setLoading(true);
  }

  const handleTaskInfoOpen = (id) => {
    setTaskId(id);
    handleModalOpen(() => setShowTaskInfo(true));
  };

  const handleShowTaskForm = () => {
    setShowTaskInfo(false);
    setShowTaskForm(true);
  };

  return (
    <div className='project screen'>
      <div className='container'>
        <h1 className='project__title'>{project.title}</h1>
        <nav className='nav'>
          <Link to='/' className='nav__btn btn'>
            <svg className='btn-close__svg' height='15' width='15'>
              <use href='/sprite.svg#home'></use>
            </svg>
          </Link>
          <button
            className='nav__btn btn'
            onClick={() => handleModalOpen(() => setShowTaskForm(true))}>
            <svg className='btn-close__svg' height='15' width='15'>
              <use href='/sprite.svg#plus'></use>
            </svg>
          </button>
        </nav>

        <DndTasksList
          project={project}
          handleShowTaskInfo={handleTaskInfoOpen}
          tasks={tasks}
        />
      </div>
      <TaskFormModal
        show={showTaskForm}
        onClose={() => handleModalClose(() => setShowTaskForm(false))}
        taskId={taskId}
      />
      <TaskInfoModal
        show={showTaskInfo}
        taskId={currentTaskId}
        handleShowTaskForm={handleShowTaskForm}
        onClose={() => handleModalClose(() => setShowTaskInfo(false))}
        projectId={projectId}
      />
      <TaskSearchModal show={false} />
    </div>
  );
}

export default TasksScreen;
