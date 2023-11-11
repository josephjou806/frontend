import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";


function Login(props){

    const [name, setName] = useState("");
    const [id, setId] = useState("");

    const onChangeName = e => {
        const name = e.target.value;
        setName(name);
    }
    
    const onChangeId = e => {
        const id = e.target.value;
        setId(id);
    }

    const login = () => {
        props.login({name:name, id:id});
        props.history.push('/');
        
    }

    return (
        <div className = "App">
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>User Name</Form.Label>
                <Form.Control type="text" placeholder="Enter username" value={name} onChange={onChangeName}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" placeholder="Enter id" value={id} onChange={onChangeId}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={login}>
                Submit
            </Button>
            </Form>
        </div>
    );
}

export default Login;