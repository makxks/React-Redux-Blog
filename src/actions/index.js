export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POST = 'FETCH_POST';
export const DELETE_POST = 'DELETE_POST';

var database = firebase.database();

export function fetchPosts() {
    var postsRef = database.ref('posts/');
    return postsRef.once('value')
        .then(function(snapshot) {
            console.log(snapshot.val());
            return {
                type: FETCH_POSTS,
                payload: snapshot.val()
            };
        });        
}

/*export function createPost(props) {
    var newPostKey = database.ref().child('posts').push().key;
    var post = new Post(props.title, props.categories, props.content, new Date(), {}, newPostKey);
    const request = database.ref('posts/' + newPostKey).set(post);
    console.log(post);
    console.log(request);
    return {
        type: CREATE_POST,
        payload: request
    }
}*/

export function fetchPost(id) {
    var postRef = database.ref('posts/' + id);
    return postRef.once('value')
        .then(function(snapshot) {
            console.log(snapshot.val());
            return {
                type: FETCH_POST,
                payload: snapshot.val()
            };
        });
}

export function deletePost(id) {
    var postRef = database.ref('posts/' + id);

    return {
        type: DELETE_POST,
        payload: postRef.remove()
    };
}