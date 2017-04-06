import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POST = 'FETCH_POST';
export const DELETE_POST = 'DELETE_POST';


export function fetchPosts() {
    // add get request to db

    return {
        type: FETCH_POSTS,
        payload: snapshot
    };      
}

export function createPost(props) {
    //add post request to db
    
    return {
        type: CREATE_POST,
        payload: request
    }
}

export function fetchPost(id) {
    //const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

    return {
        type: FETCH_POST,
        payload: request
    };
}

export function deletePost(id) {
    //const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`);

    return {
        type: DELETE_POST,
        payload: request
    };
}