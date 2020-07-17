import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer : false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        // you shouldn't do like below because async nature of setState, this may lead to unexpected outcomes.
        //this.setState({ showSideDrawer: !this.state.showSideDrawer });
        this.setState((prevState) => { 
            return { showSideDrawer: !prevState.showSideDrawer };
        }); // this is the clean way of setting state when it depends on the old state.    
    }

    render () {
        return (    
        <Auxiliary>
            <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
            <SideDrawer 
                open={this.state.showSideDrawer} 
                closed={this.sideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Auxiliary>
    );
    }
} 
export default Layout;