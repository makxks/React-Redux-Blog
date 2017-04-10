import { FETCH_POSTS, FETCH_POST, FETCH_BLOGS } from '../actions/index';

const INITIAL_STATE = { all: [], post: null, blogs: [] };

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
    case FETCH_POST:
        return { ...state, post: action.payload };
    case FETCH_POSTS:
        return { ...state, all: action.payload };
    case FETCH_BLOGS:
        return { ...state, blogs: action.payload };
    default:
        return state;
    }
}