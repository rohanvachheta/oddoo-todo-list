import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Board, { moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
// Use your own styles to override the default styles
import "./styles.css";
import Card from "./components/card/card";
import TaskForm from "./components/form/createTask";
import LoginPage from "./components/login/loginpage";
import RegisterPage from "./components/register/register";
import Header from "./components/header/header";






function App() {

    const [showTask, setSetshowTask] = useState(false);
    const [taskDetails, setTaskDetails] = useState({});
    const [showSignUp, setShowSignUp] = useState(false);
    const [activeUsers, setActiveUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [assignees, setAssignees] = useState([]);
    const [useBoard, setUseBoard] = useState(false)
    const [board, setboard] = useState({
        "columns": [
            {
                "id": 1,
                "title": "To-Do",
                "backgroundColor": "#fff",
                "cards": [
                    
                ]
            },
            {
                "id": 2,
                "title": "In Progress",
                "cards": [
                 
                ]
            },
            {
                "id": 4,
                "title": "Done",
                "cards": []
            }
        ]
    })

    console.log({ showTask });

    const isLoggedIn = window.sessionStorage.getItem('token');


    const fetchAllUser = async () => {
        try {
            const response = await fetch(' https://todobackend-2ax2.onrender.com/users', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const userData = await response.json();
            console.log('Current user setAssignees:', userData);
            setAssignees(userData)
            // Handle user data (e.g., update state or context)
        } catch (error) {
            console.error('Error:', error);
            
        }
    };

    const fetchCurrentUser = async () => {
        try {
            const response = await fetch(' https://todobackend-2ax2.onrender.com/users/current', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const userData = await response.json();
            console.log('Current user data:', userData);
            setCurrentUser(userData)
            // Handle user data (e.g., update state or context)
        } catch (error) {
            console.error('Error:', error);
            window.sessionStorage.clear();
            window.location.reload()
        }
    };

    const fetchTodos = async () => {
        try {
            const response = await fetch(' https://todobackend-2ax2.onrender.com/todos', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch todos');
            }

            const todosData = await response.json();
            console.log('Todos:', todosData);

            setTimeout(() => {
                setUseBoard(true)
            }, 100);

            setboard({
                columns:[
                    {
                        id: 5,
                        title: "To-Do",
                        backgroundColor: "#fff",
                        cards: todosData.filter(i=>i.status==='To-do').map(i=>({
                            id: i._id,
                            title: i.title,
                            description: i.taskDescription,
                            dueDate:i.dueDate,
                            userName:i.createdBy.firstName
                        }))
                    },
                    {
                        id: 12,
                        title: "In Progress",
                        cards: todosData.filter(i=>i.status==='In Progress').map(i=>({
                            id: i._id,
                            title: i.title,
                            description: i.taskDescription,
                            dueDate:i.dueDate,
                            
                        }))
                    },
                    {
                        id: 123,
                        title: "Done",
                        cards: todosData.filter(i=>i.status==='Done').map(i=>({
                            id: i._id,
                            title: i.title,
                            description: i.taskDescription,
                            dueDate:i.dueDate
                        }))
                    }
                ]
            })
        } catch (error) {
            console.error('Error:', error);
        }
    };

    console.log({board});


    useEffect(() => {
        if (isLoggedIn) {
            fetchCurrentUser();
            fetchTodos();
            fetchAllUser()
        }

    }, []);


    useEffect(() => {
        if (currentUser.id) {

            var socket = window.io.connect(`wss://todobackend-2ax2.onrender.com?userId=${currentUser.id}`);

            socket.on("get_todo_list", (arg) => {
                console.log(arg); // world
            });
        }
    }, [currentUser.id])



    useEffect(() => {
        const users = ['rohan1', 'smi2t', 'bha3vik', 'r4ohan', '5smit', '6bhavik', '7rohan', '8smit', '9bhavik', '10rohan', '11smit', '12bhavik']
        setActiveUsers(users)

    }, [])


    if (!isLoggedIn) {
        if (showSignUp) return <div className="register-root"><RegisterPage handleSignUp={() => setShowSignUp(false)} /></div>;
        return <div className="register-root"><LoginPage handleSignUp={() => setShowSignUp(true)} /></div>
    }

    return (
        <>

            <Header userName="rohan vachheta" activeUsers={activeUsers} />

            <div className="create-todo" onClick={()=>
               setSetshowTask(true)

            }>
                Create Todo +</div> 
           {useBoard&& <div className="board-root">
                <Board
                
                    on
                    renderCard={(data, { dragging }) => {
                        return (
                            <div dragging={dragging}>
                                <Card
                                    onClick={() => {
                                        setSetshowTask(true)
                                        setTaskDetails(data)
                                    }}

                                    title={data.title}
                                    dueDate={data.dueDate}
                                    status={`Assigned to: ${data.userName}`}
                                    
                                />
                                {/* {content} */}
                                {/* <button type="button" onClick={removeCard}>Remove Card</button> */}
                            </div>
                        )
                    }}
                    allowRemoveLane
                    allowRenameColumn
                    allowRemoveCard
                    onLaneRemove={console.log}
                    onCardRemove={console.log}
                    onLaneRename={console.log}
                    initialBoard={board}
                    //   allowAddCard={{ on: "top" }}
                    onNewCardConfirm={(draftCard) => ({
                        id: new Date().getTime(),
                        ...draftCard
                    })}
                    onCardNew={console.log}
                    onCardClick={console.log}
                />
            </div>}
            

            {showTask && <TaskForm assignees={assignees} taskDetails={taskDetails} closeModal={() => {
                setSetshowTask(false)
                setTaskDetails({})
            }} />}

        </>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
