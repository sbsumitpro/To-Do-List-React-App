// Passing the Props & destucturing it in the AddForm fuctional component parameters itself

// This is basically the add task/ update task form of the whole application.
export default function AddForm({task,setTask, handleAdd, handleUpd, titleRef, isUpdate,taskInd}){

    return(
        <div className="form">
            <input type="text" 
                placeholder="Enter your task" 
                value={task} 
                onChange={(e)=>setTask(e.target.value)} 
                ref={titleRef}
                />
            {
            isUpdate?      // Conditional rendering based on a codition isUpdate
            <button onClick={()=>handleUpd(task, taskInd)}>Update</button>:
            <button onClick={()=>handleAdd(task)}>Add</button>
            }
        </div>
    )

}