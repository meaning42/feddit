import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Pager from './cmp/Pager'

Enzyme.configure({ adapter: new Adapter() })

function setup() {
	const props = {
		last: 'BACK',
		next: 'FORTH',
		pagerClick: jest.fn()
	}

	const enzymeWrapper = shallow(<Pager {...props} />)

	return {
		props,
		enzymeWrapper
	}
}

describe('components', () => {
	describe('Pager', () => {
		it('should render the containers', () => {
			const { enzymeWrapper } = setup()

			expect(enzymeWrapper.find('div.pager').length).toBe(1)
			expect(enzymeWrapper.find('div.tiles').length).toBe(1)
		})

		it('should render buttons with correct properties', () => {
			const { enzymeWrapper, props } = setup()
			let buttons = enzymeWrapper.find('button')
			expect(buttons.length).toBe(2)

			let left = buttons.first().props()
			expect(left.value).toBe(props.last)
		})
	})
})