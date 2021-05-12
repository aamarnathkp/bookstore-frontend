import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Login.module.css';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { checkValidity, updateObject } from '../../utility/utility';
import * as actions from '../../store/actions/index';


class Login extends Component {
    state = {
        controls: {
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
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls,
            {
                [controlName]: updateObject(this.state.controls[controlName],
                    {
                        value: event.target.value,
                        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                        touched: true
                    })
            }
        )
        this.setState({ controls: updatedControls });
    }

    inputCancelHandler = (event) => {
        event.preventDefault();
        const controls = { ...this.state.controls };
        for (let controlName in this.state.controls) {
            controls[controlName] = {
                ...this.state.controls[controlName],
                value: '',
                valid: false,
                touched: false
            }
        }
        this.setState({ controls: controls });
    }


    render() {

        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        console.log("test one");
        let authRedirect = null;
        let userId = localStorage.getItem('userId');
        console.log(userId);
        //if (this.props.login && !this.props.logout) {
        if (userId) {
            console.log('succes login');
            // authRedirect = <Redirect to={this.props.authRedirectPath} />
            authRedirect = <Redirect to={'/home'} />
        }
        // } else {
        //     console.log('login to access!')
        //     authRedirect = <Redirect to='/' />
        // }
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = this.props.error
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
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />

        ));

        return (
            <div className={classes.Login}>
                <h2>BS LOGIN</h2>
                {authRedirect}
                {errorMessage}
                <form>
                    {form}
                    <Button clicked={this.submitHandler} btnType="Success">LOGIN</Button>
                    <Button clicked={this.inputCancelHandler} btnType="Danger">CANCEL</Button>
                </form>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        login: state.login.login,
        authRedirectPath: state.login.authRedirectPath,
        error: state.login.error,
        logout: state.login.logout
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);