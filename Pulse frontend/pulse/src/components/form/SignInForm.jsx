import { SigningForm } from "./SigningForm"
import apiFetcher from "../../assets/apiFetcher"
import * as Yup from 'yup';
export const SignInForm = () => {

    const validationSchema = Yup.object().shape({
    password: Yup.string().min(6, 'Password be at least 6 characters long').required('Password is required'),
    username: Yup.string().min(6, 'Username be at least 6 characters long').required('Username is required'),
    });

    const inputs = [
        {type: `text`, placeholder: `Username or e-mail`, id: `username`},
        {type: `password`, placeholder: `Password`, id: `password`}
    ]

    const signIn = async (userData) => {
        try {
        const {success, token} = await apiFetcher.signIn(userData);

        return {success: success, token: token}
        

        }catch(error) {
          throw error

        }

    }

    return (
        <>
            <SigningForm
            buttonText={`Sign In`}
            bottomText={`Don't have account?`} 
            inputs={inputs}
            extraText={`Forgot your password?`} 
            text={`Sign in to Pulse`}
            onSubmit={signIn}
            redirect={`/signup`}
            validationSchema={validationSchema}
            >
            </SigningForm>
        </>


    )
}