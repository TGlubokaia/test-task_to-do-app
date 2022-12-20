import { setVisuallyHiddenClass, getUniqueId } from '../../utils/const';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectId, getEntity } from '../../store/selectors';
import { ActionCreator } from '../../store/action';

function CommentInput({
  show,
  handleInput,
  commentInput,
  handleClose,
  category,
  root,
  taskId,
  handleUpdate,
}) {
  const stateProjectId = useSelector(getProjectId);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const value = event.target.value;
    handleInput({ ...commentInput, [event.target.name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!commentInput.text.length) {
      return;
    }
    const id = getUniqueId();
    const reply = {
      ...commentInput,
      id: id,
      category: category,
      level: category + 1,
    };
    dispatch(ActionCreator.addComment([reply, stateProjectId, taskId, root]));
    handleUpdate();
    handleClose();
  };

  return (
    <div className={`comment-form ${setVisuallyHiddenClass(show)}`}>
      <input
        className='comment-form__text-input form-group__input'
        placeholder='Add comment'
        type='text'
        id='text'
        name='text'
        maxLength='40'
        onChange={handleInputChange}
        onBlur={commentInput.text ? () => {} : handleClose}
        value={commentInput.text}
      />

      <button
        className='comment-form__btn btn'
        type='button'
        onClick={handleSubmit}
        disabled={!commentInput.text.length ? true : false}>
        add
      </button>
    </div>
  );
}
export default CommentInput;
