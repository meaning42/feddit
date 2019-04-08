# FEDdit

## Overview

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Made use of the [Redux Advanced Tutorial](https://redux.js.org/advanced/advanced-tutorial) application for a bunch of boilerplate.

Disabled the sample application feature for switching subreddits as it was not part of the requirements, nonetheless the rigging remains in the form of a selection action and Picker component.
As a result, in order to change the viewed subreddit, change the default state of the selectedSubreddit reducer (reducers.js:10)

Kept the module footprint minimal by using as much of the default create-react-app as possible.  Minimal module installs of note, include:

- redux (of course)
- moment (for 'X time units ago' messages on posts)
- enzyme for component testing

## Technical Details

This Reddit subreddit viewer maintains the caching of the original example, while adding paging of subreddits.  To be very clear "paging" is a foggy concept for Reddit which works in "slices of posts" of a particular count, in a direction from a given slice.

### Sample State Shape

Each subreddit appears as 

	{
		selectedSubreddit: 'reactjs',
		postsBySubreddit: {
			'frontend': {
				isFetching: true,
				didInvalidate: false,
				currentSlice: '',
				slices: {}
			},
			'reactjs': {
				isFetching: false,
				didInvalidate: false,
				lastUpdated: 1439478405547,
				currentSlice: 't3_b8t25v',
				slices: {
					'reactjs': {
						sliceLast: '',
						sliceNext: 't3_b8t25v',
						items: [{
							title: 'Confusion about Flux and Relay'
							...
						}, {
							title: 'Creating a Simple Application Using React JS and Flux Architecture'
							...
						}]
					},
					't3_b8t25v': {
						sliceLast: 'reactjs',
						sliceNext: 't3_3g4a8t',
						items: [{
							title: 'Confusion about Flux and Relay (Part 2)'
							...
						}, {
							title: 'Where Promise really shines'
							...
						}]
					}
					't3_3g4a8t': {
						...
					}
				}
			}
		}
	}

## Testing Notes

Used the default install of jest for the most part, with enzyme for component coverage.
By no means is the test coverage complete, instead the aim was to cover the important pieces (like actions and reducers) and demonstrate testing knowledge across the spectrum.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!
