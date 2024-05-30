import { useContext, useState } from "react"
import { UserContext } from "../UserContext.jsx"
import { Link, Navigate, redirect, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage.jsx";
import AccountNav from "../AccountNav.jsx";

export default function ProfilePage(){
    const {user,ready,setUser} = useContext(UserContext);
    const [redirect,setRedirect]=useState(null);
    
    let {subpage}=useParams();
    console.log(subpage);
    
    if(subpage==undefined){
        subpage='profile';
    }

    async function logout(){
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    // if we are not ready means user is loading 
    if(!ready){
        return 'Loading...';
    }
    if(ready && !user && !redirect){
        return <Navigate to={'/login'}/>
    }

    if(redirect){
        return <Navigate to={redirect}/>
    }
    return(
        <div>
            <AccountNav/>
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email}) <br/>
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage/>
            )}
        </div>
    )
}