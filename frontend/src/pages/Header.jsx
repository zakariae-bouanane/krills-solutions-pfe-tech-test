import { LogIn, Cake} from 'lucide-react';

const Header = ({ logout }) => (
    <header className="bg-white shadow-md w-full sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <Cake className="h-6 w-6 text-indigo-600 mr-2" />
                Birthday Tracker
            </h1>
                <button
                    onClick={logout}
                    className="flex items-center space-x-2 px-3 py-1 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-150"
                >
                    <LogIn className="h-4 w-4" />
                    <span className="text-sm font-medium hidden sm:inline">Logout</span>
                </button>
        </div>
    </header>
);

export default Header;