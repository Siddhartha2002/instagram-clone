import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import db from "./firebase";
import firebase from "firebase";
import "./Post.css";

function Post({ postId, user, username, imageUrl, caption }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="Siddhartha Shukla"
          src="https://lh3.googleusercontent.com/-h9zdoCd7eXE/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnPNcvUu-ZnQ5k7UVidDNdl3Jd6RA/photo.jpg?sz=46"
        />
        <h3>{username}</h3>
      </div>

      <img className="post__image" src={imageUrl} alt="" />

      <h4 className="post__text">
        <strong>{username}</strong> {caption}
      </h4>

      <div className="post__comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>

      {user && (
        <form className="post__commentBox">
          <input
            className="post__input"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
          />
          <button
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
