import { setVisuallyHiddenClass } from '../../utils/const';

function TaskSearchModal({ show }) {
  return (
    <div className={`modal search-modal ${setVisuallyHiddenClass(show)}`}>
      <div className='modal-container'>
        <header className='search-modal__header modal-header'>
          <h3 className='search-modal__title'>Поиск</h3>
        </header>
        <div className='search-modal__content modal-content'></div>
        <footer className='search-modal__footer modal-footer footer'>
          <button>Закрыть</button>
        </footer>
      </div>
    </div>
  );
}

export default TaskSearchModal;
