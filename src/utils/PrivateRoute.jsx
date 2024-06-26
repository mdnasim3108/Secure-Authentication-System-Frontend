import { Cookies } from "react-cookie"
import { Navigate } from "react-router-dom"
const PrivateRoute=(props)=>{
    const cookies=new Cookies()
    if(cookies.get("token")) return props.children
    else return <Navigate to="/"/>
}
export default PrivateRoute