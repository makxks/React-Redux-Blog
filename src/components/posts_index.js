import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router';

class PostsIndex extends Component {
    componentWillMount() {
        this.props.fetchPosts();
    }

    renderNewPostButton() {
        //readd uid check later
        //when added to website and login checked
        
        //if(firebase.auth().currentUser && firebase.auth().currentUser.uid == "HpSs3QseDCa17bHO9tHM4eEJqNH3") {
            return (
                <div className="text-xs-right">
                    <Link to="/posts/new" className="btn btn-primary">
                        Add a Post
                    </Link>
                </div>
            );
        //}
        //else {
            return;
        //}
    }

    renderPosts() {
        if(this.props.posts) {
            var postsArr = Object.keys(this.props.posts).map(key => this.props.posts[key]);
            var orderedArr = [];
            for(var i = postsArr.length-1; i>=0; i--) {
                orderedArr[(postsArr.length-1-i)] = postsArr[i];
            }
            return orderedArr.map((post) => {
                return (
                    <li className="list-group-item" key={post.id}>
                        <Link to={"posts/" + post.id}>
                            <span className="pull-xs-right">{post.categories}</span>
                            <strong>{post.title}</strong>
                        </Link>
                    </li>
                );
            });
        }
        else {
            return <div></div>
        }
    }
    
    renderSearchBar() {
        // add a search bar here
        // search by categories
    }

    render() {
        console.log(this.props.posts);
        return (
            <div>
                {this.renderNewPostButton()}
                <h3>Posts</h3>
                {this.renderSearchBar()}
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return { posts: state.posts.all };
};


export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
