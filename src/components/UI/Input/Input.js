import React from 'react';
import Classes from './Input.module.css';
const input = (props) => {
    let ele = null;
    const ic = [Classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched) {
        console.log(props.invalid,props.shouldValidate,props.touched)
        ic.push(Classes.Invalid);
    }

    switch(props.elementType) {
        case ('input'):
            ele = <input 
                    className={ic.join(' ')} 
                    {...props.elementConfig} 
                    value={props.value}
                    onChange={props.changed}/>
            break;
        case('textarea'):
            ele = <textarea 
                    className={ic.join(' ')}
                    {...props.elementConfig} 
                    value={props.value}
                    onChange={props.changed}/>
            break;
        case('select'):
            ele = (<select 
                    className={ic.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                        {props.elementConfig.options.map(option => (
                            <option key={option.value} value={option.value}>{option.displayValue}</option>
                        ))}
                   </select>)
            break;
        default:
            ele = <input 
                    className={ic.join(' ')}
                    {...props.elementConfig} 
                    value={props.value}
                    onChange={props.changed}/>
    }
    return(
        <div className={Classes.Input}>
            <label className={Classes.Label}>{props.label}</label>
            {ele}
        </div>
    );
}

export default input;