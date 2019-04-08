import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {
    fetchPostsIfNeeded,
    invalidateSubreddit,
	slicePosts
} from '../actions'
import Listing from './Listing'
import Pager from './Pager'

class RedditViewer extends Component {
	state = {
		timer: null
	};

    componentDidMount() {
        const { dispatch, selectedSubreddit } = this.props;
        dispatch(fetchPostsIfNeeded(selectedSubreddit));
		let timer = setInterval(this.refresh, 1000 * 60 );
		this.setState({timer});
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
            const { dispatch, selectedSubreddit } = this.props;
            dispatch(fetchPostsIfNeeded(selectedSubreddit));
        }
    }

	componentWillUnmount() {
		this.clearInterval(this.state.timer);
	}

    handleRefreshClick = (e) => {
        e.preventDefault();
		if (e.target.value) {
			const { dispatch, selectedSubreddit } = this.props;
			let sliceId = e.target.value,
				sliceDirection = e.target.innerText.toLowerCase();
			dispatch(slicePosts(selectedSubreddit, sliceId, sliceDirection));
		}
		this.refresh();
    }

	refresh = () => {
        const { dispatch, selectedSubreddit } = this.props
        dispatch(invalidateSubreddit(selectedSubreddit))
        dispatch(fetchPostsIfNeeded(selectedSubreddit))
	}

    render() {
        const { isFetching, lastUpdated, selectedSubreddit, slice } = this.props;
		const posts = (slice && slice.items) || [];
        return (
            <div className="reddit-viewer">
				<h2>/r/<span>{selectedSubreddit}</span></h2>
                <p>
                  {lastUpdated && (
                    <span>Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}</span>
                  )}
                  {!isFetching && (
                    <button onClick={this.handleRefreshClick}>Refresh</button>
                  )}
                </p>
                {!posts && <h2>Loading...</h2>}
                {!isFetching && posts && posts.length === 0 && <h2>Empty.</h2>}
                {posts && posts.length > 0 && (
                    <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                        <Listing posts={posts} />
						<Pager last={slice.sliceLast} next={slice.sliceNext} pagerClick={this.handleRefreshClick} />
                    </div>
                )}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { selectedSubreddit, postsBySubreddit } = state;
    const subreddit = postsBySubreddit[
        selectedSubreddit
    ] || {
        isFetching: true,
        slices: {}
    };
	const {currentSlice, isFetching, lastUpdated, slices} = subreddit;
	const slice = (currentSlice && slices[currentSlice]) || {};

    return {
        selectedSubreddit,
        slice,
        isFetching,
        lastUpdated
    };
}

RedditViewer.propTypes = {
    selectedSubreddit: PropTypes.string.isRequired,
    posts: PropTypes.array,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(RedditViewer)