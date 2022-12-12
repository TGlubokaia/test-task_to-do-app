import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DndTasksList from '../dnd-tasks-list/dnd-tasks-list';
import TaskFormModal from '../task-form-modal/task-form-modal';
import TaskInfoModal from '../task-info-modal/task-info-modal';
import TaskSearchModal from '../task-search-modal/task-search-modal';

function TasksScreen() {
  const params = useParams();
  const projectId = params.id;

  const project = JSON.parse(localStorage.getItem(`${projectId}`));

  const [showTaskInfo, setShowTaskInfo] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskInfo, setTaskInfo] = useState(null);

  const handleModalOpen = (cb) => {
    document.body.style.overflow = 'hidden';
    cb();
  };

  const handleModalClose = (cb) => {
    document.body.style.overflow = 'auto';
    cb();
  };

  const handleTaskInfoOpen = (task) => {
    setTaskInfo(task);
    handleModalOpen(() => setShowTaskInfo(true));
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
        />
      </div>
      <TaskFormModal
        show={showTaskForm}
        onClose={() => handleModalClose(() => setShowTaskForm(false))}
        handleShowTaskInfo={setShowTaskInfo}
        project={project}
        id={projectId}
      />
      <TaskInfoModal
        show={showTaskInfo}
        task={taskInfo}
        onClose={() => handleModalClose(() => setShowTaskInfo(false))}
        id={projectId}
      />
      <TaskSearchModal show={false} />
    </div>
  );
}

export default TasksScreen;
