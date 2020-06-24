import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Modal from "react-modal";
import axiosWithAuth from '../utils/axiosWithAuth'; 
import { TaskContext } from '../contexts/TaskContext'; 

function TaskForm() {

    const { setRefresh } = useContext(TaskContext);

    const [formState, setFormState] = useState({
        name: "",
        endOn: null,
        isRepeated: false,
        days: null,
    });

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [post, setPost] = useState([]);

    const inputChange = (e) => {
        e.persist();
        const newFormData = {
            ...formState,
            [e.target.name]:
                e.target.type === "checkbox"
                    ? e.target.checked
                    : e.target.value,
        };

        setFormState(newFormData);
    };

    const formSubmit = (e) => {
        e.preventDefault();
        console.log(formState); 
        axiosWithAuth()
            .post("/api/tasks", formState)
            .then((res) => {
                setPost(res.data); // get just the form data from the REST api
                console.log("success", post);
                // reset form if successful
                setFormState({
                    name: "",
                    endOn: "",
                    isRepeated: false,
                    days: null,
                });
                setModalIsOpen(false);
                setRefresh(true); 
            })
            .catch((err) => {console.log(err.response); console.log(formState)});
    };

    return (
        <div className='TaskForm'>
            <button onClick={() => setModalIsOpen(true)}>Create Task</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                shouldCloseOnOverlayClick={false}
            >
                <form onSubmit={formSubmit}>
                    <label htmlFor='name'>
                        Task Name
                        <input
                            type='text'
                            name='name'
                            value={formState.name}
                            onChange={inputChange}
                        />
                    </label>
                    <label htmlFor='isRepeated'>
                        Repeated
                        <input
                            type='checkbox'
                            name='isRepeated'
                            value={formState.isRepeated}
                            onChange={inputChange}
                        />
                    </label>
                    <label htmlFor='days'>
                        <select name='days' id='days' onChange={inputChange}>
                            <option value='0'>Sundays</option>
                            <option value='1'>Mondays</option>
                            <option value='2'>Tuesdays</option>
                            <option value='3'>Wednesdays</option>
                            <option value='4'>Thursdays</option>
                            <option value='5'>Fridays</option>
                            <option value='6'>Saturdays</option>
                        </select>
                    </label>

                    <label htmlFor='endOn'>
                        Due Date
                        <input
                            type='date'
                            name='endOn'
                            value={formState.endOn || ""}
                            onChange={inputChange}
                        />
                    </label>

                    <button>Create Task</button>
                </form>
            </Modal>
            {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
        </div>
    );
}

export default TaskForm;
