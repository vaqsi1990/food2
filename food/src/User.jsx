import { createContext, useEffect, useState } from "react";
import axios from 'axios'
export const User = createContext({

})

export function UserProvider({children}) {
    const [user, setUser] = useState(null)
    const [ready,setReady] = useState(false);
  useEffect(() => {
    if (!user) {
      axios.get('/profile').then(({data}) => {
        setUser(data);
        setReady(true);
      });
    }
  }, []);
      
    return (
        <User.Provider value={{user, setUser, ready}}> 


            {children}
        </User.Provider>
    )

}