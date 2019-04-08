import { combineReducers } from 'redux'
import {
    INVALIDATE_SUBREDDIT,
    RECEIVE_POSTS,
    REQUEST_POSTS,
    SELECT_SUBREDDIT,
    SLICE_POSTS
} from './ActionTypes'

function selectedSubreddit(state = 'reactjs', action) {
    switch (action.type) {
        case SELECT_SUBREDDIT:
            return action.subreddit
        default:
            return state
    }
}

function posts(
    state = {
        isFetching: false,
        didInvalidate: false,
		currentSlice: '',
        slices: {}
    },
    action
) {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
				currentSlice: action.currentSlice,
				slices: {
					[action.currentSlice]: action.posts,
					...state.slices
				},
                lastUpdated: action.receivedAt
            })
        case SLICE_POSTS:
			const { currentSlice, direction } = action
            return Object.assign({}, state, {
				currentSlice: currentSlice,
				direction: direction,
				lastSlice: state.currentSlice
            })
        default:
            return state
    }
}

function postsBySubreddit(state = {}, action) {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
        case SLICE_POSTS:
            return Object.assign({}, state, {
				[action.subreddit]: posts(state[action.subreddit], action)
            })
        default:
            return state
        }
}

const rootReducer = combineReducers({
    postsBySubreddit,
    selectedSubreddit
})

export default rootReducer
