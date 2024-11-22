import { ProgressBar } from "../components/ProgressBar";
import { logout } from "../utils/auth";
import { useAuthStore } from '../store/auth';
import { NavItem } from "../components/NavItem";
import { useNavigate } from "react-router-dom";
const PrivateHeader = () => {
	const [isLoggedIn, user] = useAuthStore((state) => [
		state.isLoggedIn,
		state.user,
	]);

	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/');
	}

	return (
		<>
			<header className='backdrop-blur-md sticky top-0 w-full flex items-center justify-between h-[56px] px-[20px] sm:px-[150px] md:px-[230px] bg-[#0F0C0C]/70 text-white'>
				<div className="text-sm uppercase space-x-[15px]">
					<a className="font-bold">Личный кабинет</a>
					<a>|</a>
					<NavItem to='/eventUser'>Мероприятия</NavItem>
					<a>|</a>
					<NavItem to='/eventManage/add'>Управление мероприятими</NavItem>
					<a>|</a>
					<NavItem to='/'>На главную</NavItem>
				</div>
				<div className='flex items-center space-x-[10px]'>
					{isLoggedIn() && (
						<a className='cursor-pointer hover:scale-90'>{user().username}</a>
					)}
					<span onClick={handleLogout} className="text-[#F5F5FA] material-icons cursor-pointer hover:scale-90">logout</span> 
				</div>
				<ProgressBar/>
			</header>
		</>
	);
}

export {PrivateHeader};