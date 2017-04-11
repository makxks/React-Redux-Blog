import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Home from './components/home';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';
import BlogsNew from './components/blogs_new';
import Auth from './components/auth';

export default (
<Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/:blog/posts" component={PostsIndex} />
    <Route path="/new" component={BlogsNew} /> 
    <Route path="/:blog/posts/new" component={PostsNew} />
    <Route path="/:blog/posts/:id" component={PostsShow} />
</Route>
);