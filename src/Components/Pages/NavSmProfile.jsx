import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/loginSlice";
const NavSmProfile = () => {
  const navigate = useNavigate();
    const dispatch = useDispatch();
   const user = useSelector((state) => state.login.user);
     const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  console.log(user);
  
  return (
    <div>

      <header className="bg-white p-4">
        <div className="text-xl font-semibold">
          <div className="grid grid-cols-3 gap-6 justify-items-center ">
            <div className="text-gray-600 flex items-center">
              <h2>{user?.name}</h2>
            </div>
            <div className="text-gray-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>

            </div>
            <div onClick={handleLogout} className="text-gray-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>

            </div>
          </div>
        </div>
      </header>
    </div>


  );
}
export default NavSmProfile