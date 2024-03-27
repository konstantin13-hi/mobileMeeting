

import { createContext, useContext } from 'react';
import { Text, View } from 'react-native'

const AuthContext = createContext({


})

export const AuthProvider = ({children}) => {
    return (
     <AuthContext.Provider value={{
        user :  "ssdas",
     }}>
        {children}
        </AuthContext.Provider>
    
    );

};

export default function useAuth(){
    return useContext(AuthContext);
}



