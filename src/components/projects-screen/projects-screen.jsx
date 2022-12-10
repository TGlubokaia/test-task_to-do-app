import { Link } from 'react-router-dom';

function ProjectsScreen() {
  return (
    <div className='project screen'>
      <div className='container'>
        <h1 className='project__title'>Проекты</h1>
        <button>создать</button>
        <ul>
          <Link to={`/project/1`}>
            <li>Заголовок</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default ProjectsScreen;
