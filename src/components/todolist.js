import { useEffect } from "react"

export default function ToDoList({toDos, handleUpdate, handleDelete, handleChecked}){
    useEffect(()=>{
        console.log(toDos.slice(-20).reverse())
    },[toDos])

    return(
        <>
        <div className="container">
            <ul className="todolist">
                {toDos.slice(-20).reverse().map((todo, ind)=>(
                    <li className="todos" key={ind} style = {{ textDecoration: todo.completed?"line-through":null}}>
                        <div>
                            <input type="checkbox" checked={todo.completed} onChange={()=>handleChecked(todo.id)}/>
                            <span>{todo.title}</span>
                        </div>
                        <div>
                            <img src="https://cdn-icons-png.flaticon.com/128/1827/1827933.png" alt="edit-btn" height="20px" onClick={()=>handleUpdate(todo.id)}/>
                            <img src="https://cdn-icons-png.flaticon.com/128/484/484662.png" alt="delete-btn" height="20px" onClick={()=>handleDelete(todo.id)}/>     
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        </>
    )

}