import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getProjectId, getEntity } from '../../store/selectors';
import Comment from '../comment/comment';
import CommentInput from '../comment-input/comment-input';
import { commentData } from '../../utils/const';

function CommentsList({ taskId }) {
  const stateProjectId = useSelector(getProjectId);
  const stateEntity = useSelector((state) => getEntity(state, stateProjectId));
  const task = stateEntity.tasks.byId[taskId];
  const comments = stateEntity[0];

  const [commentInput, setCommentInput] = useState(commentData);

  const handleClose = () => {
    setCommentInput(commentData);
  };

  return (
    <React.Fragment>
      <CommentInput
        show={true}
        handleInput={setCommentInput}
        commentInput={commentInput}
        handleClose={handleClose}
        category={0}
        root={null}
        taskId={taskId}
      />
      {!!task.comments.length && (
        <div className='info-field__info info-field__comments'>
          {task.comments.map((id) => (
            <Comment comment={comments.byId[id]} key={id} taskId={taskId} />
          ))}
        </div>
      )}
    </React.Fragment>
  );
}

export default CommentsList;
