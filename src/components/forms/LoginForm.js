import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FormMessage from "./FormMessage";
import {AppContext} from "../App";
import { store, get } from "../../utils";
/*
TODO:
  Элементы поля - email, password, button OK, button Cancel
*/
const initialData = {
    email: "",
    password: "",
};

class LoginForm extends Component {
    static contextType = AppContext;
    state = {
        data: initialData,
        errors: {},
    };


    handleSubmit = e => {
        e.preventDefault();
        const { errors, data }= this.state;
        if(Object.keys(errors).length!==0){
            this.setState({
                errors : {
                    btn:" negative ",
                    ...errors
                },
                submit:true
            })
        } else {
            let {  btn, ...allOther} = errors;

            Object.keys(data).map((item,ind)=>{
                    store(item, data[item]);
                return item
            });

            this.setState({
                errors : {...allOther},
                submit:true
            })
        }

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
                    this.setState({errors: {...this.state.errors,[name]:`your ${name} is not matching our conditions`}})
                } else {
                    let { email,...errors } =this.state.errors;
                        //{store,reqEmail}= this.context,
                      //  flag = async () => await reqEmail(value);
                    /*
                     this.setState((flag()? {...errors}:{errors: {[name]:`your ${name} is not matching our conditions`}}));

                          if(errors[name]){ store(name,value)};
                    */
                  /*
                    flag()?store(name,value)
                        :this.setState({errors: {...errors ,[name]:`There is no user with email like ${value}`}});
                */
                    store(name,value);
                    this.setState({errors: {...errors}});
                };
                break;
            case "password":
                if(!value.match(/^[0-9a-z]/i)||value.length<=9||value.length>16){
                    let {errors} =this.state;
                    this.setState({errors: {...errors ,[name]:`your ${name} is not matching our conditions`}})
                } else {
                    let {password,...errorsNew } =this.state.errors;
                    this.setState({errors: {...errorsNew}});
                }
                break;

        }
    };

    handleClearForm = () => this.setState({
        data: initialData,
        errors: {}
    });


    render() {
        let {
            errors,
            data,
            submit
        } = this.state;
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

                    </div>
                    {/* END twelve*/}
                </div>
                {/* END ui grid   */}

                <div className="ui fluid buttons">
                    <button  className={` ${submit?errors.btn?errors.btn:"positive":"primary"} ui button `} type="submit">
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

LoginForm.propTypes = {};

export default LoginForm;