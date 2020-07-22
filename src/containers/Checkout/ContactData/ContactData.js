import React from 'react';
import Button from '../../../components/UI/Button/Button';
import Classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';


class ContactData extends React.Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip'
                },
                value: '',
                validation: {
                    required: true,
                    minlength: 6,
                    maxlength: 6
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: '',
                valid: true
            }
        },
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }
    checkValid = (value,rules) => {
        let isValid = true;
        if(!rules) {
            return true;
        }
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minlength) {
            isValid = value.length >=rules.minlength && isValid;
        }

        if(rules.maxlength) {
            isValid = value.length <=rules.maxlength && isValid;
        }
        return isValid;
    }
    inputChangedHandler = (event, inputIdentifier) => {
        console.log(event.target.value);
        const uof = {
            ...this.state.orderForm
        };
        const ufe = {
            ...uof[inputIdentifier]
        };
        ufe.value = event.target.value;
        ufe.valid = this.checkValid(ufe.value,ufe.validation);
        ufe.touched=true;
        uof[inputIdentifier] = ufe;
        this.setState({orderForm: uof});
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({loading:true});
        const fd = {};
        for(let i in this.state.orderForm) {
            fd[i] = this.state.orderForm[i].value; 
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: fd
        }
        axios.post('/orders.json',order)
            .then(response => {
                this.setState({loading:false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading:false});
            });
    }
    render() {
        const fea = [];
        for(let k in this.state.orderForm) {
            fea.push({
                id: k,
                config: this.state.orderForm[k]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {fea.map(fe => (
                    <Input 
                        key={fe.id}
                        elementType={fe.config.elementType}
                        elementConfig={fe.config.elementConfig}
                        value={fe.config.value}
                        invalid={!fe.config.valid}
                        shouldValidate={fe.config.validation}
                        touched={fe.config.touched}
                        changed={(event) => this.inputChangedHandler(event,fe.id)}/>
                ))}
                <Button btnType="Success" >Order</Button>
            </form>
        );
        if(this.state.loading) form = <Spinner/>;
        return(
            <div className={Classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);