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
    width: '60%',
    border: 'none',
  },
};

const TaskForm = ({ closeModal, taskId, assignees,taskDetails }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'To-do',
    assignees: [],
    therapists: [],
    priority: 'Hoch',
    taskType: 'Contact request',
    reminder: '8 hours before',
    annotations: '',
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
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
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!task.title) newErrors.title = 'Title is required';
    if (!task.description) newErrors.description = 'Description is required';
    if (!task.dueDate) newErrors.dueDate = 'Due date is required';
    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = {
      "title": task.title,
      "status": task.status,
      "taskDescription": task.description,
      "dueDate": task.dueDate
    };

    try {
      const response = await fetch('https://todobackend-2ax2.onrender.com/todos/create-todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Task created successfully:', data);
        closeModal();
      } else {
        console.error('Failed to create task:', response.statusText);
        setApiError('Failed to create task. Please try again.');
      }
    } catch (error) {
      console.error('Error creating task:', error);
      setApiError('An error occurred. Please try again.');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://todobackend-2ax2.onrender.com/todos/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Task deleted successfully');
        closeModal();
      } else {
        console.error('Failed to delete task:', response.statusText);
        setApiError('Failed to delete task. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      setApiError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <Modal
        isOpen
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="task-form">
          <div className="task-form-header">
           {/* {taskDetails.id&& <button className="btn btn-danger" onClick={handleDelete}>Delete Todo</button>} */}
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
                required
              />
              {errors.title && <p className="error" style={{ color: 'red' }}>{errors.title}</p>}
            </div>
            <div className="form-group">
              <label>Status</label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="To-do"
                    checked={task.status === 'To-do'}
                    onChange={handleChange}
                  />
                  To-do
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
                required
              ></textarea>
              {errors.description && <p className="error" style={{ color: 'red' }}>{errors.description}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="dueDate">Due Date</label>
              <input
                type="datetime-local"
                id="dueDate"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                required
              />
              {errors.dueDate && <p className="error" style={{ color: 'red' }}>{errors.dueDate}</p>}
            </div>
            <div className="form-group">
              <label>Assign the following Users</label>
              <div>
                {/* {assignees.map((item) => (
                  <label key={item}>
                    <input
                      type="checkbox"
                      name="therapists"
                      value={item}
                      checked={task.therapists.includes(item)}
                      onChange={(e) => {
                        const { checked, value } = e.target;
                        setTask((prev) => ({
                          ...prev,
                          therapists: checked
                            ? [...prev.therapists, value]
                            : prev.therapists.filter((therapist) => therapist !== value),
                        }));
                        setErrors((prev) => ({
                          ...prev,
                          therapists: '',
                        }));
                      }}
                    />
                    {item}
                  </label>
                ))} */}
              </div>
              {errors.therapists && <p className="error" style={{ color: 'red' }}>{errors.therapists}</p>}
            </div>
          </form>
          <div className="task-form-footer">
            <button className="btn" onClick={handleSave}>Save Task</button>
          </div>
          {apiError && <p className="error" style={{ color: 'red' }}>{apiError}</p>}
        </div>
      </Modal>
    </div>
  );
};

export default TaskForm;
