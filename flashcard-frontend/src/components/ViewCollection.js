// src/components/ViewCollection.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/viewCollection.css';

const ViewCollection = () => {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/collections/${collectionId}`);
        setCollection(response.data);
        setComments(response.data.comments || []); // Assuming comments are returned as part of the collection data
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch collection details');
        setLoading(false);
      }
    };

    fetchCollection();
  }, [collectionId]);

  const handleCommentSubmit = async () => {
    if (newComment.trim() === '') return;

    try {
      const response = await axios.post(`http://localhost:3000/collections/${collectionId}/comments`, {
        content: newComment,
      });
      // Add the new comment to the existing list
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (err) {
      console.error('Error adding comment', err);
      setError('Failed to add comment');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="view-collection-container">
      <h2>Collection: {collection.name}</h2>
      <div className="flashcard-sets-section">
        <h3>Flashcard Sets</h3>
        <ul>
          {collection.sets && collection.sets.length > 0 ? (
            collection.sets.map((set) => (
              <li key={set.id}>{set.name}</li>
            ))
          ) : (
            <li>No flashcard sets in this collection</li>
          )}
        </ul>
      </div>
      <div className="comments-section">
        <h3>Comments</h3>
        <ul>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <li key={comment.id}>{comment.content}</li>
            ))
          ) : (
            <li>No comments available</li>
          )}
        </ul>
        <div className="add-comment-section">
          <textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button onClick={handleCommentSubmit}>Submit Comment</button>
        </div>
      </div>
    </div>
  );
};

export default ViewCollection;
