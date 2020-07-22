import React, { Component } from 'react';
import classes from './Modal.module.css';
import Backdrop from './../Backdrop/Backdrop';
import Auxa from './../../../hoc/Auxa';
class Modal extends Component {
    shouldComponentUpdate (nextProp, nextState){
        return(nextProp.show!==this.props.show || nextProp.children!==this.props.children);
    }
    render() {
        return (
            <Auxa>
                <Backdrop show={this.props.show} clicked={this.props.closed}/>
                <div className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                    {this.props.children}
                </div>
            </Auxa>
        );
    }
}

export default Modal;