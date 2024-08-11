import { Dropdown, DropdownItem  } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

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
  
    const handleDropdownItemClick = (itemName: string) => {
      console.log(`${itemName} clicked`);
      // Handle dropdown item clicks here
    };
  
    return (
      <Dropdown
        label=""
        dismissOnClick={false}
        renderTrigger={() => (
          <button
            id="dropdownUserAvatarButton"
            data-dropdown-toggle="dropdownAvatar"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-2 focus:ring-green-100 dark:focus:ring-green-300"
            type="button"
          >
            <div className="relative w-8 h-8 overflow-hidden bg-slate-200 rounded-full">
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
          </button>
        )}
      >
        <DropdownItem   onClick={() => handleDropdownItemClick(`Signed in as ${localStorage.getItem("name")}`)}>
          {`Signed in as ${localStorage.getItem("name")}`}
        </DropdownItem >
        <Dropdown.Item onClick={handleMyPostsClick}>My Posts</Dropdown.Item>
        <Dropdown.Item onClick={handleSignOutClick}>Sign out</Dropdown.Item>
      </Dropdown>
    );
  };

