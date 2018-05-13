import axios from 'axios';
import { toast } from 'react-toastify';
// const ROOT_URL = 'http://ted-dit.herokuapp.com/api';
const ROOT_URL = 'http://localhost:9090/api';

const API_KEY = '?key=teddy_ni';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  // UPDATE_POST: 'UPDATE_POST',
  // CREATE_POST: 'CREATE_POST',
  // DELETE_POST: 'DELETE_POST',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  VALIDATE_USERNAME: 'VALIDATE_USERNAME',
  VALIDATE_EMAIL: 'VALIDATE_EMAIL',
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
    axios.post(`${ROOT_URL}/posts${API_KEY}`, post, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        history.push('/');
      }).catch((error) => {
        console.log(error);
      });
  };
}

export function updatePost(id, fields) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}${API_KEY}`, fields, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POST, payload: { data: response.data } });
      }).catch((error) => {
        console.log(error);
      });
  };
}

export function deletePost(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`, {}, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
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

// deletes token from localstorage
// and deauths
export function signOutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    toast.success('Successfully signed out');
    history.push('/');
  };
}

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function signInUser({ username, password }, history) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signin endpoint
  // on success does:
  //  dispatch({ type: ActionTypes.AUTH_USER });
  //  localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign In Failed: ${error.response.data}`));

  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { username, password }).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER, payload: { username: response.data.username } });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      toast.success(`Logged in as ${response.data.username}`);

      history.push('/');
    }).catch((error) => {
      toast.error('Incorrect username or password');
    });
  };
}

export function signUpUser(user, history) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signup endpoint (only difference from above)
  // on success does:
  //  dispatch({ type: ActionTypes.AUTH_USER });
  //  localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign Up Failed: ${error.response.data}`));
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, user).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER, payload: response.data });
      localStorage.setItem('token', response.data.token);
      history.push('/');
    }).catch((error) => {
      console.log(error);
      dispatch(authError(`Sign Up Failed: ${error.response.data}`));
    });
  };
}

export function validateField(field, value) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/signup?field=${field}&value=${value}`).then((response) => {
      if (field === 'username') {
        dispatch({ type: ActionTypes.VALIDATE_USERNAME, payload: response.data });
      } else if (field === 'email') {
        dispatch({ type: ActionTypes.VALIDATE_EMAIL, payload: response.data });
      }
    }).catch((error) => {
      console.log(error);
    });
  };
}
