function DndTaskItem({ item }) {
  return (
    <div className='dnd__task'>
      <div className='task__container'>
        <header className='task__header'>
          <span className='task__number'>#{item.id}</span>
          <div className='task__priority task__priority--low'>
            <span>{item.priority}</span>
          </div>
        </header>
        <div className='task__content'>
          <h3 className='task__title'>
            <a href='#' className='task__title-link'>
              {item.title}
            </a>
          </h3>
        </div>
        <footer className='task__footer'>
          <div className='footer__content footer__content-main'>
            {!!item.files.length && (
              <div className='footer__icon'>
                <span>{item.files.length}</span>
              </div>
            )}
            {!!item.subtasks.length && (
              <div className='footer__icon'>
                <span>0/{item.subtasks.length}</span>
              </div>
            )}
            {!!item.comments.length && (
              <div className='footer__icon'>
                <span>{item.comments.length}</span>
              </div>
            )}
          </div>
          <div className='footer__content footer__content-end'>
            {!!item.dueDate && (
              <div className='footer__icon'>
                <span>&nbsp;{item.dueDate}</span>
              </div>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}

export default DndTaskItem;
