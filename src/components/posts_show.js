import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';
import CommentForm from './comments_form';
import ShowComments from './comments_show';

class PostsShow extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount() {
        var blogUrl = window.location.pathname.split("/");
        var blog = blogUrl[1];
        var post = blogUrl[3];
        this.props.fetchPost(post, blog);
    }

    onDeleteClick() {
        var blogUrl = window.location.pathname.split("/");
        var blog = blogUrl[1];
        this.props.deletePost(this.props.params.id, blog)
            .then(() => {
                this.context.router.push('/' + blog + '/posts');
            });
    }

    renderPostImage(){
        const { post } = this.props;
        if(post.imageUrl && post.imageUrl != "none"){
            return (
                <img src={post.imageUrl} height="250px"></img>
            );
        }
        else {
            return;
        }
    }

    returnToIndex(){
        var blogUrl = window.location.pathname.split("/");
        var blog = blogUrl[1];
        this.context.router.push('/' + blog + '/posts');
    }

    render() {
        const { post } = this.props;
        var blogUrl = window.location.pathname.split("/");
        var blog = blogUrl[1];

        if(!post) {
            return<div></div>
        }

        return (
            <div>
                <button className="pull-xs-left btn btn-primary"
                    onClick={this.returnToIndex.bind(this)}>
                    Back To Index
                </button>
                <button 
                    className="pull-xs-right btn btn-danger"
                    onClick={this.onDeleteClick.bind(this)}>
                    Delete Post
                </button>
                <div className="singlePost">
                    {this.renderPostImage()}
                    <h2>{post.title}</h2>
                    <h4>Categories: {post.categories}</h4>
                    <h6>Time Posted: {post.timePosted}</h6>
                    <p>{post.content}</p>
                </div>
                <div className="comments">
                    <CommentForm />
                    <ShowComments />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);