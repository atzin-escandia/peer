import { createContext, useContext, useState } from "react";

type UserContextType = {
    username: string;
    setUsername: (name: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [username, setUsername] = useState("");

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            {children}
        </UserContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
