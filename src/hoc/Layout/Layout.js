import React, { Component } from 'react';
import Auxa from '../Auxa';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
class Layout extends Component {
    state = {
        showSide : false
    }
    toggleSideDrawer = () => {
        if(this.state.showSide) {
            this.setState({showSide:false});
        } else {
            this.setState({showSide:true});
        }
    }
    sideDrawerClosed = () => {
        this.setState({showSide:false});
    }
    render() {
        return(
            <Auxa>
                <Toolbar clicked={this.toggleSideDrawer}/>
                <SideDrawer open={this.state.showSide} closed={this.sideDrawerClosed}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
            </Auxa>
        );
    }
    
}
export default Layout;