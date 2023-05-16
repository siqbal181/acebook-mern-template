import React from "react";
import Like from '../like/Like';
import './Post.css'; // import the CSS file
import CreateCommentForm from "../commentForm/CommentForm";

const Post = ({ post, onCreated }) => {
  console.log(post)
  const handleCommentCreated = () => {
    onCreated();
  };

  if (post.message !== "" || post.imageUrl !== "") { // Quickfix to remove empty submits
    return (

      <article data-cy="post" className="post" key={post._id}>
        <p className="message">{post.message}</p>
        <div className="image-box">
            <img data-cy="img" src={post.imageUrl} width="100%" height="100%"/>
        </div>
        <Like postId={post._id} likesCount={post.likeCount}/>
        <div className="comments-container">
            <CreateCommentForm postId={post._id} onCreated={handleCommentCreated} />
          <div className="comments">
            {post.comments.map((comment) => (
              <p>{comment}</p>
              ))}
          </div>
        </div>
          <p class="show_author">Posted by: {post.author}</p>
      </article>
    );
  }
  return null;
};

export default Post;
