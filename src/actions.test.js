import configureMockStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'
import * as actions from './actions'
import * as types from './ActionTypes'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('sync actions', () => {
	it('should select a subreddit', () => {
		const subreddit = 'frontend'
		const expectedAction = {
			type: types.SELECT_SUBREDDIT,
			subreddit
		}
		expect(actions.selectSubreddit(subreddit)).toEqual(expectedAction)
	})
	it('should invalidate a subreddit', () => {
		const subreddit = 'frontend'
		const expectedAction = {
			type: types.INVALIDATE_SUBREDDIT,
			subreddit
		}
		expect(actions.invalidateSubreddit(subreddit)).toEqual(expectedAction)
	})
})

describe('async actions', () => {
	afterEach(() => {
		fetchMock.restore()
	})

	it('creates RECEIVE_POSTS when posts fetch completes', () => {
		const subreddit = 'reactjs'
		fetchMock.getOnce(subreddit + '.json', {
			body: { postsBySubreddit: {'reactjs': [{title: 'dummyTitle'}] } },
			headers: { 'content-type': 'application/json' }
		})

		const expectedActions = [
			{ type: types.REQUEST_POSTS, subreddit: 'reactjs' },
			{ type: types.RECEIVE_POSTS, subreddit: 'reactjs', currentSlice: 'reactjs' },
		]
		const store = mockStore({ posts: [] })

		return store.dispatch(actions.fetchPostsIfNeeded(subreddit)).then(() => {
			let actions = store.getActions()
			expect(actions[0]).toEqual(expectedActions[0])
			expect(actions[1]).toMatchObject(expectedActions[1])
		})
	})
})