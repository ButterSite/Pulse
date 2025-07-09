import { SigningForm } from "./SigningForm"
import apiFetcher from "../../assets/apiFetcher"
    import * as Yup from 'yup';
export const SignUpForm = () => {

    const signUp = async (userData) => {
        try {
        const {success, token} = await apiFetcher.signUp(userData);
        
        return {success: success, token: token}

        }catch(error) {
            throw error
        }

    }


    const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Please enter a valid email address')
        .required('Email is required'),

    firstName: Yup.string()
        .min(2, 'First name must be at least 2 characters')
        .max(30, 'First name must be at most 30 characters')
        .required('First name is required'),

    lastName: Yup.string()
        .min(2, 'Last name must be at least 2 characters')
        .max(30, 'Last name must be at most 30 characters')
        .required('Last name is required'),

    username: Yup.string()
        .min(4, 'Username must be at least 4 characters')
        .max(20, 'Username must be at most 20 characters')
        .required('Username is required'),

    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),

    'repeat-password': Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm your password'),
    });


    const inputs = [
        {type: `text`, placeholder: `E-mail`, id: `email`},
        {type: `text`, placeholder: `First name`, id: `firstName`},
        {type: `text`, placeholder: `Last name`,id: `lastName`},
        {type: `text`, placeholder: `Username`, id: `username`},
        {type: `password`, placeholder: `Password`, id: `password`},
        {type: `password`, placeholder: `Repeat password`, id: `repeat-password`}
    ]
    return (
        <>
            <SigningForm
            buttonText={`Sign Up`}
            bottomText={`Have an account?`} 
            inputs={inputs}
            text={`Sign up to Pulse`}
            onSubmit={signUp}
            redirect={`/login`}
            validationSchema={validationSchema}
            >
            </SigningForm>
        </>


    )
}