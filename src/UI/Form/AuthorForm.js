import React, { useState } from 'react';

import classes from './AuthorForm.module.css';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { checkValidity, updateObject } from '../../utility/utility';
import * as axios from '../../API/bsAxios';


const state = {
    controls: {
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'author name'
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
        about: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'about'
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
            // validation: {
            //     required: true,
            //     minLength: 1,
            //     maxLength: 5
            // },
            valid: true,
            touched: false
        }
    }
}


const AuthorForm = props => {

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
        // if (controlName === 'image') {
        //     updatedControls = updateObject(inputs.controls,
        //         {
        //             [controlName]: updateObject(inputs.controls[controlName],
        //                 {
        //                     value: event.target.files[0],
        //                     valid: true,
        //                     touched: true
        //                 })
        //         }
        //     )
        // } else {
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
        // }
        setInputs({ controls: updatedControls });
        let formStatus = true;
        for (let inputElement in updatedControls) {
            formStatus = updatedControls[inputElement].valid && formStatus;
        }
        setFormValidity(formStatus);
    }

    //const bookCover = require('../../images/art.jpeg');
    const submitHandler = (event) => {
        event.preventDefault();
        let authorAddData = {
            'name': inputs.controls.name.value,
            'about': inputs.controls.about.value
        }
        console.log(authorAddData);
        let authorUuid = null;
        axios.addAuthor(authorAddData)
            .then(respose => {
                console.log(respose);
                authorUuid = respose.data.uuid;
                props.addAuthor(!props.toggleAddAuthor);
                props.modalClose(false);
                if (authorUuid && selectedFile) {
                    const formData = new FormData();
                    formData.append('file', selectedFile);
                    axios.uploadApi(authorUuid, formData);
                }
            })
            .catch(error => {
                console.log(error)
            });
    }

    const onFileChange = event => {
        setSelectedFile(event.target.files[0]);

    };

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

export default AuthorForm;