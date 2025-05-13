import axios, { AxiosError } from "axios"
import { Plus,SquarePen,Trash2, LogOut } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useAuth } from "../context/authProvider"
import { useNavigate } from "react-router-dom"


type todo = {
    _id: string;
    title: string;
    user_id: string;
    done: boolean;
    created_on: string;
}

const Todo = ()=>{
    const ref = useRef<HTMLInputElement>(null);
    const [error,setError] = useState('');
    const [todos,setTodos] = useState<todo[]>([]);
    const [editId ,setEditId] = useState<string>('');
    const [editTitle ,setTitle] = useState<string>('');
    const { logout } = useAuth();
    const navigate = useNavigate();

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

            const validTodos = response.data.todos.filter((todo: todo) => todo._id);
            setTodos(validTodos);


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

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return(
        <>
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 px-2">
                <button 
                    onClick={handleLogout}
                    className="absolute top-4 right-4 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-all"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
                <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-center">Your Todos</h2>
                    <div className="flex gap-2 mb-6">
                        <input ref={ref} type="text" placeholder="Add a new todo..." className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200 text-base bg-gray-50" />
                        <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition-all" onClick={HandleSubmit}>
                            <Plus size={20}/> Add
                        </button>
                    </div>
                    <AnimatePresence>
                        {todos.length === 0 && (
                            <motion.div 
                                key="empty-state"
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                exit={{ opacity: 0 }} 
                                className="text-gray-400 text-center py-8"
                            >
                                No todos yet. Add your first one!
                            </motion.div>
                        )}
                        <div className="flex flex-col gap-4">
                            {todos.map((todo) => (
                                <motion.div
                                    key={todo._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}
                                    layout
                                    className={`flex items-center justify-between bg-gray-100 rounded-lg shadow hover:shadow-lg transition-all px-4 py-3 group ${todo.done ? 'opacity-60' : ''}`}
                                >
                                    <div className="flex items-center gap-3 flex-1">
                                        <input type="checkbox" checked={todo.done} onChange={() => toggleDone(todo._id, todo.done)} className="accent-purple-600 w-5 h-5" />
                                        {editId === todo._id ? (
                                            <input
                                                value={editTitle}
                                                onChange={(e) => setTitle(e.target.value)}
                                                className="border border-gray-300 rounded px-2 py-1 text-base flex-1"
                                            />
                                        ) : (
                                            <span className={`text-lg ${todo.done ? 'line-through text-gray-400' : 'text-gray-800'} flex-1`}>{todo.title}</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 ml-2">
                                        {editId === todo._id ? (
                                            <>
                                                <button onClick={() => saveEdit(todo._id)} className="text-green-600 hover:text-green-800 font-semibold px-2">Save</button>
                                                <button onClick={() => { setEditId('') }} className="text-gray-500 hover:text-gray-700 px-2">Cancel</button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => handleEdit(todo)} className="text-blue-500 hover:text-blue-700 px-2"><SquarePen size={18}/></button>
                                                <button onClick={() => handleDelete(todo._id)} className="text-red-500 hover:text-red-700 px-2"><Trash2 size={18}/></button>
                                            </>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </AnimatePresence>
                    {error && <div className="text-red-500 text-center mt-4">{error}</div>}
                </div>
            </div>
        </>
    )
}

export default Todo;