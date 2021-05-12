import React, { useState } from 'react';

import classes from './BookForm.module.css';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { checkValidity, updateObject } from '../../utility/utility';
//import Book from '/i'
//import {addBook} from '../../store/actions/index';

const state = {
    controls: {
        title: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'book title'
            },
            value: '',
            validation: {
                required: true,
                minLength: 3,
                maxLength: 50
            },
            valid: false,
            touched: false
        },
        description: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'description'
            },
            value: '',
            validation: {
                required: true,
                maxLength: 300
            },
            valid: false,
            touched: false
        },
        image: {
            elementType: 'input',
            elementConfig: {
                type: 'file',
                placeholder: 'price',
                accept: "image/*"
            },
            value: '',
            validation: {
                required: true,
                minLength: 1,
                maxLength: 5
            },
            valid: true,
            touched: false
        },
        price: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'price'
            },
            value: '',
            validation: {
                required: true,
                minLength: 1,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        publisher: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'publisher'
            },
            value: '',
            validation: {
                required: true,
                maxLength: 60
            },
            valid: false,
            touched: false
        },
        publishDate: {
            elementType: 'date-picker',
            elementConfig: 'published date',
            value: '',
            valid: true,
            touched: false
        }
    }
}


const BookForm = props => {

    const [inputs, setInputs] = useState(state);
    const [isformValid, setFormValidity] = useState(false);

    const formElementsArray = [];
    for (let key in inputs.controls) {
        formElementsArray.push({
            id: key,
            config: inputs.controls[key]
        })
    }

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(inputs.controls,
            {
                [controlName]: updateObject(inputs.controls[controlName],
                    {
                        value: event.target.value,
                        valid: checkValidity(event.target.value, inputs.controls[controlName].validation),
                        touched: true
                    })
            }
        )
        setInputs({ controls: updatedControls });
        let formStatus = true;
        for (let inputElement in updatedControls) {
            formStatus = updatedControls[inputElement].valid && formStatus;
        }
        setFormValidity(formStatus);
    }

    const bookCover = require('../../images/art.jpeg');
    const submitHandler = (event) => {
        event.preventDefault();
        let year = inputs.controls.publishDate.value;
        if (year !== '') {
            year = year.substring(0, 4);
        }else{
            year = '2021'
        }
        let bookADD = {
            id: Math.random().toString().replace("0.", ""),
            name: inputs.controls.title.value,
            author_id: props.author_id,
            author_name: props.author_name,
            img: bookCover, //inputs.controls.image.value,
            description: inputs.controls.description,
            ISBN: 'test',
            publish_year: year,
            publisher: inputs.controls.publisher.value,
            page_count: '100',
            language: 'English',
            price: inputs.controls.price.value
        }
        console.log(bookADD);
        props.addBook([bookADD]);
        props.modalClose();
    }



    let form = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)} />

    ));

    return (
        <div className={classes.BFormContainer}>
            <div className={classes.BForm}>
                <div className={classes.BFormContent}>
                    <form>
                        {form}
                        <div className={classes.BFormContentButtons}>
                            <Button
                                disabled={!isformValid}
                                clicked={submitHandler}
                                btnType="Success">SAVE</Button>
                            <Button clicked={props.modalClose} btnType="Danger">CANCEL</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default BookForm;