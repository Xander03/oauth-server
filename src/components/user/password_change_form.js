import React from "react";
import {Field, Form} from "react-final-form";

const PasswordChangeComponent = (props) => {
    const onSubmit = (data) => {
        props.processSubmit(data);
    };

    return(
        <Form
            onSubmit={onSubmit}
            render={({handleSubmit, submitting}) => (
                <form onSubmit={handleSubmit}>
                    <Field
                        name="password"
                        component="input"
                        type="password"
                        placeholder="Password"
                    />
                    <Field
                        name="new_password"
                        component="input"
                        type="password"
                        placeholder="New Password"
                    />
                    <button type="submit">Submit</button>
                </form>
            )}
        />
    )
};

export const PasswordChangeForm = PasswordChangeComponent;