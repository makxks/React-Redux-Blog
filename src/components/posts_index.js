import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router';

class PostsIndex extends Component {
    constructor(props) {
        super(props);
        
        this.state = { searchTerm: '' };
    }

    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount() {
        var blogUrl = window.location.pathname.split("/");
        var blog = blogUrl[1];
        this.props.fetchPosts(blog);
    }

    goHome() {
        this.context.router.push('/')
    }

    renderHomeButton() {
        return ( 
            <button 
                className="pull-xs-left btn btn-primary homeButton"
                onClick={this.goHome.bind(this)}>
                Home
            </button>
        )
    }

    goToNewPost() {
        this.context.router.push('posts/new')
    }

    renderNewPostButton() {
        //readd uid check later
        //when added to website and login checked
        var blogUrl = window.location.pathname.split("/");
        var blog = blogUrl[1];        
        //if(firebase.auth().currentUser && firebase.auth().currentUser.uid == "HpSs3QseDCa17bHO9tHM4eEJqNH3") {
            return (
                <button 
                    className="pull-xs-right btn btn-primary newButton"
                    onClick={this.goToNewPost.bind(this)}>
                        Add a Post
                </button>
            );
        //}
        //else {
        //    return;
        //}
    }

    renderPosts() {
        var blogUrl = window.location.pathname.split("/");
        var blog = blogUrl[1];
        if(this.props.posts) {
            var postsArr = Object.keys(this.props.posts).map(key => this.props.posts[key]);
            var orderedArr = [];
            var finalArr = [];
            for(var i = postsArr.length-1; i>=0; i--) {
                orderedArr[(postsArr.length-1-i)] = postsArr[i];
            }
            if(this.state.searchTerm != ''){
                for(var i = 0; i < orderedArr.length; i++){
                    var categories = orderedArr[i].categories.split(" ");
                    for (var j = 0; j < categories.length; j++){
                        if(categories[j] == this.state.searchTerm){
                            finalArr.push(orderedArr[i]);
                        }
                    }
                }
            }
            else {
                finalArr = orderedArr;
            }
            return finalArr.map((post) => {
                return (
                    <li className="list-group-item" key={post.id}>
                        <Link to={"/" + blog + "/posts/" + post.id}>
                            <span className="pull-xs-right">{post.categories}</span>
                            <strong>{post.title}</strong>
                        </Link>
                    </li>
                );
            });
        }
        else {
            return (
                <div>
                    <h3>No posts yet... </h3>
                </div>
            )
        }
    }

    onSearchInputChange(term){
        this.setState({searchTerm: term});
    }

    onCancelSearch(){
        this.setState({searchTerm: ''});
    }
    
    renderSearchBar() {     
        return (
            <form onSubmit={this.onSearchSubmit} className="searchBar">
                <input
                    placeholder="Search posts by categories"
                    value = {this.state.enteredTerm}
                    className = "formInput"
                    onChange = {event => this.onSearchInputChange(event.target.value)} />
            </form>
        )
    }

    render() {
        var blogUrl = window.location.pathname.split("/");
        var blog = blogUrl[1];
        console.log(blog);
        return (
            <div>
                <div className="buttonHolder">
                    {this.renderHomeButton()}
                    {this.renderNewPostButton()}
                </div>
                <h3 className="blogTitle">{blog}</h3>
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
