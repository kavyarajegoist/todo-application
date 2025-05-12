import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar"
import Footer from "./components/footer"
import SignUp from "./pages/signup"
import HomePage from "./pages/homepage"
import SignIn from "./pages/signin"
import Todo from "./pages/todo"
function App() {

  return (
    <>
      <div className="font-sans">
        
      <BrowserRouter>
      <Navbar/> 
      
      <Routes>
       <Route path = "/signup" element={<SignUp/>}/>
      <Route path = "/" element={<HomePage/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path='/create-todo' element= {<Todo/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
      </div>
      
    </>
  )
}

export default App
