// src/TaskForm.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import './taskForm.css';


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width:'60%',
      border:'none'
    },
  };
  

const assignees=['Dr. med. Anja Seidel','Dr. med. Max Mueller']

const TaskForm = ({closeModal}) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'To-Do',
    assignees: [],
    therapists: [],
    priority: 'Hoch',
    taskType: 'Contact request',
    reminder: '8 hours before',
    annotations: '',
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }




  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Logic to save task
    console.log('Task Data:', task);
  };

  return (

    <div>
        <div onClick={openModal}>test</div>
        <Modal
        isOpen 
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="task-form">
      <div className="task-form-header">
        <button className="btn btn-danger">Delete Todo</button>
        <button className="btn" onClick={closeModal}>Close</button>
      </div>
      <form>
        <div className="form-group">
          <label htmlFor="title">New Task Todo</label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <div>
            <label>
              <input
                type="radio"
                name="status"
                value="To-Do"
                checked={task.status === 'To-Do'}
                onChange={handleChange}
              />
              To-Do
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="In Progress"
                checked={task.status === 'In Progress'}
                onChange={handleChange}
              />
              In Progress
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="Done"
                checked={task.status === 'Done'}
                onChange={handleChange}
              />
              Done
            </label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="description">Task Description</label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="datetime-local"
            id="dueDate"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Assign the following Users</label>
          <div>
            {assignees.map(item=>{

                return <label>
                <input
                  type="checkbox"
                  name="therapists"
                  value={item}
                  checked={task.therapists.includes('Dr. med. Anja Seidel')}
                  onChange={(e) => {
                    const { checked, value } = e.target;
                    setTask((prev) => ({
                      ...prev,
                      therapists: checked
                        ? [...prev.therapists, value]
                        : prev.therapists.filter((therapist) => therapist !== value),
                    }));
                  }}
                />
                Dr. med. Anja Seidel
              </label>
            })}
            
            
            {/* Add more therapists as needed */}
          </div>
        </div>
        
      </form>
      <div className="task-form-footer">
        <button  className="btn" onClick={handleSave}>Save Task</button>
        
      </div>
    </div>
   </Modal>
    </div>
  );
};

export default TaskForm;
