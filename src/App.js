import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import User from './components/User';
export default class App extends Component {

    render() {
        return (
            <div>
                {/* <Header /> */}
                


                <BrowserRouter>
                <Route exact  path="/" component={User} />
                

            </BrowserRouter>

            </div>
        )
    }
}
