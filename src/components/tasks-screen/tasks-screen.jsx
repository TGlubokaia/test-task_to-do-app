import { Link } from 'react-router-dom';

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
        <div className='tasks-list-container'>Список</div>
      </div>
    </div>
  );
}

export default TasksScreen;
