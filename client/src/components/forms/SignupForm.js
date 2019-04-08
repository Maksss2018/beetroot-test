import React, {useState} from "react"
import {Link} from "react-router-dom"
import isEmail from "validator/lib/isEmail"
import FormMessage from "./FormMessage"

const initialData = {
    email: "",
    password: "",
    passwordConfirmation: "",
};

const SignupForm = ({submit}) => {
    let [data, setData] = useState(initialData),
        [errors, setErrors] = useState({}),
        [loading, setLoading] = useState(false);
    const cls = loading ? "ui form loading" : "ui form";
    const handleChange = e => {
            setData({...data, [e.target.name]: e.target.value});
            setErrors({...errors, [e.target.name]: ""});
        },

        handleSubmit = e => {
            e.preventDefault();
            const errors = validate(data);
            setErrors(errors);
            if (Object.keys(errors).length === 0) {
                setLoading(true);
                submit(data).catch(error => {
                    setErrors(error.response.data.errors);
                    setLoading(false);
                })
            }
        };

    const validate = (data) => {
        const errors = {};
        if (!isEmail(data.email)) errors.email = "Invalid email";
        if (!data.email) errors.email = "Email cannot be blank";
        if (!data.password) errors.password = "Password cannot be blank";
        if (!data.passwordConfirmation)
            errors.passwordConfirmation = "Password confirmation cannot be blank";
        return errors
    };

    return (
        <form className={cls} onSubmit={handleSubmit}>
            <div className={errors.email ? "error field" : "field"}>
                <label>Email</label>
                <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={handleChange}
                />
                <FormMessage>{errors.email}</FormMessage>
            </div>

            <div className={errors.password ? "error field" : "field"}>
                <label>Password</label>
                <input
                    type="text"
                    name="password"
                    id="password"
                    placeholder="password"
                    value={data.password}
                    onChange={handleChange}
                />
                <FormMessage>{errors.password}</FormMessage>
            </div>

            <div className={errors.passwordConfirmation ? "error field" : "field"}>
                <label>Password Confirmation</label>
                <input
                    type="text"
                    name="passwordConfirmation"
                    id="passwordConfirmation"
                    placeholder="password confirmation"
                    value={data.passwordConfirmation}
                    onChange={handleChange}
                />
                <FormMessage>{errors.passwordConfirmation}</FormMessage>
            </div>

            <div className="ui fluid buttons">
                <button className="ui button primary">Sing Up</button>

                <div className="or"/>

                <Link to="/" className="ui button">
                    Cancel
                </Link>
            </div>
        </form>
    )

};

export default SignupForm
