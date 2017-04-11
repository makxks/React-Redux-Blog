import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchPost } from '../actions/index';

class CommentsShow extends Component {
    renderComments(){
        if(this.props.post.comments){
            var commentsArr = Object.keys(this.props.post.comments).map(key => this.props.post.comments[key]);
            return commentsArr.map((comment) => {
                return (
                    <li className="list-group-item comment" key={comment.id}>
                        <h6 className="text-pull-left"><strong>{comment.author}</strong></h6>
                        <h6 className="text-pull-left">{comment.timePosted}</h6>
                        <hr />
                        <p>{comment.content}</p>
                    </li>
                );
            });
        }
        else {
            return (
                <div>
                    <h6>No comments yet... </h6>
                </div>
            )
        }
    }

    render() {
        return (
            <ul className="list-group commentsList">
                {this.renderComments()}
            </ul>
        )
    }
}

function mapStateToProps(state) {
    return { post: state.posts.post };
};


export default connect(mapStateToProps, { fetchPost })(CommentsShow);