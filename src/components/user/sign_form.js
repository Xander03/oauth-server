import React from "react";
import {Field, Form} from "react-final-form";

const Sign = (props) => {
    const onSubmit = (data) => {
        props.processSubmit(data);
    };

    return(
        <Form
            onSubmit={onSubmit}
            render={({handleSubmit, submitting}) => (
                <form onSubmit={handleSubmit}>
                    <Field
                        name="login"
                        component="input"
                        type="text"
                        placeholder="Login"
                    />
                    <Field
                        name="password"
                        component="input"
                        type="password"
                        placeholder="Password"
                    />
                    <button type="submit" disabled={submitting}>
                        Submit
                    </button>
                </form>
            )}
        />
    );
};

export const SignForm = Sign;