import React from 'react';
import TextField from '@material-ui/core/TextField';
import { DatePicker } from "@material-ui/pickers";

import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;

    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        case ('text-area'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('date-picker'):
            inputElement = <TextField
                id="date"
                label={props.elementConfig}
                type="date"
                defaultValue={props.value}
                className={inputClasses.join(' ')}
                onChange={props.changed}
                InputLabelProps={{
                    shrink: true,
                }} />;
            break;
        case ('year-picker'):
            inputElement = <DatePicker
                views={["year"]}
                label="Year only"
                // value={selectedDate}
                className={inputClasses.join(' ')}
                onChange={props.changed}
            />
            break;
        case ('file'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.onChange} />;
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;