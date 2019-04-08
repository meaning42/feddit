import reducer from './reducers'
import * as types from './ActionTypes'

describe('root reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			postsBySubreddit: {},
			selectedSubreddit: 'reactjs'
		})
	})
	it('should select a subreddit', () => {
		const select = {
			type: types.SELECT_SUBREDDIT, 
			subreddit: 'frontend'
		}
		expect(reducer({}, select)).toEqual({
			postsBySubreddit: {},
			selectedSubreddit: 'frontend'
		})
	})
	it('should invalidate a subreddit', () => {
		const invalidate = {
			type: types.INVALIDATE_SUBREDDIT, 
			subreddit: 'frontend'
		}
		expect(reducer({}, invalidate)).toEqual({
			postsBySubreddit: {
				frontend: {
					currentSlice: '', 
					didInvalidate: true, 
					isFetching: false, 
					slices: {}
				}
			}, 
			selectedSubreddit: 'reactjs'
		})
	})
	it('should request subreddit posts', () => {
		const posts_req = {
			type: types.REQUEST_POSTS, 
			subreddit: 'frontend'
		}
		expect(reducer({selectedSubreddit: 'frontend'}, posts_req)).toMatchObject({
			postsBySubreddit: {
				frontend: {
					isFetching: true
				}
			},
			selectedSubreddit: 'frontend'
		})
	})
	it('should receive subreddit posts', () => {
		const receive = {
			type: types.RECEIVE_POSTS, 
			subreddit: 'frontend',
			currentSlice: 'frontend'
		}
		expect(reducer({}, receive)).toMatchObject({
			postsBySubreddit: {
				frontend: {
					isFetching: false
				}
			}
		})
	})
	it('should handle subreddit post slice events', () => {
		const slice = {
			type: types.SLICE_POSTS, 
			subreddit: 'frontend',
			currentSlice: 'newSliceId',
			direction: 'westwardbound'
		}
		expect(reducer({}, slice)).toMatchObject({
			postsBySubreddit: {
				frontend: {
					currentSlice: 'newSliceId',
					direction: 'westwardbound', 
				}
			}, 
		})
	})
})