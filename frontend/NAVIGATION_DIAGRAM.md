flowchart LR
    Start([App Entry Point]) --> Router{BrowserRouter}
    Router --> Routes{Routes}
    
    Routes -->|"/login"| Login[Login Page]
    Routes -->|"/dashboard"| ProtectedRoute{ProtectedRoute<br/>Check Token}
    Routes -->|"* catch-all"| Login
    
    Login -->|"Success<br/>Store Token"| Dashboard[Dashboard Page]
    Login -->|"Error"| Login
    
    ProtectedRoute -->|"No Token"| Login
    ProtectedRoute -->|"Valid Token"| Dashboard
    
    Dashboard --> Header[Header Component<br/>Logout Button]
    Dashboard --> AddFriend[AddFriendForm<br/>Add New Friend]
    Dashboard --> FriendsList[Friends List<br/>Birthday Tracker]
    
    Header -->|"Logout Click"| Logout[Clear Token<br/>Redirect to Login]
    Logout --> Login
    
    AddFriend -->|"Friend Added"| FriendsList
    
    style Login fill:#e8f4f8
    style Dashboard fill:#e8f5e9
    style ProtectedRoute fill:#fff9e6
    style Header fill:#fce4ec
    style AddFriend fill:#e0f7fa
    style FriendsList fill:#e0f7fa
