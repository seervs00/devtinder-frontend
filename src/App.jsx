
import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Request from "./components/Request";
import Chat from "./components/Chat"

function App() {
  return (
  <Provider store={appStore}>
    <BrowserRouter >
  <Routes>
    <Route path="/" element={<Body/>}>
    <Route path="/" element ={<Feed/>}/>
    <Route path="/login" element ={<Login/>}/>
    <Route path="/profile" element ={<Profile/>}/>
    <Route path="/connections" element ={<Connections/>}/>
    <Route path="/request" element ={<Request/>}/>
    <Route path="/chat/:targetId" element ={<Chat/>}/>
    </Route>
  </Routes>
  </BrowserRouter>
  </Provider>
 
  )
}

export default App;

