import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getProjectId, getEntity, getProjects } from '../../store/selectors';
import { updateData } from '../../services/api';
import Comment from '../comment/comment';
import CommentInput from '../comment-input/comment-input';
import { commentData } from '../../utils/const';

function CommentsList({ taskId }) {
  const stateProjectId = useSelector(getProjectId);
  const stateProjects = useSelector(getProjects);
  const stateEntity = useSelector((state) => getEntity(state, stateProjectId));
  const task = stateEntity.tasks.byId[taskId];
  const comments = stateEntity[0];

  const [commentInput, setCommentInput] = useState(commentData);

  const handleUpdate = () => {
    const newProject = { ...stateProjects[stateProjectId] };
    newProject.data = stateEntity;

    console.log('CommentsList handleUpdate stateEntity');
    console.log(stateEntity);

    updateData(newProject);
  };

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
        handleUpdate={handleUpdate}
      />
      {!!task.comments.length && (
        <div className='info-field__info info-field__comments'>
          {task.comments.map((id) => (
            <Comment
              comment={comments.byId[id]}
              key={id}
              taskId={taskId}
              handleUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </React.Fragment>
  );
}

export default CommentsList;
