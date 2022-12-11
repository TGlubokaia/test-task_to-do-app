import { setVisuallyHiddenClass } from '../../utils/const';

function TaskFormModal({ show }) {
  return (
    <div className={`modal task-form-modal ${setVisuallyHiddenClass(show)}`}>
      <div className='modal-container'>
        <header className='task-form-modal__header modal-header'>
          <h3 className='task-form-modal__title'>Поиск</h3>
        </header>
        <div className='task-form-modal__content modal-content'></div>
        <footer className='task-form-modal__footer modal-footer footer'>
          <button>Закрыть</button>
        </footer>
      </div>
    </div>
  );
}

export default TaskFormModal;
