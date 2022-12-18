import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getProjects } from '../../store/selectors';

function ProjectsScreen() {
  const stateProjects = useSelector(getProjects);
  const projectsList = Object.keys(stateProjects).map(
    (key) => stateProjects[key]
  );

  return (
    <div className='project screen'>
      <div className='container'>
        <h1 className='project__title'>Проекты</h1>
        <button>создать</button>
        <ul>
          {projectsList.map((project) => (
            <Link to={`/project/${project.id}`} key={project.id}>
              <li>Заголовок</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProjectsScreen;
