import React from 'react';
import './card.css';

const Card = ({ title, dueDate, tasksCompleted, tasksTotal, status, avatar, onClick }) => {
    const handleClick=e=>{
        e.preventDefault();
        onClick()
    }
    return (
        <div className="card">
            <a href='javascript:;' className='edit-card' onClick={handleClick}>
                <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z" />
                    </g>
                </svg>

            </a>
            <div className="card-header">
                <h3>{title}</h3>
            </div>
            <div className="card-body">
                {dueDate && <span className="due-date">{dueDate}</span>}
                <div className="task-progress">
                    <span>{`${tasksCompleted}/${tasksTotal}`}</span>
                </div>
            </div>
            <div className="card-footer">
                <span className="status">{status}</span>
                {avatar && <img src={avatar} alt="Avatar" className="avatar" />}
            </div>
        </div>
    );
};

export default Card;
