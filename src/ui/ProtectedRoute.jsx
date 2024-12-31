import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from '../ui/Spinner';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;


function ProtectedRoute({children}) {
    const navigate = useNavigate();
//First: Load the authenticated user
const {isLoading, isAuthenticated} = useUser();

//Second: if there is NOT authenticated user, redirect to the /login
useEffect(function () {
    if(!isAuthenticated && !isLoading) navigate('/login')
}, [isAuthenticated, isLoading, navigate])

//Third: While loading, show a spinner
if(isLoading) return <FullPage><Spinner /></FullPage>

//Forth: if there IS a user, render the app
    if(isAuthenticated) return children;
}

export default ProtectedRoute
