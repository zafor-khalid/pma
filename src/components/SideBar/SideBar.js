import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const [allProjects, setAllProjects] = useState([])

    useEffect(() => {
        loadAllProjects()
    }, [])

    const loadAllProjects = async () => {

        const token = localStorage.getItem('userToken')
        // console.log(token)
        try {
            const res = await axios.get('http://127.0.0.1:8000/project/', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            // console.log(res)
            if (res.status === 200) {
                setAllProjects(res.data)
            }
        } catch (error) {

        }

    }
    // console.log(allProjects)


    return (
        <div className='col-md-3'>
            <ul className='list-group sticky-top  py-2'>

                {allProjects.length > 0 && allProjects.map((p, idx) => <NavLink key={idx} as='li' className='list-group-item' to={`/dashboard/${p?.id}`} exact >
                    {p?.project_title}
                </NavLink>)}

            </ul>
        </div >
    );
};

export default Sidebar;