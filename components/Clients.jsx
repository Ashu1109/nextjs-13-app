'use client'

import Link from "next/link";
import { useState, createContext, useContext,useEffect } from "react"
import {Toaster,toast} from "react-hot-toast";
import { useRouter } from "next/navigation";
import '../styles/mediaquery.scss'

export const Context = createContext({ user: {} });
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch('/api/auth/me')
    .then(res => res.json())
    .then(data => {
      if(data.success){setUser(data.user)}
    })
  }, []);



  return (
    <Context.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
      <Toaster />
    </Context.Provider>
  );
};




export const LogoutBtn = () => {
  const { user, setUser } = useContext(Context);

  const logoutHandler = async () => {
    try {
      const res = await fetch("/api/auth/logout");

      const data = await res.json();

      if (!data.success) toast.error(data.message);

      setUser({});

      toast.success(data.message);
    } catch (error) {
      return toast.error(error);
    }
  };


  
    return (
      <>
      {
        user._id?<button  className="btn media" onClick={logoutHandler}>Logout</button>:<Link className='media' href={"/login"}>Login</Link>
      }
      </>
    )
}

export const TodoButton = ({id,completed}) =>{
  const router = useRouter();

  const deleteHandler =  async(id) =>{
    try {
      const res = await fetch(`api/task/${id}`,{
        method:"DELETE",
        headers:{
          "Context-Type":"application/json"
        }
      })
      const data =await res.json();
      if(!data.success) return toast.error(data.message)
      toast.success(data.message)
      router.refresh(); 
    } catch (error) {
      return toast.error(error)
    }
  }
  const updateHandler = async(id) =>{
    try {
      const res = await fetch(`api/task/${id}`,{
        method:"PUT",
        headers:{
          "Context-Type":"application/json"
        }
      })
      const data =await res.json();
      if(!data.success) return toast.error(data.message)
      toast.success(data.message)
      router.refresh();
    } catch (error) {
      return toast.error(error)
    }
  }
  return (
  <>
  <input type="checkbox" onChange={()=>{updateHandler(id)}} checked={completed}/>
  <button className="btn delete" onClick={()=>{deleteHandler(id)}}>Delete</button>
  </>
  )
}