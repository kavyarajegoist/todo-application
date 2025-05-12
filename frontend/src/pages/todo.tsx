import axios, { AxiosError } from "axios"
import { Plus,SquarePen,Trash2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"


type todo = {
    _id:string,
    title:string,
    user_id:string,
    done:boolean,
    created_on:string
}

const Todo = ()=>{
    const ref = useRef<HTMLInputElement>(null);
    const [error,setError] = useState('');
    const [todos,setTodos] = useState<todo[]>([]);
    const [editId ,setEditId] = useState<string>('');
    const [editTitle ,setTitle] = useState<string>('');

    useEffect(()=>{
        fetchTodo();
    },[])

    const handleEdit = (todo:todo)=>{
        setEditId(todo._id);
        setTitle(todo.title);

    }

    const toggleDone = async(id:string,done:boolean)=>{
        try {
            const token = localStorage.getItem('token');
            await axios.put(`/api/todo/toggle?id=${id}`,{done:!done},{
                headers:{Authorization:`Bearer ${token}`}
            });
            fetchTodo()
        } catch (error) {
            if(error instanceof AxiosError)
                {
                    switch (error.status) {
                        case 401: setError('User Unauthorised');
                            
                            break;
                        case 404: setError('Todo not found');
                        break;
                        case 403: setError("Id is required")
                            break;
                        default:
                            break;
                    }
                }
                else
                    setError('Something went Wrong')
        }
    
    }

        

    const saveEdit = async(id:string)=>{
        try {
            const token = localStorage.getItem('token');
            console.log(id);
            await axios.put(`/api/todo/edit?id=${id}`,{title:editTitle},{headers:{
                Authorization: `Bearer ${token}`
            }})
            setEditId('');
            setTitle('');
            fetchTodo();

        } catch (error) {
             if(error instanceof AxiosError)
                {
                    switch (error.status) {
                        case 401: setError('User Unauthorised');
                            
                            break;
                        case 404: setError('Todo not found');
                        break;
                        case 403: setError("Id is required")
                            break;
                        default:
                            break;
                    }
                }
                else
                    setError('Something went Wrong')
        }
    }

    const handleDelete = async(id:string)=>{
        try {
            const token = localStorage.getItem('token');
             await axios.delete(`/api/todo/delete?id=${id}`,{headers:{
                Authorization: `Bearer ${token}`
            }})
            fetchTodo();

        } catch (error) {
             if(error instanceof AxiosError)
                {
                    switch (error.status) {
                        case 401: setError('User Unauthorised');
                            
                            break;
                        case 404: setError('Todo not found');
                        break;
                        case 403: setError("Id is required")
                            break;
                        default:
                            break;
                    }
                }
                else
                    setError('Something went Wrong')
        }
    }
    const fetchTodo = async()=>{
        try{
            const token = localStorage.getItem('token')
            const response = await axios.get("/api/todo/",{headers:{
                Authorization:`Bearer ${token}`
            }});

            setTodos(response.data.todos);


        }
        catch(error){
            if(error instanceof AxiosError)
                {
                    switch (error.status) {
                        case 401: setError('User Unauthorised');
                            
                            break;
                        case 404: setError('Todo not found');
                        break;
                        case 403: setError("Internal Server Error")
                            break;
                        default:
                            break;
                    }
                }
                else
                    setError('Something went Wrong')
        }
    }
    const HandleSubmit = async()=>{
       try{
            if(ref.current)
            {
               const title = ref.current.value;
               const token = localStorage.getItem('token');
                await axios.post('/api/todo/create',{title},{headers:{
                    "Authorization":`Bearer ${token}`
                }});
                ref.current.value = "";
                fetchTodo();
            }
            else{
                setError('title is required');
                return
            }
       }
       catch(error)
       {
            if(error instanceof AxiosError)
            {
                switch (error.status) {
                    case 401: setError('User Unauthorised');
                        
                        break;
                    case 403: console.log(error.response?.data)
                        break;
                    default:
                        break;
                }
            }
            else
                setError('Something went Wrong')
       }
    }
    return(
        <>
            <div className="flex flex-col justify-center items-center min-h-screen">
                <div className="flex border-2 w-96 justify-between">
                    <input ref={ref} type="text"/>
                    <button className="flex bg-blue-300 " onClick={HandleSubmit}>{<Plus/>} Add Todo</button>
                </div>
                <div className="flex flex-col gap-3">
                    {todos.map((todo)=>(
                        <div  key={todo._id}>
                            <input type="checkbox" checked={todo.done} onChange={()=>toggleDone(todo._id,todo.done)} />
                            {editId === todo._id?(<>
                                <input value={editTitle} onChange={(e)=>setTitle(e.target.value)} />
                                <button onClick={()=>saveEdit(todo._id)}>Save</button>
                                <button onClick={()=>{setEditId('')}}>Cancel</button>
                            </>):(<>
                            <span style={{textDecoration:todo.done?"line-through":"none"}}>
                                {todo.title}

                            </span>
                            {todo.created_on}
                            <button onClick={()=>handleDelete(todo._id)}><Trash2/></button>
                            <button onClick={()=>handleEdit(todo)}><SquarePen/></button>
                            </>)}
                        </div>
                    ))}
                    
                </div>
                {error && <div> {error}</div>}
            </div>
        </>
    )
}

export default Todo;