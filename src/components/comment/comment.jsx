function Comment({ comment }) {
  return (
    <section className='comment'>
      <article className='comment__item'>
        <p className='comment__text'>{comment.text}</p>
        <button className='comment__btn btn' type='button'>
          reply
        </button>
      </article>
      <div className='comment__container'>
        {!!comment.replies.length &&
          comment.replies.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
      </div>
    </section>
  );
}

export default Comment;
