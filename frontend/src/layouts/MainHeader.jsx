import { useAuthStore } from '../store/auth';
import { logout } from '../utils/auth';
import { ProgressBar } from '../components/ProgressBar';
import { RegisterForm } from '../components/RegisterForm';
import { LoginForm } from '../components/LoginForm';
import { Modal } from '../components/Modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainHeader = (props) => {
	const [isLoggedIn, user] = useAuthStore((state) => [
		state.isLoggedIn,
		state.user,
	]);

	
	const [showModalWin, setShowModalWin] = useState(false);

  const [currentForm, setCurrentForm] = useState('login');

	const iconName = isLoggedIn() ? 'logout' : 'login';

  const body = document.querySelector("body");

  const handleSignIn = () => {
    setShowModalWin(true);
    body.style.overflow = "hidden";
  };

	const handleSignBtn = () => { isLoggedIn() ? logout() : handleSignIn()}

  const handleCloseModal = () => {
    setShowModalWin(false);
    body.style.overflow = "auto";
  };

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
  	props.setInputText(lowerCase);
  };

	const navigate = useNavigate();

	const handleCabinetBtn = () => {
			navigate('/eventUser');
	};
	
  return (
    <>
					<header className='backdrop-blur-md sticky top-0 w-full flex items-center justify-between h-[56px] px-[20px] sm:px-[150px] md:px-[230px] bg-[#0F0C0C]/70 text-white'>
						<div className="text-sm uppercase font-bold">Главная</div>
						<div className='border border-[#666] hover:border-[#F5F5FA] flex items-center w-[200px] md:w-[450px] mx-[15px] lg:mx-[0px] space-x-[5px] px-[5px] bg-transparent rounded-[10px]'>
							<span className="text-[#666] material-icons">search</span>
							<input
									type="text"
									placeholder="Поиск..."
									onChange={inputHandler}
									className="selection:text-[#0F0C0C] selection:bg-[#F5F5FA] w-full py-[5px] placeholder-[#666] bg-transparent focus:outline-none text-[#F5F5FA]"/>
						</div>
						<div className='flex items-center space-x-[10px]'>
							{isLoggedIn() && (
								<a onClick={() => handleCabinetBtn()} className='cursor-pointer hover:scale-90'>{user().username}</a>
							)}
							<span onClick={handleSignBtn} className="text-[#F5F5FA] material-icons cursor-pointer hover:scale-90">{iconName}</span> 
						</div>
						<ProgressBar/>
					</header>
					{showModalWin && (
						<Modal onClose={handleCloseModal}>
							{
								currentForm === "login" ? <LoginForm onFormSwitch={toggleForm} onClose={handleCloseModal}/> : <RegisterForm onFormSwitch={toggleForm} onClose={handleCloseModal}/>
							}
						</Modal>
					)}
    </>
  )
}

export {MainHeader};