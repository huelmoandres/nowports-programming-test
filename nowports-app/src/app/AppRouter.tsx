import * as React from "react";
import {
    Routes,
    Route,
    useLocation,
    Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "../auth/auth";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import Contact from "../components/contact/Contact";
import ContactList from "../components/contact/ContactList";

export default function AppRouter() {
    return (
        <AuthProvider>
            <Routes>
                <Route
                    path="/" 
                    element={
                        <OnlyPublic>
                            <Login />
                        </OnlyPublic>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <OnlyPublic>
                            <Register />
                        </OnlyPublic>
                    }
                />
                <Route
                    path="/home"
                    element={
                        <RequireAuth>
                            <ContactList />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/contact/create"
                    element={
                        <RequireAuth>
                            <Contact />
                        </RequireAuth>
                    }
                />
            </Routes>
        </AuthProvider>
    );
}

function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();
    
    if (auth.loading) {
        return null;
    }

    if (auth.isFetched && !auth.isSuccess) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
}

function OnlyPublic({ children }: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();

    if (auth.loading) {
        return null;
    }

    if (auth.user) {
        return <Navigate to="/home" state={{ from: location }} replace />;
    }

    return children;
}