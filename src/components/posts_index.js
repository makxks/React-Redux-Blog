import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router';

class PostsIndex extends Component {
    constructor(props) {
        super(props);

        this.state = { searchTerm: '' };
    }

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
        //    return;
        //}
    }

    renderPosts() {
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
