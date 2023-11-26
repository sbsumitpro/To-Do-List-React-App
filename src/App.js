import { useEffect, useState, useRef } from "react";
import AddForm from "./components/addForm";
import ToDoList from "./components/todolist";


function App() {
  const [toDos, setToDos] = useState([]);
  const[isUpdate, setIsUpdate] = useState(false)
  const[task, setTask] = useState("");
  const[taskInd, setTaskInd] = useState(null);
  const [checked, setChecked] = useState(false)
  const titleRef = useRef(null)

  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/todos")
    .then((res)=>res.json())
    .then((data)=>setToDos(data))
  },[])

  const handleAdd =(taskName)=>{
    // useEffect(()=>{
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

  const handleUpdate =(index)=>{
    console.log("updated", index)
    const toDoTarget = toDos.filter((todo)=>todo.id==index)
    setTask(toDoTarget.title)
    console.log(toDoTarget)
    setTask(toDoTarget[0].title)
    setIsUpdate(true) 
    setTaskInd(index)
  }

  const handleDelete = (index)=>{
    console.log("deleted", index)
    console.log(toDos)
    const newTodos = toDos.filter((toDo)=>toDo.id!=index)
    // console.log("newTodos",newTodos)
    setToDos(newTodos)
  }

  const handleUpd=(updatedTask, ind)=>{
    console.log("upded")
    const toDos1 = [...toDos]
    const toDoTarget = toDos1.filter((todo)=>todo.id==ind)
    toDoTarget[0].title = updatedTask
    setToDos(toDos1)
    setIsUpdate(false) 
    setTask("");
    titleRef.current.focus();
  }

  const handleChecked =(ind)=>{

    const toDos1 = [...toDos]
    const toDoTarget = toDos1.filter((todo)=>todo.id==ind)
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
            <ToDoList toDos={toDos} handleUpdate={handleUpdate} handleDelete={handleDelete} handleChecked={handleChecked} checked={checked}/>
        </div>

    </div>
  );
}

export default App;
