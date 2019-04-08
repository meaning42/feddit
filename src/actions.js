import fetch from 'cross-fetch'
import {
    INVALIDATE_SUBREDDIT,
    RECEIVE_POSTS,
    REQUEST_POSTS,
    SELECT_SUBREDDIT,
	SLICE_POSTS
} from './ActionTypes'

export function selectSubreddit(subreddit) {
    return {
        type: SELECT_SUBREDDIT,
        subreddit
    }
}

export function invalidateSubreddit(subreddit) {
    return {
        type: INVALIDATE_SUBREDDIT,
        subreddit
    }
}

export function slicePosts(subreddit, sliceId, sliceDirection) {
    return {
        type: SLICE_POSTS,
		subreddit: subreddit,
		currentSlice: sliceId,
		direction: sliceDirection
    }
}

function requestPosts(subreddit) {
    return {
        type: REQUEST_POSTS,
        subreddit
    }
}

function receivePosts(subreddit, sliceId, json, state) {
	let current = sliceId ? sliceId : subreddit,
		last='';
    const reddit = state.postsBySubreddit && state.postsBySubreddit[subreddit]
	if (reddit) {
		const { direction, lastSlice } = reddit
		last = (lastSlice && direction==='next') ? lastSlice : ''
	}
    return {
        type: RECEIVE_POSTS,
        subreddit,
		currentSlice: current,
        posts: {
			sliceLast: last,
			sliceNext: json.data.after,
			items: json.data.children.map(child => child.data)
		},
        receivedAt: Date.now()
    }
}

function fetchPosts(subreddit, sliceId, state) {
	let fetchUri = `https://www.reddit.com/r/${subreddit}.json?count=25`;
	if (sliceId) {
		fetchUri += '&after=' + sliceId;
	}

    return dispatch => {
        dispatch(requestPosts(subreddit))
        return fetch(fetchUri)
            .then(response => response.json())
            .then(json => dispatch(receivePosts(subreddit, sliceId, json, state)))
    }
}

function shouldFetchPosts(state, subreddit) {
    const posts = state.postsBySubreddit && state.postsBySubreddit[subreddit]
    const current = posts && posts.currentSlice
    const slice = posts && current && posts.slices[current]
    if (!posts || !current || !slice) {
        return true
    } else if (posts.isFetching) {
        return false
    } else {
        return posts.didInvalidate
    }
}

export function fetchPostsIfNeeded(subreddit) {
    return (dispatch, getState) => {
		const state = getState()
		let sliceId = ''
		if (state && state.postsBySubreddit) {
			const slice = state && state.postsBySubreddit[subreddit]
			sliceId = slice && slice.currentSlice
		}
        if (shouldFetchPosts(state, subreddit)) {
            return dispatch(fetchPosts(subreddit, sliceId, state))
        }
    }
}