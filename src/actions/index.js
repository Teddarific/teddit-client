import axios from 'axios';

const ROOT_URL = 'http://ted-dit.herokuapp.com/api';
const API_KEY = '?key=teddy_ni';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  // UPDATE_POST: 'UPDATE_POST',
  // CREATE_POST: 'CREATE_POST',
  // DELETE_POST: 'DELETE_POST',
};

export function fetchPosts(sortMethod) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}&sortMethod=${sortMethod}`, { sortMethod }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POSTS, payload: { data: response.data } });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POST, payload: { data: response.data } });
    }).catch((error) => {
      console.log(error);
    });
  };
}


export function createPost(post, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts${API_KEY}`, post).then((response) => {
      history.push('/');
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function updatePost(id, fields) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}${API_KEY}`, fields).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POST, payload: { data: response.data } });
    }).catch((error) => {
      console.log(error);
    });
  };
}


export function deletePost(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`).then((response) => {
      history.push('/');
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function votePost(id, voteField, sortMethod, posts = true) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/vote/${id}${API_KEY}`, voteField).then((response) => {
      if (posts) {
        fetchPosts(sortMethod)(dispatch);
      } else {
        fetchPost(id)(dispatch);
      }
    }).catch((error) => {
      console.log(error);
    });
  };
}
