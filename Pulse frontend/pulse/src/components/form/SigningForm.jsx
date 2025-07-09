import { Logo } from "../Logo"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import * as Yup from 'yup';

export const SigningForm = ({text,inputs,extraText,bottomText,buttonText,onSubmit,redirect,validationSchema}) => {
    const [userData, setUserData] = useState(() => {
    const initialData = {};
    inputs.forEach(input => { initialData[input.id] = ''; });
    return initialData;
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [error, setError] = useState();
    const navigate = useNavigate()
    const handleInputChange = (e) => {
        const {id, value} = e.target;
        setUserData((prev) => ({
            ...prev,
            [id]: value
        }))
    }
    const handleSubmit = async () => {
    try {
        await validationSchema.validate(userData, { abortEarly: false });
        setValidationErrors({});

        const { success, token } = await onSubmit(userData);
        localStorage.setItem(`jwtToken`, token);
        setError(``);
        navigate(`/home`);
    } catch (error) {
        if (error instanceof Yup.ValidationError) {
        const errors = {};
        error.inner.forEach(err => {
            errors[err.path] = err.message;
        });
        setValidationErrors(errors);
        } else {
        setError(error.response?.data?.message || 'Unexpected error');
        }
    }
    };

    const renderInput = (input, index) => {
    return (
        <div className="full-width-div" key={index}>
        <input
            id={input.id}
            onChange={handleInputChange}
            className="sign-input"
            placeholder={input.placeholder}
            type={input.type}
            value={userData[input.id]}
        />
        {validationErrors[input.id] && (
            <p className="sign-error">{validationErrors[input.id]}</p>
        )}
        {input.type === 'password' && extraText && (
            <p className="small-text">{extraText}</p>
        )}
        </div>
    );
    };

    return (
        <div className="center-div">
            <div className="sign-container">
                <Logo className={`logo-container`}></Logo>
                <h2>{text}</h2>
                {inputs.map(renderInput)}
 
                <div className="full-width-div">
                <button onClick={() => {handleSubmit()}} className="sign-button"><b>{buttonText}&rarr;</b></button>
                <Link to={redirect}><p className="small-text">{bottomText}</p> </Link>

                </div>



            </div>
            
        </div>

    )
}