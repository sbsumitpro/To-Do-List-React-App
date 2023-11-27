import { useEffect, useState, useRef } from "react";
import AddForm from "./components/AddForm";
import ToDoList from "./components/ToDoList";


function App() {

  // ----- Initialize all the state here -----//
  const [toDos, setToDos] = useState([]);
  const[isUpdate, setIsUpdate] = useState(false)
  const[task, setTask] = useState("");
  const[taskInd, setTaskInd] = useState(null);
  const titleRef = useRef(null)

  // ------ Fetching all the sample todos from the API and setting it to the state ------//
  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/todos")
    .then((res)=>res.json())
    .then((data)=>setToDos(data))
  },[])

  // ---------- All the evenhandler functions has been written here --------//

  const handleAdd =(taskName)=>{
      fetch('https://jsonplaceholder.typicode.com/todos', {
              method: 'POST',
              body: JSON.stringify({
                title: taskName,
                completed: false,
                userId: 1,
                id:toDos[toDos.length-1].id+1
              }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
           })
            .then((response) => response.json())
            .then((json) => {
              setToDos([...toDos, json])
              setTask("");
              titleRef.current.focus();

            });
  }

  const triggerUpdate =(index)=>{
    const toDoTarget = toDos.filter((todo)=>todo.id===index)
    setTask(toDoTarget.title)
    setTask(toDoTarget[0].title)
    setIsUpdate(true) 
    setTaskInd(index)
  }

  const handleDelete = (index)=>{
    const newTodos = toDos.filter((toDo)=>toDo.id!==index)
    setToDos(newTodos)
  }

  const handleUpd=(updatedTask, ind)=>{
    const toDos1 = [...toDos]
    const toDoTarget = toDos1.filter((todo)=>todo.id===ind)
    toDoTarget[0].title = updatedTask
    setToDos(toDos1)
    setIsUpdate(false) 
    setTask("");
    titleRef.current.focus();
  }

  // ---- Checkbox for completion status event handeler------ //
  const handleChecked =(ind)=>{

    const toDos1 = [...toDos]
    const toDoTarget = toDos1.filter((todo)=>todo.id===ind)
    toDoTarget[0].completed = !toDoTarget[0].completed;
    setToDos(toDos1)
    console.log("toDoTarget", toDoTarget)


    
  }

  return (
    <div >
        <h1>Welcome to To-Do List app</h1>
        <div className="app-container">
            <AddForm isUpdate={isUpdate} 
            setIsUpdate={setIsUpdate} task={task} handleAdd={handleAdd} setTask={setTask} 
            titleRef={titleRef} handleUpd={handleUpd} taskInd={taskInd} />
            <ToDoList toDos={toDos} triggerUpdate={triggerUpdate} handleDelete={handleDelete} handleChecked={handleChecked}/>
        </div>

    </div>
  );
}

export default App;
