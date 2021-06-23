import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import classes from './QuizForm.module.css';
import Button from '../../Button/Button';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '55ch',
    },
}));

function valuetext(value) {
    return `${value}°C`;
}

const QuizForm = props => {

    const classesMUI = useStyles();

    let formElements = null;
    formElements = (
        <>
            <TextField
                label="Quiz Name"
                id="outlined-margin-normal"
                defaultValue=""
                className={classesMUI.textField}
                margin="normal"
                variant="outlined"
            />
            <Typography id="discrete-slider" gutterBottom>
                Duration
            </Typography>
            <Slider
                defaultValue={20}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={10}
                marks
                min={10}
                max={100}
            />
        </>
    );



    return (
        <div className={classes.FormContainer}>
            <div className={classes.Form}>
                <div className={classes.FormContent}>
                    <form>
                        {formElements}
                        <div className={classes.FormContentButtons}>
                            <Button btnType="Success">SAVE</Button>
                            <Button clicked={() => props.modalClose(false)} btnType="Danger">CANCEL</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default QuizForm;