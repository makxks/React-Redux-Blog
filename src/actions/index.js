export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_BLOGS = 'FETCH_BLOGS';
export const FETCH_POST = 'FETCH_POST';
export const DELETE_POST = 'DELETE_POST';

var database = firebase.database();

export function fetchBlogs() {
    var blogsRef = database.ref();
    return blogsRef.once('value')
        .then(function(snapshot) {
            return {
                type: FETCH_BLOGS,
                payload: snapshot.val()
            };
        });
}

export function fetchPosts(blog) {
    var postsRef = database.ref(blog + '/posts/');
    return postsRef.once('value')
        .then(function(snapshot) {
            return {
                type: FETCH_POSTS,
                payload: snapshot.val()
            };
        });        
}

export function fetchPost(id, blog) {
    var postRef = database.ref(blog + '/posts/' + id);
    return postRef.once('value')
        .then(function(snapshot) {
            return {
                type: FETCH_POST,
                payload: snapshot.val()
            };
        });
}

export function deletePost(id, blog) {
    var postRef = database.ref(blog + '/posts/' + id);

    return {
        type: DELETE_POST,
        payload: postRef.remove()
    };
}
