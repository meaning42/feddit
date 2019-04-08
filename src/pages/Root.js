import React, { Component } from 'react';
import { Provider } from 'react-redux'
import Footer from './Footer';
import Header from './Header';
import configureStore from '../Store'
import RedditViewer from '../cmp/RedditViewer'

const store = configureStore()

export default class Root extends Component {
    render() {
        return (
            <div className="app-wrapper">
                <Provider store={store}>
                    <Header />
                    <RedditViewer />
                    <Footer />
                </Provider>
            </div>
        );
    }
}
