import { useParams, Link } from 'react-router-dom';
import DndTasksList from '../dnd-tasks-list/dnd-tasks-list';
import TaskFormModal from '../task-form-modal/task-form-modal';
import TaskInfoModal from '../task-info-modal/task-info-modal';
import TaskSearchModal from '../task-search-modal/task-search-modal';

function TasksScreen() {
  const params = useParams();
  const projectId = params.id;

  const project = JSON.parse(localStorage.getItem(`${projectId}`));

  return (
    <div className='project screen'>
      <div className='container'>
        <h1 className='project__title'>{project.title}</h1>
        <nav className='nav'>
          <Link to='/' className='nav__btn btn'>
            Домой
          </Link>
          <button className='nav__btn btn'>Создать</button>
        </nav>

        <DndTasksList project={project} />
      </div>
      <TaskFormModal show={false} />
      <TaskInfoModal show={false} />
      <TaskSearchModal show={false} />
    </div>
  );
}

export default TasksScreen;
