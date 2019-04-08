import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment';

export default class Listing extends Component {
    render() {
        return (
            <dl>
                {this.props.posts.map((post, i) => (
                    <Fragment key={i}>
                        <dt key={post.name}>
							<a target="_blank"
								rel="noopener noreferrer"
								href={post.url}>{post.title}</a>
						</dt>
                        <dd key={post.title} className="post-info tiles">
							<span>Submitted <strong>{moment.unix(post.created).fromNow()}</strong> by <strong>{post.author}</strong>
								<a target="_blank" 
									rel="noopener noreferrer"
									href={"https://www.reddit.com" + post.permalink}>{post.num_comments} comments</a>
							</span>
							<span>
								{post.thumbnail && post.thumbnail.slice(0, 4)==='http' && 
								<a target="_blank"
									rel="noopener noreferrer"
									href={post.url}><img alt={post.title} src={post.thumbnail} /></a>}
							</span>
						</dd>
                    </Fragment>
                ))}
            </dl>
        )
    }
}

Listing.propTypes = {
    posts: PropTypes.array.isRequired
}
