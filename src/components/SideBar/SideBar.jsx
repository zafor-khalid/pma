import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../contex/AuthContext'

const Sidebar = () => {
  const [allProjects, setAllProjects] = useState([])
  const [tasks, setTasks] = useState([])
  const [projectsForDeveloper, setProjectForDeveloper] = useState([])

  const auth = useAuth()

  useEffect(() => {
    loadAllProjects()
  }, [])

  const loadAllProjects = async () => {
    const token = localStorage.getItem('userToken')
    try {
      const res = await axios.get('http://127.0.0.1:8000/project/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.status === 200) {
        setAllProjects(res.data)

        if (!auth?.currentUserInfo?.is_superuser) {
          setTimeout(() => loadTaskForDeveloper(), 1000)
        }
      }
    } catch (error) {}
  }

  const loadTaskForDeveloper = async () => {
    let id = localStorage.getItem('id')

    try {
      const res = await axios.get(`http://127.0.0.1:8000/task/?developer=${id}`)

      if (res.status === 200) {
        setTasks(res?.data)
        if (!auth?.currentUserInfo?.is_superuser) {
          filterProjectForDeveloper(res?.data)
        }
      }
    } catch (error) {}
  }

  const filterProjectForDeveloper = (tasks) => {
    let tempArr = []
    for (let i = 0; i < tasks.length; i++) {
      let project = allProjects.find((f) => f?.id === tasks[i]?.project_title)
      tempArr.push(project)

      if (i === tasks.length - 1) {
        setProjectForDeveloper(tempArr)
      }
    }
  }

  return (
    <div className=''>
      <ul className='list-group sticky-top  py-2'>
        {auth?.currentUserInfo?.is_superuser
          ? allProjects.length > 0 &&
            allProjects.map((p, idx) => (
              <NavLink
                key={idx}
                as='li'
                className='list-group-item'
                to={`/dashboard/${p?.id}`}
                exact
              >
                {p?.project_title}
              </NavLink>
            ))
          : projectsForDeveloper.map((p, idx) => (
              <NavLink
                key={idx}
                as='li'
                className='list-group-item'
                to={`/dashboard/${p?.id}`}
                exact
              >
                {p?.project_title}
              </NavLink>
            ))}
      </ul>
    </div>
  )
}

export default Sidebar
