import { useParams, Link } from 'react-router-dom';
import DndTasksList from '../dnd-tasks-list/dnd-tasks-list';

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
    </div>
  );
}

export default TasksScreen;
