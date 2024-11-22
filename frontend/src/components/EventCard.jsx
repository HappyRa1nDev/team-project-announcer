import { NavItem } from "./NavItem";

const EventCard = (props) => {
	const getWeekDay = (eventDate) => {
		const date = new Date(eventDate).getDay();
		let day = null;
		try {
			day = props.days[date];
			return day;
		}
		catch (e) {
			console.log(`Ошибка получения дня недели ${props.event.id}`);
		}
	}
	
	const getCategory = (eventCategory) => {
		let category = null;
		try {
			category = props.categories[eventCategory];
			return category;
		}
		catch (e) {
			console.log(`Ошибка получения категории ${props.event.id}`)
		}
	}

	const getLocation = (eventLocation) => {
		let place = null;
		try {
			place = props.places[eventLocation];
			return place;
		}
		catch (e) {
			console.log(`Ошибка получения площадки ${props.event.id}`)
		}
	}

	return (
		<div  className="justify-center items-center flex flex-col md:items-start md:justify-start md:flex md:flex-row h-[500px] md:h-[250px] md:w-1/2 md:space-y-0 md:space-x-[15px]">
			<img  className="w-[250px] h-[250px] border border-[#F5F5FA]/30 rounded-[20px]" src="./src/assets/rammstein_preview.jpg" alt=""/>
			<div  className="flex flex-col items-center md:justify-start md:items-start h-[250px]">
				<div   className='flex space-x-[10px] text-[#394770] text-2xl'>
					<p  className="font-extrabold">2</p>
					<p  >|</p>
					<p  >{getWeekDay(props.event.date)}</p>
					<p  >•</p>
					<p  >{getCategory(props.event.category)}</p>
					{
						props.isCanEdit && (
								<NavItem to={`/eventManage/edit/${props.event.id}`} className="material-icons">edit</NavItem>
						)
					}
				</div>
				<p  className="text-[#F5F5FA] text-2xl font-extrabold">{props.event.title}</p>
				<div  className="flex items-center space-x-[10px]">
					<span  className="material-icons text-[#F5F5FA]">location_on</span>
					<p  className="text-[#F5F5FA] text-xl">{getLocation(props.event.location)}</p>
				</div>
				<div  className="overflow-y-scroll text-[#7A7E8B] md:text-start text-center">
					<p  className="text-medium">
						{props.event.description}
					</p>	
				</div>
			</div>
		</div>
	);
};

export {EventCard};