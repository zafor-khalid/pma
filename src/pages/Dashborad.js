import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PageLayout from '../components/Layout/Layout';

const Dashborad = () => {

    const [newTask, setNewTask] = useState({
        task: '',
        task_type: '',
        task_deadline: '',
        project_title: '',
        developer: null,
        task_status: ''
    })
    const [tasks, setTasks] = useState([])

    const { id } = useParams()
    useEffect(() => {
        setNewTask({ ...newTask, project_title: id })
    }, [])

    const [developers, setDevelopers] = useState([])

    useEffect(() => {
        loadAllDevelopers()

    }, [])

    const loadAllDevelopers = async () => {
        try {
            const token = localStorage.getItem('userToken')
            const res = await axios.get('http://127.0.0.1:8000/user', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            // console.log(res)
            if (res.status === 200) {
                setDevelopers(res.data)
            }
        } catch (error) {

        }
    }

    const postTask = async () => {
        const token = localStorage.getItem('userToken')
        // console.log(newTask);
        try {
            const res = await axios.post(`http://127.0.0.1:8000/task/?project_id=${id}`, newTask, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            // console.log(res)

            if (res.status === 201) {
                alert('Task created!')
                setNewTask({
                    task: '',
                    task_type: '',
                    task_deadline: '',
                    project_title: null,
                    developer: null,
                    task_status: ''
                })
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getTask()
    }, [id])

    const getTask = async () => {
        const token = localStorage.getItem('userToken')
        // console.log(token);
        const pid = parseInt(id)
        // console.log(`http://127.0.0.1:8000/task/?project_id=${pid}/`);
        try {
            const res = await axios.get(`http://127.0.0.1:8000/task/?project_id=${pid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            // console.log(res)

            if (res.status === 200) {
                const tempArr = []
                res.data.map(t =>
                    tempArr.push(t)
                )
                setTasks(tempArr)

            }
        } catch (error) {

        }
    }



    const updateTask = async (task_status, task) => {
        // console.log(task_status, task)
        const token = localStorage.getItem('userToken')
        // console.log(token);
        // const pid = parseInt(id)
        const tid = parseInt(task.id)
        try {
            const res = await axios.put(`http://127.0.0.1:8000/task/${tid}/`, { ...task, task_status: task_status }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            // console.log(res)

            if (res.status === 200) {
                alert('Task updated!')
                getTask()
            }
        } catch (error) {

        }
    }



    // console.log(newTask)

    return (
        <PageLayout>

            <div className='w-100 pe-5 '>
                <div className='px-2 py-5 bg-light rounded'>
                    <h5 className='ms-3'>Create A New Task</h5>
                    <Form className='d-flex m-0 p-0'>
                        <Form.Group className="m-3" controlId="formBasicEmail">
                            <Form.Label>Task</Form.Label>
                            <Form.Control type="text" placeholder="Task name" onChange={(e) => setNewTask({ ...newTask, task: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="m-3" >
                            <Form.Label>Deadline</Form.Label>
                            <Form.Control type="date" onChange={(e) => setNewTask({ ...newTask, task_deadline: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="m-3" >
                            <Form.Label>Developer</Form.Label><br />
                            <Form.Select aria-label="Default select example" onChange={(e) => setNewTask({ ...newTask, developer: e.target.value })}>

                                {developers.length > 0 && developers.map((d, idx) => <option value={d?.id}>{d?.username}</option>)}


                            </Form.Select>

                        </Form.Group>

                        <Form.Group className="m-3" controlId="formBasicPassword">
                            <Form.Label>Task Type</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={(e) => {
                                setNewTask({ ...newTask, task_type: e.target.value })
                                // console.log(e)
                            }
                            }>
                                <option value="Bug">Bug</option>
                                <option value="Design">Design</option>
                                <option value="Design">Development</option>
                            </Form.Select>                      </Form.Group>


                        <Form.Group className="m-3" controlId="formBasicPassword">
                            <Form.Label>Status</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={(e) => setNewTask({ ...newTask, task_status: e.target.value })}>
                                <option value="
                                On going">On going</option>
                                <option value="Todo">Todo</option>
                                <option value="Finished">Finished</option>
                            </Form.Select>                      </Form.Group>


                    </Form>
                    <Button className='ms-3' variant="success" type="submit" onClick={() => postTask()}>
                        Submit
                    </Button>
                </div>
                {tasks.length > 0 && tasks.map((task, idx) =>
                    <div key={idx} className='bg-light justify-content-between align-items-center w-100' style={{ display: 'flex', padding: '1rem', margin: '.5rem' }}>
                        <h4 className='mx-2'>{task?.task}</h4>
                        <h4 className='mx-2'>{task?.developer}</h4>
                        {/* <h4 className='mx-2'>{task?.project_title}</h4> */}
                        <h4 className='mx-2'>{task?.task_type}</h4>

                        <Form.Select aria-label="Default select example"
                            onChange={(e) => updateTask(e.target.value, task)}
                        >
                            <option value="To Do" selected={task.task_status === 'To Do'} >To Do</option>
                            <option value="On Going" selected={task.task_status === 'On Going'}  >On Going</option>
                            <option value="Finished" selected={task.task_status === 'Finished'}  >Finished</option>
                        </Form.Select>
                        {/* // <Dropdown align='start'>
                    //     <Dropdown.Toggle variant="success" id="dropdown-basic">
                    //         Status
                    //     </Dropdown.Toggle>

                    //     <Dropdown.Menu>
                    //         <Dropdown.Item href="#/action-1">To Do</Dropdown.Item>
                    //         <Dropdown.Item href="#/action-2">On Going</Dropdown.Item>
                    //         <Dropdown.Item href="#/action-3">Finished</Dropdown.Item>
                    //     </Dropdown.Menu>
                    // </Dropdown> */}
                    </div>)}


            </div>

        </PageLayout >
    );
}


export default Dashborad;