import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { MainHeader } from './MainHeader';
import { PrivateHeader } from './PrivateHeader';
import { useLocation } from 'react-router-dom';

const Layout = () => {
	const [inputText, setInputText] = useState("");
	const {pathname } = useLocation();
	const privatePaths = ['eventUser', 'eventManage']
	
  return (
    <>
			{
				(privatePaths.some(el => pathname.includes(el))) ? <PrivateHeader/> : <MainHeader setInputText={setInputText}/>
			}
			<div className="page-body px-[20px] sm:px-[150px] md:px-[230px]">
					<Outlet context={[inputText, setInputText]}/>
			</div>
    </>
  )
}

export default Layout;