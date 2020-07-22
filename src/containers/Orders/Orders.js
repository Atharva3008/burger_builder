import React from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
class Orders extends React.Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        axios.get('/orders.json')
        .then(res => {
            console.log(res.data);
            const fos = [];
            for(let i in res.data) {
                fos.push({
                    ...res.data[i],
                    id: i
                });
            }
            this.setState({loading: false, orders: fos})
        })
        .catch(error => {
            this.setState({loading:false})
        })
    }
    render() {
        return(
            <div>
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price}/>
            ))}
            </div>
        ); 
    }
}

export default withErrorHandler(Orders,axios);