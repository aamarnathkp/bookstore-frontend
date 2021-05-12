import React, { useState } from 'react';

import classes from './AddBookForm.module.css';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { checkValidity, updateObject } from '../../utility/utility';
import * as axios from '../../API/bsAxios';


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
                maxLength: 1000
            },
            valid: false,
            touched: false
        },
        image: {
            elementType: 'file',
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
        author: {
            elementType: 'select',
            elementConfig: {
                type: 'text',
                placeholder: 'publisher'
            },
            value: '',
            validation: {
                required: false
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


const AddBookForm = props => {

    const [inputs, setInputs] = useState(state);
    const [isformValid, setFormValidity] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const formElementsArray = [];
    for (let key in inputs.controls) {
        formElementsArray.push({
            id: key,
            config: inputs.controls[key]
        })
    }

    
    const inputChangedHandler = (event, controlName) => {
        let updatedControls = null;

        updatedControls = updateObject(inputs.controls,
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


    const submitHandler = (event) => {
        event.preventDefault();
 

        let year = inputs.controls.publishDate.value;
        if (year !== '') {
            year = year.substring(0, 4);
        }else{
            year = '2021'
        }
        let bookADD = {
            name: inputs.controls.title.value,
            author_uuid: inputs.controls.author.value,
            description: inputs.controls.description.value,
            published_year: year,
            publisher: inputs.controls.publisher.value,
            page_count: '100',
            language: 'English',
            price: inputs.controls.price.value
        }
        console.log(bookADD);



        let bookUuid = null;
        axios.addBook(bookADD)
            .then(respose => {
                console.log(respose);
                bookUuid = respose.data.uuid;
                props.addBook(!props.toggleAddBook);
                props.modalClose(false);
                if (bookUuid && selectedFile) {
                const formData = new FormData();
                formData.append('file', selectedFile);
                axios.bookModifyApi(bookUuid, formData);
                }
            })
            .catch(error => {
                console.log(error)
            });
    }


    const onFileChange = event => {
        setSelectedFile(event.target.files[0]);

    };

    let authorOptions = [];
    // console.log(props.authors);
    authorOptions = props.authors.map(author => (
        {
            value : author.uuid,
            displayValue : author.name
        }
     )
    )

    let form = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            onChange={onFileChange}
            options={authorOptions}
            changed={(event) => inputChangedHandler(event, formElement.id)} />

    ));



    return (
        <div className={classes.BFormContainer}>
            <div className={classes.BForm}>
                <div className={classes.BFormContent}>
                    <form>
                        {form}
                        {/* <input type="file" onChange={onFileChange} /> */}
                        <div className={classes.BFormContentButtons}>
                            <Button
                                disabled={!isformValid}
                                clicked={submitHandler}
                                btnType="Success">SAVE</Button>
                            <Button clicked={() => props.modalClose(false)} btnType="Danger">CANCEL</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default AddBookForm;