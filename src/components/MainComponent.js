import React, {Component, component} from 'react';
import Directory from './DirectoryComponent';
import Campsiteinfo from './CampsiteinfoComponent';
import { CAMPSITES } from '../shared/campsites';
import Header from './HeaderComponent';
import footer from './FooterComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES
        };
    }

    render() {

        const HomePage = () => {
            return (
                <Home />
            );
        };

        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/directory' render={() => <Directory campsites={this.state.campsites} />} />
                    <Redirect to='/home' />
                </Switch>
                <Footer />
            </div>
        );

export default Main;