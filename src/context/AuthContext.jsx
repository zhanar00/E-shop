import React, { createContext, useState, useContext } from "react";
import { mockUsers } from "../data/mockUsers";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (email, password) => {
        // Mock login logic
        const foundUser = mockUsers.find(
            (u) => u.email === email && u.password === password
        );
        if (foundUser) {
            setUser(foundUser);
            return true;
        }
        return false;
    };

    const logout = () => setUser(null);

    const signup = (newUser) => {
        // Add new user to mock data
        const userWithId = { ...newUser, id: mockUsers.length + 1 };
        mockUsers.push(userWithId);
        setUser(userWithId);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );
};
