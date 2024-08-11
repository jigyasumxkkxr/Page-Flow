import { useNavigate } from 'react-router-dom';
import {  Dropdown,  DropdownTrigger,  DropdownMenu ,  DropdownItem} from "@nextui-org/dropdown";

export const MyDropdown = () => {
    const navigate = useNavigate();
  
    const handleSignOutClick = () => {
      console.log('Sign out clicked');
      localStorage.removeItem("name");
      localStorage.removeItem("token");
      localStorage.removeItem("userId")
      navigate("/");
    };
  
    const handleMyPostsClick = () => {
      console.log('My Posts clicked');
      navigate("/myblogs")
    };

  
    return (
      <Dropdown>
      <DropdownTrigger>
      <div className="relative w-8 h-8 overflow-hidden bg-slate-200 rounded-full cursor-pointer">
              <svg
                className="absolute w-10 h-10 text-gray-400 -left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" className='backdrop-blur-xs border-2 rounded'>
        <DropdownItem key="new" className=' cursor-default border-b h-9 hover:bg-green-100 text-green-600'>{`Signed as ${localStorage.getItem("firstName")}`}</DropdownItem>
        <DropdownItem key="copy" onClick={handleMyPostsClick} className='cursor-pointer h-8 text-gray-700 hover:bg-gray-100'>My Posts</DropdownItem>
        <DropdownItem key="edit" className='cursor-pointer text-red-500 h-8 hover:bg-red-100' onClick={handleSignOutClick}>Log Out</DropdownItem>
        
      </DropdownMenu>
    </Dropdown>
    );
  };

