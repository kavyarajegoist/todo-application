import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar"
import Footer from "./components/footer"
import SignUp from "./pages/signup"
function App() {

  return (
    <>
      <div className="font-[DM_Sans]">
        
      <BrowserRouter>
      
      <Navbar/>
      <Routes>
       <Route path = "/signup" element={<SignUp/>}/>

      </Routes>
      <Footer/>
      </BrowserRouter>
      </div>
      
    </>
  )
}

export default App
