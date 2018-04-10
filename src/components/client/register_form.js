import React from "react";
import {Field, Form} from "react-final-form";

const RegisterClientComponent = (props) => {
    const onSubmit = (data) => {
        props.processSubmit(data);
    };

    return(
        <Form
            onSubmit={onSubmit}
            render={({handleSubmit, submitting}) => (
                <form onSubmit={handleSubmit}>
                    <Field
                        name="client_name"
                        component="input"
                        type="text"
                        placeholder="Client Name"
                    />
                    <button type="submit" disabled={submitting}>Submit</button>
                </form>
            )}
        />
    )
};

export const RegisterClientForm = RegisterClientComponent;