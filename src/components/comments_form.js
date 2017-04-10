import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';

class CommentForm extends Component {
    onSubmit(props) {
        var blogUrl = window.location.pathname.split("/");
        var blog = blogUrl[1];
        var newCommentKey = firebase.database().ref().child(blog + '/posts/' + post.id + '/comments').push().key;
        var d = new Date();
        console.log("time" + d);
        firebase.database().ref(blog + '/posts/' + post.id).set({
            content: props.content, 
            //author: firebase.auth().currentUser.uid,
            timePosted: d.toLocaleTimeString() + " " + d.toDateString(),
            id: newCommentKey});
    }

    commentForm(){
        if(!firebase.auth().currentUser){
            return (
                <div>
                    <h5>You must log in to comment</h5>
                </div>
            )
        }
        else {
            return (
            <div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <h3>Create A New Comment</h3>
                    <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
                        <label>Content</label>
                        <input type="text" className="form-control" {...content} />
                        <div className="text-help">
                            {content.touched ? content.error : ''}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            );
        }
    }

    render() {
        return (
            <div>
                {this.commentForm()}
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.title) {
        errors.content = 'Enter a comment';
    }

    return errors;
}

export default reduxForm({
    form: 'Comments',
    fields: ['content'],
    validate
}, null)(CommentForm);