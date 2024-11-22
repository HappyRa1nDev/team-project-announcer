import { Link, useMatch } from 'react-router-dom';

const NavItem = ({ children, to, ...props }) => {
	const match = useMatch({
		path: to,
		end: to.length === 1
	});
	return (
		<div className='inline-block'>
			<Link to={to} {...props}>{children}</Link>
			{match && (
						<div className='bg-[#f5f5fa] h-[1px] w-full'>
						</div>
					)}
		</div>
	);
};

export {NavItem};