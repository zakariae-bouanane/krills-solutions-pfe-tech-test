const handleLogout = () => {

    const TOKEN_STORAGE_KEY = 'token';

    localStorage.removeItem(TOKEN_STORAGE_KEY); 
    
    // redirect if path isn't already /login
    if (window.location.pathname !== '/login') {
        window.location.href = "/login"; 
    }

};

export default handleLogout;