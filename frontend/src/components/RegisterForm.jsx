import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { register } from '../utils/auth';

const RegisterForm = (props) => {
  const [formData, setFormData] = useState({
      username: '',
      password: '',
      re_password: ''
  });

	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

	useEffect(() => {
		if (isLoggedIn()) {
				navigate('/');
		}
}, []);

	const { username, password, re_password } = formData;

	const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { error } = await register(username, password, re_password);
		if (error) {
				alert(JSON.stringify(error));
		} else {
				navigate('/');
				props.onClose();
		}
	};

	return (
	<div className="border border-[#F5F5FA]/30 bg-[#0F0C0C] rounded-[10px] sm:px-20 sm:h-[450px] sm:w-[450px] px-[60px] py-[80px] relative">
		<span className="absolute top-4 right-4 text-[#F5F5FA] material-icons cursor-pointer hover:scale-90" onClick={() => props.onClose()}>close</span>
		<form onSubmit={handleSubmit}>
			<div className="space-y-6">
				<div>
					<input type="username" 
					name="username" 
					placeholder="Имя пользователя" 
					className="placeholder-[#666] bg-[#F5F5FA] text-[#0F0C0C] text-xs sm:text-sm rounded-[10px] w-full p-2.5 focus:outline-none" 
					value={username}
					onChange={e => onChange(e)}
					autoComplete='username'
					required/>
				</div>
				<div>
					<input type="password" 
					name="password" 
					placeholder="Пароль" 
					className="placeholder-[#666] bg-[#F5F5FA] text-[#0F0C0C] text-xs sm:text-sm rounded-[10px] w-full p-2.5 focus:outline-none"
					value={password}
					onChange={e => onChange(e)}
					autoComplete='new-password' 
					required/>
				</div>
				<div>
					<input type="password" 
					name="re_password" 
					placeholder="Повторите пароль" 
					className="placeholder-[#666] bg-[#F5F5FA] text-[#0F0C0C] text-xs sm:text-sm rounded-[10px] w-full p-2.5 focus:outline-none" 
					value={re_password}
					onChange={e => onChange(e)}
					autoComplete='new-password'
					required/>
				</div>
				<button type="submit" className="w-full text-[#F5F5FA] bg-[#394770] hover:bg-[#353D54] rounded-lg text-xs sm:text-sm py-2.5 text-center">Зарегистрироваться</button>
			</div>
			<p className="mt-[48px] text-xs sm:text-sm font-light text-[#8496AC] text-center">
				У вас уже есть аккаунт? <a className="text-[#F5F5FA] hover:underline cursor-pointer" onClick={() => props.onFormSwitch('login')}>Войдите.</a>
			</p>
		</form>
	</div>
	);
};

export {RegisterForm};