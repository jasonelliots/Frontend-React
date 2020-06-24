import React from "react";
import Button from "../stylingComponents/Button";
import LoginFormStyling from "../stylingComponents/LoginFormStyling";


export default function Login(props) {
    const {
        values,
        onSubmit,
        onInputChange,
        disabled,
        errors,
    } = props

    return (
        <LoginFormStyling className="form-horizontal" onSubmit={onSubmit}>
            <div className="errors">
                <div>{errors.username}</div>
                <div>{errors.password}</div>
            </div>

            <div className="form-group">
                <label className="control-label col-sm-2" for="username">Username:</label>
                <div className="col-sm-5">
                    <input type="text" className="form-control" id="username" placeholder="Enter username" value={values.username} name="username" onChange={onInputChange}/>
                </div>
              
            </div>
            <div className="form-group">
                <label className="control-label col-sm-2" for="pwd">Password:</label>
                <div className="col-sm-5">
                    <input type="password" class="form-control" id="pwd" placeholder="Enter password" value={values.password} name="password" onChange={onInputChange}
                    />
                </div>
            </div>
            <div className="form-group">
                <div className="col-sm-offset-2 col-sm-5">
                    <Button type="submit" className="btn btn-default" disabled={disabled}>Sign In</Button>
                </div>
            </div>
        </LoginFormStyling>
    )
}