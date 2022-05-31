import {useState, useContext} from 'react';
import { UserContext } from '../../contexts/user.context';
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.style.scss';

import { signInWithGooglePopup,createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

const defaultformFields = {
    email: '',
    password: ''
}

const SignInForm = () =>{

    const [formFields, setFormFields] = useState(defaultformFields);
    const {email, password} = formFields;
    const {setCurrentUser} = useContext(UserContext);
    // console.log(formFields);

    const resetFormFields = () =>{
        setFormFields(defaultformFields);
    };
    
    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };
    const handleSubmit = async (event) =>{
        event.preventDefault();

        try{

            const {user} = await signInAuthUserWithEmailAndPassword(email,password);
            setCurrentUser(user);
            resetFormFields();

            // console.log(user);
        }catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert('incorrect password or email');
                    break;
                case 'auth/user-not-found':
                    alert('no user found');
                    break;
                default:
                    console.log(error);
            }
        }

    }

    const handleChange = (event) => {

        const {name, value} = event.target;

        setFormFields({...formFields,[name]:value});

    };

    
    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}></FormInput>
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}></FormInput>
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType='google' onClick={signInWithGoogle} >Google Sign In</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;