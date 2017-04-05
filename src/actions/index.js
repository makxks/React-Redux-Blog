import { Post } from '../models/post.model';

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POST = 'FETCH_POST';
export const DELETE_POST = 'DELETE_POST';

    var database = firebase.database();

export function fetchPosts() {
    var request;
    if(database.ref('posts/')){
        var postsRef = database.ref('posts/');
        return database.ref('posts/').once('value')
            .then(function(snapshot) {
                console.log(snapshot);
                return {
                    type: FETCH_POSTS,
                    payload: snapshot
                };
            });        
    }
    else {
        database.ref('posts/').set({
            
        });
    }
}

export function createPost(props) {
    var newPostKey = database.ref().child('posts').push().key;
    var post = new Post(props.title, props.categories, props.content, new Date(), {}, newPostKey);
    var update = {};
    update['posts/' + newPostKey] = post;
    const request = database.ref().update(update);

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