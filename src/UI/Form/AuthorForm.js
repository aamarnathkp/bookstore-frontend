import React, { useState } from 'react';

import classes from './AuthorForm.module.css';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { checkValidity, updateObject } from '../../utility/utility';
import * as axios from '../../API/bsAxios';



const AuthorForm = props => {

    const [inputs, setInputs] = useState({
        controls: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'author name'
                },
                value: props.editAuthorDetails ? props.editAuthorDetails.name : '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 50
                },
                valid: props.editAuthorDetails ? true : false,
                touched: props.editAuthorDetails ? true : false
            },
            about: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'about'
                },
                value: props.editAuthorDetails ? props.editAuthorDetails.about : '',
                validation: {
                    required: true,
                    maxLength: 1000
                },
                valid: props.editAuthorDetails ? true : false,
                touched: props.editAuthorDetails ? true : false
            },
            image: {
                elementType: 'file',
                elementConfig: {
                    type: 'file',
                    placeholder: 'price',
                    accept: "image/*"
                },
                value: '',
                valid: true,
                touched: false
            }
        }
    });
    const [isformValid, setFormValidity] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);


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
        let authorData = {
            'name': inputs.controls.name.value,
            'about': inputs.controls.about.value
        }
        console.log(authorData);
        if (props.editAuthorDetails){
            editAuthor(authorData);
        }else{
            addAuthor(authorData);
        }
        

    }

    const addAuthor = (authorAddData) => {
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
                    axios.authorModifyApi(authorUuid, formData);
                }
            })
            .catch(error => {
                console.log(error)
            });
    }

    const editAuthor = (authorAddData) => {
        let authorUuid = props.editAuthorDetails.uuid;
        axios.authorModifyApi(authorUuid, authorAddData)
            .then(respose => {
                console.log(respose);
                props.editAuthor(!props.toggleAddAuthor);
                props.modalClose(false);
                if (selectedFile) {
                    const formData = new FormData();
                    formData.append('file', selectedFile);
                    axios.authorModifyApi(authorUuid, formData);
                }
            })
            .catch(error => {
                console.log(error)
            });
    }

    const onFileChange = event => {
        setSelectedFile(event.target.files[0]);

    };


    const formElementsArray = [];
    for (let key in inputs.controls) {
        formElementsArray.push({
            id: key,
            config: inputs.controls[key]
        })
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
            onChange={onFileChange}
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
                            <Button clicked={() => props.modalClose(false)} btnType="Danger">CANCEL</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default AuthorForm;