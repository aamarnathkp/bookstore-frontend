import React, { useState } from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import { Redirect } from 'react-router-dom';

import classes from './LoginPage.module.css';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { checkValidity, updateObject } from '../../utility/utility';
import * as axios from '../../API/bsAxios';



// const useLoginRequest = (authentication) => {
//     useEffect(() => {
//         console.log('inside useEffect')
//         axios.loginApi(email, password)
//             .then(response => {
//                 console.log(response);
//                 const sessionId = response.data.session_id;
//                 const role = response.data.role;
//                 const user = response.data.user;
//                 const userId = response.data.user_id;
//                 document.cookie = `bs_cookie=${sessionId}`;
//                 localStorage.setItem('role', role);
//                 localStorage.setItem('user', user);
//                 localStorage.setItem('userId', userId);
//                 return {
//                     success: true,
//                     error: null
//                 };
//             })
//             .catch((error) => {
//                 console.log(error);
//                 return {
//                     success: false,
//                     error: error.response.data.reason
//                 };
//             })
//     }, [email, password]);
// }


const LoginPage = props => {

    const [controls, setControls] = useState({
        email: {
            elementType: 'username',
            elementConfig: {
                type: 'email',
                placeholder: 'email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'password',
            elementConfig: {
                type: 'password',
                placeholder: 'password'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }

    });
    // const [loginAttempt, setLoginAttempt] = useState(false);
    const [loginStatus, setLoginStatus] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);


    // let apiResponse = useLoginRequest(controls.email.value, controls.password.value);
    const submitHandler = (event) => {
        event.preventDefault();
        // const {success, error} = useLoginRequest(controls.email.value, controls.password.value);
        // const { success, error } = apiResponse;

        axios.loginApi(controls.email.value, controls.password.value)
            .then(response => {
                console.log(response);
                const sessionId = response.data.session_id;
                const role = response.data.role;
                const user = response.data.user;
                const userId = response.data.user_id;
                document.cookie = `bs_cookie=${sessionId}`;
                localStorage.setItem('role', role);
                localStorage.setItem('user', user);
                localStorage.setItem('userId', userId);
                setLoginStatus(true);
            })
            .catch((error) => {
                console.log(error);
                setErrorMsg(error.response.data.reason);
            })
    }



    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(controls,
            {
                [controlName]: updateObject(controls[controlName],
                    {
                        value: event.target.value,
                        valid: checkValidity(event.target.value, controls[controlName].validation),
                        touched: true
                    })
            }
        )
        setControls(updatedControls);
    }

    const inputCancelHandler = (event) => {
        event.preventDefault();
        const controlsU = { ...controls };
        for (let controlName in controls) {
            controlsU[controlName] = {
                ...controls[controlName],
                value: '',
                valid: false,
                touched: false
            }
        }
        setControls(controlsU);
    }

    const formElementsArray = [];
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        })
    }

    // console.log("test one");

   // let userId = localStorage.getItem('userId');
    let authRedirect = null;
    if (loginStatus) {
        console.log('succes login');
        authRedirect = <Redirect to={'/home'} />
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
        <div className={classes.Login}>
            <div
                onClick={props.onClose}
                className={classes.CloseIcon}>
                <CancelIcon />
            </div>
            <h2>BS LOGIN</h2>
            {authRedirect}
            {errorMsg}
            <form>
                {form}
                <Button clicked={submitHandler} btnType="Success">LOGIN</Button>
                <Button clicked={inputCancelHandler} btnType="Danger">CANCEL</Button>
            </form>

        </div>
    );
};



export default LoginPage;