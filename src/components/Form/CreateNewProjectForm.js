import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function CreateNewProjectForm() {
    const [project, setProject] = useState({
        "project_title": "",
        "project_description": ""
    })
    async function postProject() {
        try {
            const token = localStorage.getItem('userToken')
            const res = await axios.post('http://127.0.0.1:8000/project/', project, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            console.log(res);
            if (res.status === 201) {
                alert("Project Created")
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>

            <Form className='d-flex justify-content-center flex-column m-0 p-0'>
                <div>
                    <Form.Group className="m-3" controlId="formBasicEmail">
                        <Form.Label>Project Title</Form.Label>
                        <Form.Control type="text" placeholder="Project Title" onChange={(e) => setProject({
                            ...project, project_title: e.target.value
                        })} />
                    </Form.Group>
                </div>
                <div>
                    <Form.Group className="m-3" controlId="formBasicEmail">
                        <Form.Label>Project Description</Form.Label>
                        <Form.Control type="text" placeholder="Project Description" onChange={(e) => setProject({
                            ...project, project_description: e.target.value
                        })} />
                    </Form.Group>
                </div>

            </Form>
            <Button className='ms-3' variant="success" type="submit" onClick={postProject}>
                Create New Project
            </Button>
        </>
    )
}
