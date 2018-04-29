import axios from 'axios';

const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
const API_KEY = '?key=teddy_ni';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  // UPDATE_POST: 'UPDATE_POST',
  // CREATE_POST: 'CREATE_POST',
  // DELETE_POST: 'DELETE_POST',
};

export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POSTS, payload: { data: response.data } });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function createPost(post, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts${API_KEY}`, post).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POSTS, payload: { data: response.data } });
      history.push('/');
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function updatePost(post) { /* axios put */ }

export function fetchPost(id) { /* axios get */ }

export function deletePost(id, history) { /* axios delete */ }

export function FETCH_POSTS() {

}