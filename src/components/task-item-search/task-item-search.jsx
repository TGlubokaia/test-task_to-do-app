function TaskItemSearch({ task, handleShowTaskInfo }) {
  return (
    <article className='search-modal__task'>
      <div className='task__container'>
        <header className='task__header'>
          <span className='task__number'>#{task.id}</span>
          <div className={`task__priority task__priority--${task.priority}`}>
            <span>{task.priority}</span>
          </div>
        </header>
        <div className='task__content'>
          <h3 className='task__title'>
            <a
              href='#'
              className='task__title-link'
              onClick={() => handleShowTaskInfo(task.id)}>
              {task.title}
            </a>
          </h3>
        </div>
      </div>
    </article>
  );
}

export default TaskItemSearch;
