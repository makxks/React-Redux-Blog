import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';

class CommentForm extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    onSubmit(props) {
        var blogUrl = window.location.pathname.split("/");
        var blog = blogUrl[1];
        var post = blogUrl[3];
        var newCommentKey = firebase.database().ref().child(blog + '/posts/' + post + '/comments').push().key;
        var d = new Date();
        console.log("time" + d);
        firebase.database().ref(blog + '/posts/' + post + '/comments/' + newCommentKey).set({
            content: props.content, 
            //author: firebase.auth().currentUser.uid,
            timePosted: d.toLocaleTimeString() + " " + d.toDateString(),
            id: newCommentKey});
        window.location.reload();
    }

    commentForm(){
        const { fields: { content }, handleSubmit } = this.props;

        /*if(!firebase.auth().currentUser){
            return (
                <div>
                    <h5>You must log in to comment</h5>
                </div>
            )
        }*/
        //else {
            return (
            <div className="commentInput">
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="commentInput">
                    <h5>Create A New Comment</h5>
                    <div className={`form-group commentInput ${content.touched && content.invalid ? 'has-danger' : ''}`}>
                        <textarea className="form-control commentInput" rows="5" {...content} />
                        <div className="text-help">
                            {content.touched ? content.error : ''}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            );
        //}
    }

    render() {
        return (
            <div className="commentInput">
                {this.commentForm()}
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.content) {
        errors.content = 'Enter a comment';
    }

    return errors;
}

export default reduxForm({
    form: 'Comments',
    fields: ['content'],
    validate
}, null)(CommentForm);