import React, { useState } from "react";
import ReactDOM from "react-dom";
import Board, { moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
// Use your own styles to override the default styles
import "./styles.css";
import Card from "./components/card/card";
import TaskForm from "./components/form/createTask";


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

const items = [];

function ControlledBoard() {
    // You need to control the state yourself.
    const [controlledBoard, setBoard] = useState(board);

    function handleCardMove(_card, source, destination) {
        const updatedBoard = moveCard(controlledBoard, source, destination);
        setBoard(updatedBoard);
    }

    return (
        <Board onCardDragEnd={handleCardMove} disableColumnDrag>
            {controlledBoard}
        </Board>
    );
}




const handleClick = (data) => {
    console.log('test', data)

}



function App() {

    const [showTask, setSetshowTask] = useState(false);
    const [taskDetails, setTaskDetails] = useState({})

    console.log({showTask});

    return (
        <>

           <div className="board-root">
           <Board
                on
                renderCard={(data, { removeCard, dragging }) => {

                    console.log({ data });
                    return (
                        <div  dragging={dragging}>
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

           {showTask &&  <TaskForm closeModal={()=>{
             setSetshowTask(false)
             setTaskDetails({})
           }}/>}

        </>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
