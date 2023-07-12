import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getProjects } from '../../store/selectors';
import ProjectContext from '../../utils/context';
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
  const project = { ...stateProjects[projectId] };

  const taskId = getUniqueId();

  const [showTaskInfo, setShowTaskInfo] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [currentTaskId, setTaskId] = useState(null);
  const [isLoading, setLoading] = useState(false);

  if (!isLoading) {
    setLoading(true);
  }

  const handleTaskInfoOpen = (id) => {
    setTaskId(id);
    handleModalOpen(() => setShowTaskInfo(true));
    if (showSearch) {
      setShowSearch(false);
    }
  };

  const handleTaskInfoClose = () => {
    handleModalClose(() => setShowTaskInfo(false));
    setTaskId(null);
  };

  const handleTaskFormClose = () => {
    handleModalClose(() => setShowTaskForm(false));
    setTaskId(null);
  };

  const handleShowTaskForm = () => {
    setShowTaskInfo(false);
    setShowTaskForm(true);
  };

  return (
    <div className='project screen'>
      <ProjectContext.Provider value={project.data}>
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
            <button
              className='nav__btn btn'
              onClick={() => handleModalOpen(() => setShowSearch(true))}>
              <svg className='btn-close__svg' height='15' width='15'>
                <use href='/sprite.svg#search'></use>
              </svg>
            </button>
          </nav>

          <DndTasksList
            handleShowTaskInfo={handleTaskInfoOpen}
          />
        </div>
        <TaskFormModal
          show={showTaskForm}
          onClose={handleTaskFormClose}
          currentTaskId={currentTaskId}
          newId={taskId}
        />
        <TaskInfoModal
          show={showTaskInfo}
          taskId={currentTaskId}
          handleShowTaskForm={handleShowTaskForm}
          onClose={handleTaskInfoClose}
          projectId={projectId}
        />
        <TaskSearchModal
          show={showSearch}
          onClose={() => handleModalOpen(() => setShowSearch(false))}
          handleShowTaskInfo={handleTaskInfoOpen}
        />
      </ProjectContext.Provider>
    </div>
  );
}

export default TasksScreen;
