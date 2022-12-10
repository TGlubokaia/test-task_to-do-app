import { Link } from 'react-router-dom';
import DndTasksList from '../dnd-tasks-list/dnd-tasks-list';

function TasksScreen() {
  return (
    <div className='project screen'>
      <div className='container'>
        <h1 className='project__title'>Заголовок</h1>
        <nav className='nav'>
          <Link to='/' className='nav__btn btn'>
            Домой
          </Link>
          <button className='nav__btn btn'>Закрыть</button>
        </nav>
        <DndTasksList />
      </div>
    </div>
  );
}

export default TasksScreen;
