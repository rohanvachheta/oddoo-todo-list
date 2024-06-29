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


const board = {
    columns: [
        {
            id: 1,
            title: "To-Do",
            backgroundColor: "#fff",
            cards: [
                {
                    id: 1,
                    title: "Card title 1",
                    description: "Card content"
                },
                {
                    id: 2,
                    title: "Card title 2",
                    description: "Card content"
                },
                {
                    id: 3,
                    title: "Card title 3",
                    description: "Card content"
                }
            ]
        },
        {
            id: 2,
            title: "In Progress",
            cards: [
                {
                    id: 9,
                    title: "Card title 9",
                    description: "Card content"
                }
            ]
        },
        {
            id: 4,
            title: "Done",
            cards: [
                {
                    id: 12,
                    title: "Card title 12",
                    description: "Card content"
                },
                {
                    id: 13,
                    title: "Card title 13",
                    description: "Card content"
                }
            ]
        }
    ]
};



function App() {

    const [showTask, setSetshowTask] = useState(false);
    const [taskDetails, setTaskDetails] = useState({});
    const [showSignUp, setShowSignUp] = useState(false);
    const [activeUsers, setActiveUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [assignees, setAssignees] = useState([])

    console.log({ showTask });

    const isLoggedIn = window.sessionStorage.getItem('token');


    const fetchAllUser = async () => {
        try {
            const response = await fetch('http://localhost:5000/users', {
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
            const response = await fetch('http://localhost:5000/users/current', {
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
            const response = await fetch('http://localhost:5000/todos', {
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
        } catch (error) {
            console.error('Error:', error);
        }
    };


    useEffect(() => {
        if (isLoggedIn) {
            fetchCurrentUser();
            fetchTodos();
            fetchAllUser()
        }

    }, []);


    useEffect(() => {
        if (currentUser.id) {
            //   var socket = window.io.connect("http://localhost:5000");

            //   socket.on("connection", function (data) {
            //     console.log("data");
            //     // Respond with a message including this clients' id sent from the server
            //   });

            //   socket.emit("connection",{
            //     userId:123
            //   });
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
            <div className="board-root">
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
                                    dueDate="28 OCT"
                                    status="TBT-12"
                                    tasksCompleted={1}
                                    tasksTotal={2}
                                    avatar="https://fastly.picsum.photos/id/504/200/300.jpg?hmac=mycti8qYrnGcag5zUhsVOq7hQwb__R-Zf--aBJAH_ec"
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
            </div>
            

            {showTask && <TaskForm assignees={assignees} taskDetails={taskDetails} closeModal={() => {
                setSetshowTask(false)
                setTaskDetails({})
            }} />}

        </>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
