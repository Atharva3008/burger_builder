import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxa from '../Auxa';

const withErrorHandler = (Wrapped, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error:null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res=>res,error => {
                this.setState({error:error});
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor); 
        }

        errorConfirmedHandler=()=> {
            this.setState({error:null});
        }
        render() {
            return(
                <Auxa>
                <Modal 
                    show={this.state.error}
                    closed={this.errorConfirmedHandler}>
                    {this.state.error ? <h3 style={{textAlign:"center"}}>{this.state.error.message}</h3> : null}
                </Modal>
                <Wrapped {...this.props}/>
            </Auxa>
            );
        }
    }
}

export default withErrorHandler;