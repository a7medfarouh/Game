import Login from "./Compenent/Login/Login";
import Register from "./Compenent/Register/Register";
import { createHashRouter, RouterProvider, Navigate } from 'react-router-dom';
import Layout from "./Compenent/Layout/Layout";
import Home from "./Compenent/Home/Home";
import AllGames from "./Compenent/AllGames/AllGames";
import Platforms from "./Compenent/Platforms/Platforms";
import Sortby from "./Compenent/Sortby/Sortby";
import Categery from "./Compenent/Categery/Categery";
import Gamedetails from "./Compenent/Gamedetails/Gamedetails";


function ProtectedRoute(props) {
  let token= localStorage.getItem("token");
 
  if(token == null){
      return <Navigate to="/login"/>
  }
  else{
      return <>{props.children}</> 
  }

}
let routers= createHashRouter([
  {path:'/',element: <Layout/> ,children:[
    {index:true,element:<Login/> },
    {path:'register',element:<Register/>},
    {path:'home',element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'allgames',element:<ProtectedRoute><AllGames/></ProtectedRoute>},
    {path:'game-details/:id',element:<ProtectedRoute> <Gamedetails/> </ProtectedRoute>},
    
    
    {path:'platforms/:path',element:<ProtectedRoute><Platforms/></ProtectedRoute>},


    {path:'sort-by/:path',element:<ProtectedRoute><Sortby/></ProtectedRoute>},
    {path:'category/:path',element:<ProtectedRoute><Categery/></ProtectedRoute>},
    {path:'*',element:<Login/> }
  ] }
]);

function App() {
 
  return <>
  <RouterProvider router={routers}/>
  
 
  </>
}

export default App;

