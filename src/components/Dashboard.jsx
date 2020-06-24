
import React, {useState, useEffect} from 'react';

import axiosWithAuth from '../utils/axiosWithAuth'; 
import TaskList from './TaskList'; 
import { TaskContext } from '../contexts/TaskContext'; 
import TaskForm from '../components/TaskForm'; 

const Dashboard = () => {


const [taskList, setTaskList] = useState([])
const [refresh, setRefresh] = useState(true)

useEffect(() => {
    axiosWithAuth()
    .get('/api/tasks')
    .then(res => {
        console.log(res);
        setTaskList(res.data); 
    })
    .catch(err => {
        console.log(err); 
    })
    .finally(setRefresh(false))
}, [refresh])

    return (
        <>
        <h1>Your Tasks</h1>
        <TaskContext.Provider value={{ taskList, setRefresh }} >
         <TaskList />
        </TaskContext.Provider>

        <TaskContext.Provider value={{ setRefresh }}>
        <TaskForm />
        </TaskContext.Provider>
        </>
    );
};

export default Dashboard;
