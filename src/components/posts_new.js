import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';

class PostsNew extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    onSubmit(props) {
        var blogUrl = window.location.pathname.split("/");
        var blog = blogUrl[1];
        var newPostKey = firebase.database().ref().child(blog + '/posts').push().key;
        var d = new Date();
        var imageSrc;
        if(!props.imageUrl || props.imageUrl==""){
            imageSrc = "none";
        }
        else {
            imageSrc = props.imageUrl;
        }
        firebase.database().ref(blog + '/posts/' + newPostKey).set({
            title: props.title, 
            categories: props.categories, 
            imageUrl: imageSrc, 
            content: props.content, 
            timePosted: d.toLocaleTimeString() + " " + d.toDateString(), 
            comments: {}, 
            id: newPostKey});
        this.context.router.push('/' + blog + '/posts');  
    }

    render() {
        var blogUrl = window.location.pathname.split("/");
        var blog = blogUrl[1];
        if(!firebase.auth().currentUser || firebase.auth().currentUser.uid != "HpSs3QseDCa17bHO9tHM4eEJqNH3"){
            return (
                <div>
                    <h3>You are not authenticated to make new posts</h3>
                    <Link to={"/" + blog + "/posts"} className="btn btn-danger">Go Back</Link>
                </div>
            )
        }
        var blogUrl = window.location.pathname.split("/");
        var blog = blogUrl[1];
        const { fields: { title, categories, content, imageUrl }, handleSubmit } = this.props;
 
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Create A New Post</h3>
                <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
                    <label>Title</label>
                    <input type="text" className="form-control" {...title} />
                    <div className="text-help">
                        {title.touched ? title.error : ''}
                    </div>
                </div>

                <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
                    <label>Categories</label>
                    <input type="text" className="form-control" {...categories} default="none" />
                    <div className="text-help">
                        {categories.touched ? categories.error : ''}
                    </div>
                </div>

                <div className={`form-group`}>
                    <label>Image URL</label>
                    <input type="text" className="form-control" {...imageUrl} />
                </div>

                <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
                    <label>Content</label>
                    <textarea className="form-control" {...content} />
                    <div className="text-help">
                        {content.touched ? content.error : ''}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to={"/" + blog + "/posts"} className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.title) {
        errors.title = 'Enter a title';
    }

    if(!values.categories) {
        errors.categories = 'Enter categories';
    }

    if (!values.content) {
        errors.content = 'Enter some content';
    }

    return errors;
}

// connect: first argument is mapStateToProps, second is mapDispatchToProps
// reduxForm: first is form config, second is mapStateToProps, third is mapDispatchToProps

export default reduxForm({
    form: 'PostsNew',
    fields: ['title', 'categories', 'imageUrl', 'content'],
    validate
}, null)(PostsNew);