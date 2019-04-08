import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Pager extends Component {
    render() {
		const {last, next, pagerClick} = this.props
        return (
            <div className="pager">
				<div className="tiles">
					<button value={last} disabled={!last} onClick={pagerClick}>Last</button>
					<button value={next} onClick={pagerClick}>Next</button>
				</div>
            </div>
        )
    }
}

Pager.propTypes = {
    last: PropTypes.string.isRequired,
    next: PropTypes.string.isRequired,
	pagerClick: PropTypes.func.isRequired
}