import { setVisuallyHiddenClass } from '../../utils/const';

function CommentInput({ show, addComment, commentInput, handleInput }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    handleInput({ ...commentInput, [event.target.name]: value });
  };

  const handleSubmit = () => {
    if (!commentInput.text.length) {
      return;
    }
    addComment(commentInput);
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
