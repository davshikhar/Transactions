import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signup } from "./Pages/Signup"
import { Login } from "./Pages/Login"
import { Dashboard } from "./Pages/Dashboard"
import { SendMoney } from "./Pages/Send"

function App() {

  return (
    <div>
        <BrowserRouter>
        <Routes>
          <Route path = "/signup" element = {<Signup/>}/>
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "/dashboard" element = {<Dashboard/>}/>
          <Route path = "/send" element = {<SendMoney/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
