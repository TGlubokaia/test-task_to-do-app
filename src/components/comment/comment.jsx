import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getProjectId, getEntity } from '../../store/selectors';
import CommentInput from '../comment-input/comment-input';
import { commentData } from '../../utils/const';

function Comment({ comment, taskId, handleUpdate }) {
  const stateProjectId = useSelector(getProjectId);
  const stateEntity = useSelector((state) => getEntity(state, stateProjectId));

  const [showInput, setShowInput] = useState(false);
  const [commentInput, setInput] = useState(commentData);

  const handleClose = () => {
    setInput(commentData);
    setShowInput(false);
  };

  return (
    <section className='comment'>
      <article className='comment__item'>
        <p className='comment__text'>{comment.text}</p>
        <button
          className='comment__btn btn'
          type='button'
          onClick={() => setShowInput(true)}>
          reply
        </button>
      </article>
      <CommentInput
        show={showInput}
        handleInput={setInput}
        commentInput={commentInput}
        handleClose={handleClose}
        category={comment.level}
        root={comment}
        taskId={taskId}
        handleUpdate={handleUpdate}
      />
      <div className='comment__container'>
        {!!comment.replies.length &&
          comment.replies.map((id) => (
            <Comment
              comment={stateEntity[comment.level].byId[id]}
              taskId={taskId}
              key={id}
              handleUpdate={handleUpdate}
            />
          ))}
      </div>
    </section>
  );
}

export default Comment;
