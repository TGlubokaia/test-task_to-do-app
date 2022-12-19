function SubtaskItem({ task, onChange }) {
  return (
    <article className='subtask-item'>
      <div>
        <input
          className='subtask-item__done-input done-input visually-hidden'
          type='checkbox'
          id={task.id}
          name='done'
          checked={task.done ? true : false}
          onChange={(event) => onChange(event, task)}
        />
        <label
          className='subtask-item__done-label done-label'
          htmlFor={task.id}></label>
      </div>
      <p className='subtask-item__text'>{task.content}</p>
    </article>
  );
}

export default SubtaskItem;
