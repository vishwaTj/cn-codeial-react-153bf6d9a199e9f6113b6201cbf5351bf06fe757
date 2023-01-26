import PropTypes from 'prop-types';
import { useState,useEffect } from 'react';

import { Comment,Loader } from '../components';
import { getPosts } from '../api';
import styles from '../styles/home.module.css';

// here we are sending posts as an array type prop
const Home = ({}) => {
  const [posts,setPosts] = useState([]);
  const [loading,setLoading] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();

      if (response.success) {
        setPosts(response.data.posts);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  console.log(posts);
  return (
    <div className={styles.postsList}>
      {posts.map((post) => (
        <div className={styles.postWrapper} key={`post-${post._id}`}>
          <div className={styles.postHeader}>
            <div className={styles.postAvatar}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="user-pic"
              />
              <div>
                <span className={styles.postAuthor}>{post.user.name}</span>
                <span className={styles.postTime}>a minute ago</span>
              </div>
            </div>
            <div className={styles.postContent}>{post.conent}</div>

            <div className={styles.postActions}>
              <div className={styles.postLike}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/126/126473.png"
                  alt="likes-icon"
                />
                <span>5</span>
              </div>

              <div className={styles.postCommentsIcon}>
                <img
                  src="https://www.flaticon.com/free-icon/comment_3193015?term=comments&page=1&position=10&origin=search&related_id=3193015"
                  alt="comments-icon"
                />
                <span>{post.comments.length}</span>
              </div>
            </div>
            <div className={styles.postCommentBox}>
              <input placeholder="Start typing a comment" />
            </div>

            {/* sending each comment as comment from comment list as a prop to comment section  */}
            <div className={styles.postCommentsList}>
              {post.comments.map((comment) => (
                <Comment comment={comment} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// here proptypes is a package which makes sure that the correct type of prop gets dilievered
//other examples are Typescript and flow package
Home.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Home;
