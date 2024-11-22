import { useEffect, useState } from 'react';
import useAxios from '../utils/useAxios';
import { Calendar } from '../components/Calendar';
import { useAuthStore } from '../store/auth';
import { useParams } from 'react-router-dom';

const EditEvent = () => {
    const api = useAxios();
		const {id} = useParams();
    const [showCalendar, setShowCalendar] = useState(false);
		const [event, setEvent] = useState(null);

		const [formData, setFormData] = useState({
			title: '',
			category: '',
			location: '',
			date: '',
			time: '',
			description: ''
	});
	
	useEffect(() => {
			api.get(`/events/personal/${id}/`).then((response) => {
					const eventData = response.data;
					setEvent(eventData);
					const date = new Date(eventData.date);
					const day = String(date.getDate()).padStart(2, '0');
					const month = String(date.getMonth() + 1).padStart(2, '0');
					const year = date.getFullYear();
					const formattedDate = `${day}.${month}.${year}`;
					const hours = String(date.getHours()).padStart(2, '0');
					const minutes = String(date.getMinutes()).padStart(2, '0');
					const formattedTime = `${hours}:${minutes}`;
					setFormData((prevState) => ({
							...prevState,
							title: eventData.title,
							category: eventData.category,
							location: eventData.location,
							date: formattedDate,
							time: formattedTime,
							description: eventData.description
					}));
			});
	}, [id]);
	
	const user = useAuthStore((state) => state.user);
	
	const handleChange = (e) => {
			const { name, value } = e.target;
			setFormData((prevState) => ({
					...prevState,
					[name]: value
			}));
	};
	
	const handleSubmit = async (e) => {
			e.preventDefault();
			const dateParts = formData.date.split('.');
			const selectedDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${formData.time}`);
			const s = api.put(`events/personal/${id}/`, {
							id: id,
							title: formData.title,
							description: formData.description,
							category: categories.indexOf(formData.category),
							date: selectedDate,
							user: 0,
							location: places.indexOf(formData.location)
					})
					.catch((e) => console.log(e));
			console.log(s)
	};
	
	const today = new Date().toISOString().split('T')[0];
	
	const currentTime = new Date().toLocaleTimeString().slice(0, 5);
	
	const places = [
			'Дворец Молодёжи',
			'ДК Железнодорожников',
			'ДК им. А.Г.Солдатова',
			'ДК им. А.П.Чехова',
			'ДК им. А.С.Пушкина',
			'ДК им. В.И.Ленина',
			'ДС  «Орлёнок»',
			'КДЦ «Мотовилиха»',
			'Киномакс',
			'Клуб «День & ночь»',
			'Клуб «Дом культуры»',
			'Клуб «М5»',
			'Клуб «Мичурин»',
			'Краеведческий музей',
			'Музей пермских древностей',
			'Музей современного искусства Permm',
			'Музей-Диорама',
			'Набережная',
			'Парк Горького',
			'Планетарий',
			'Синема 5 Пермь',
			'Синема Парк Планета',
			'Синема Парк Семья',
			'СпешиLove',
			'Стадион  «Динамо»',
			'Стадион  «Трудовые резервы»',
			'Стадион  «Юность»',
			'Театр «У Моста»',
			'Театр кукол',
			'Театр оперы и балета',
			'Театр юного зрителя',
			'Театр-Театр',
			'УДС  «Молот»',
			'Художественная галерея',
			'Цирк',
			'Эспланада'
	];
	
	const categories = [
			'Выставки',
			'Детям',
			'Диджей-сеты',
			'Квесты',
			'Кино',
			'Конкурсы',
			'Конференции',
			'Концерты',
			'Лекции',
			'Мастер-классы',
			'Мюзиклы',
			'Спорт',
			'Стендап',
			'Театр',
			'Фестивали',
			'Хакатоны',
			'Шоу',
			'Экскурсии'
	];
	
	return (
			<form onSubmit={handleSubmit} className="max-w-lg mx-auto">
					<div className="mb-4">
							<label className="block text-sm font-medium text-[#f5f5fa]">Название</label>
							<input
									type="text"
									name="title"
									value={formData.title}
									onChange={handleChange}
									className="mt-1 p-2 border text-[#0c0f0f] border-gray-300 rounded-md focus:outline-none block w-full"
									required
							/>
					</div>
					<div className="mb-4">
							<label className="block text-sm font-medium text-[#f5f5fa]">Категория</label>
							<select
									type="text"
									name="category"
									value={formData.category}
									onChange={handleChange}
									className="mt-1 p-2 border text-[#0c0f0f] border-gray-300 rounded-md focus:outline-none block w-full"
									required
							>
									{categories.map((c, i) => (
											<option key={i}>{c}</option>
									))}
							</select>
					</div>
					<div className="mb-4">
							<label className="block text-sm font-medium text-[#f5f5fa]">Место проведения</label>
							<select
									type="text"
									name="location"
									value={formData.location}
									onChange={handleChange}
									className="mt-1 p-2 border text-[#0c0f0f] border-gray-300 rounded-md focus:outline-none block w-full"
									required
							>
									{places.map((p, i) => (
											<option key={i}>{p}</option>
									))}
							</select>
					</div>
					<div className="mb-4">
							<label className="block text-sm font-medium text-[#f5f5fa]">Дата</label>
							<div className="relative">
									<input
											type="text"
											name="date"
											value={formData.date}
											onChange={handleChange}
											className="mt-1 p-2 border text-[#0c0f0f] border-gray-300 rounded-md focus:outline-none block w-full"
											onClick={() => setShowCalendar(true)}
											readOnly
									/>
									{showCalendar && (
											<div className="absolute right-0 mt-2">
													<Calendar setShowCalendar={setShowCalendar} setFormData={setFormData} />
											</div>
									)}
							</div>
					</div>
					<div className="mb-4">
							<label className="block text-sm font-medium text-[#f5f5fa]">Время</label>
							<input
									type="time"
									name="time"
									min={formData.date === today ? currentTime : undefined}
									value={formData.time}
									onChange={handleChange}
									className="mt-1 p-2 border text-[#0c0f0f] border-gray-300 rounded-md focus:outline-none block w-full"
									required
							/>
					</div>
					<div className="mb-4">
							<label className="block text-sm font-medium text-[#f5f5fa]">Описание</label>
							<textarea
									name="description"
									value={formData.description}
									onChange={handleChange}
									className="mt-1 p-2 border text-[#0c0f0f] border-gray-300 rounded-md focus:outline-none block w-full"
									rows="4"
									required
							/>
					</div>
					<div className="text-center">
							<button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
									Сохранить
							</button>
					</div>
			</form>
	);
};

export default EditEvent;
