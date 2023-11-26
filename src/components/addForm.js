import { useEffect, useState } from "react";


export default function AddForm({task,setTask, handleAdd, handleUpd, titleRef, isUpdate,taskInd}){

    return(
        <div className="form">
            <input type="text" placeholder="Enter your task" value={task} onChange={(e)=>setTask(e.target.value)} ref={titleRef}/>
            {isUpdate?<button onClick={()=>handleUpd(task, taskInd)}>Update</button>:<button onClick={()=>handleAdd(task)}>Add</button>}
            

        </div>
    )

}