import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FormMessage from "./FormMessage";

/*
TODO:
  Элементы поля - email, password, cofirm_password, button OK, button Cancel
*/

const initialData = {
    email: "",
    password: "",
    confirmPass: ""
};

class RegistrationForm extends Component {
    state = {
        data: initialData,
        errors: {},
    };

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state.data)
    };

    handleStringChange = ({target})=>{
        const {name,value} =  target;
        this.validateData(name,value);
        this.setState({data: {...this.state.data, [name]: value}});
    };

    validateData = (name,value)=>{
        switch (name) {
            case "email":
                if(!value.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{3,}$/i)){
                    this.setState({errors: {[name]:`your ${name} is not matching our conditions`}})
                } else {
                    let {...errors, email } =this.state.errors;
                    this.setState({errors});
                }
                break;
            case "password":
                if(!value.match(/^[0-9a-z]/i)&&value.length<9&&value.length>=16){
                    this.setState({errors: {[name]:`your ${name} is not matching our conditions`}})
                } else {
                    let {...errors, password } =this.state.errors;
                    this.setState({errors});
                }

                break;
            case "confirmPass":
                if(value !== this.state.data[name]){
                    this.setState({
                        errors: {
                            ...this.state.errors,
                            confirmPass:"this password is not matching text in previous field"
                        }
                    })
                } else {
                    let {...errors, confirmPass } =this.state.errors;
                    this.setState({errors});
                }
                break;
        }
    };

    handleClearForm = () => this.setState({
        data: initialData,
        errors: {}
    });


    render() {
        const {data, errors} = this.state;
        return (
            <form className="ui form" onSubmit={this.handleSubmit}>
                <div className="ui  grid">
                    <div className="twelve wide column">
                        <div className={errors.email ? "field error" : "field"}>
                            <label>E-mail</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="your_mail@gmail.com"
                                value={data.email}
                                onChange={this.handleStringChange}
                            />
                            <FormMessage>{errors.email}</FormMessage>
                        </div>

                        <div className={errors.password ? "field error" : "field"}>
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="enter your password "
                                value={data.password}
                                onChange={this.handleStringChange}
                            />
                            <FormMessage>{errors.password}</FormMessage>
                        </div>

                        <div className={errors.confirmPass ? "field error" : "field"}>
                            <label>Confirm password</label>
                            <input
                                type="password"
                                name="confirmPass"
                                placeholder="confirm your password"
                                value={data.confirmPass}
                                onChange={this.handleStringChange}
                            />
                            <FormMessage>{errors.confirmPass}</FormMessage>
                        </div>


                    </div>
                    {/* END twelve*/}
                </div>
                {/* END ui grid   */}

                <div className="ui fluid buttons">
                    <button className="ui button primary" type="submit">
                        Ok
                    </button>
                    <div className="or" />
                    <button onClick={this.handleClearForm} className="ui button primary" type="button">
                        Cancel
                    </button>

                </div>
            </form>
        );
    }
}

RegistrationForm.propTypes = {};

export default RegistrationForm;