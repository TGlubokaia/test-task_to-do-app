import { setVisuallyHiddenClass } from '../../utils/const';

function TaskInfoModal({ show }) {
  return (
    <div className={`modal task-info-modal ${setVisuallyHiddenClass(show)}`}>
      <div className='modal-container'>
        <header className='task-info-modal__header modal-header'>
          <h3 className='task-info-modal__title'>Поиск</h3>
        </header>
        <div className='task-info-modal__content modal-content'></div>
        <footer className='task-info-modal__footer modal-footer footer'>
          <button>Закрыть</button>
        </footer>
      </div>
    </div>
  );
}

export default TaskInfoModal;
