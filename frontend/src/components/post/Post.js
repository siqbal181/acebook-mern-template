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
      <article className="post-form" data-cy="post" key={post._id}>
        <p className="post-message">{post.message}</p>
        <div className="image-box">
            <img data-cy="img" src={post.imageUrl} width="100%" height="100%"/>
        </div>
        <p className="post-show_author">Posted by: {post.author}</p>
        <Like postId={post._id} liked={post.likedBy} author={post.author}/>
          <div className="post-comments-container">
            <CreateCommentForm postId={post._id} onCreated={handleCommentCreated} />
          <div className="post-comments">
            {post.comments.map((comment) => (
              <p class="comment"> {comment}</p>
            ))}

          </div>
        </div>
      </article>
    );
  }
  return null;
};

export default Post;
