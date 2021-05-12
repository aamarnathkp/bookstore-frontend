import { login } from '../Data/Data';

export const authValidate = (email, pass) => {
    console.log('email ', email, pass);
    console.log(login);
    let result = login.find(({ username, password}) => {
        return (username === email && password === pass);
    });
    console.log('result == ', result);
    return result;
}
