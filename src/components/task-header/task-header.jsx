function TaskHeader({ handleCloseBtn, id }) {
  return (
    <header className='task-form-modal__header modal-header'>
      <h3 className='task-form-modal__title'>Task #{id}</h3>
      <button className='form__btn btn-close btn' onClick={handleCloseBtn}>
        <svg className='btn-close__svg' height='15' width='15'>
          <use href='/sprite.svg#cross'></use>
        </svg>
      </button>
    </header>
  );
}

export default TaskHeader;
