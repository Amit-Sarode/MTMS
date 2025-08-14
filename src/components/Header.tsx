import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, ChevronDown } from 'lucide-react';
import TabNavigation from './TabNavigation';
import { baseURL } from '../config';

interface HeaderProps {
  onSearch?: (term: string) => void;
}

const Header: React.FC<HeaderProps> = () => {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
 const handleLogout = () => {
  localStorage.removeItem('authToken');  
  localStorage.removeItem('mtmsUser');  
  navigate('/login');                    
};

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

    const token = localStorage.getItem('authToken');
    const fetchUser = async () => {
  
      try {
        const res = await fetch(`${baseURL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true',
          }
        });
        const json = await res.json();
        const userData = json?.data;
        console.log(userData);
  
        setUser(userData);
        setName(userData.name || '');
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
  
    useEffect(() => {
      fetchUser();
    }, []);

  return (
    <header className="bg-white dark:bg-gray-800 p-4">
      <div className="text-gray-900 dark:text-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-gray-900 dark:text-gray-100">
              MTMS
            </Link>
          </div>

          <div className='hidden lg:block'>
            <TabNavigation />
          </div>
          
          <div className="flex items-center relative" ref={dropdownRef}>
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors duration-150"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-[hsl(var(--primary))] flex items-center justify-center text-gray-900 dark:text-gray-100">
                {user?.profilePhoto ? (
                  <img 
                    src={user.profilePhoto} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{user?.name.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <span className="hidden md:inline-block font-medium text-sm">
                {name}
              </span>
              <ChevronDown size={16} />
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10 dropdown-animation">
                <div className="py-1">
                  <Link 
                    to="/profile" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    <User size={16} className="mr-2" />
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;