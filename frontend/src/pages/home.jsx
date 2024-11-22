import { useLoaderData, Await, defer, useOutletContext } from 'react-router-dom';
import { Suspense } from 'react';
import { EventCard } from '../components/EventCard';
import { Loader } from '../components/Loader';

const Home = () => {
    const {events} = useLoaderData();

    const [inputText, setInputText] = useOutletContext();

    // const todayEvents = events.filter(event => new Date(event.date).getDate() === new Date().getDate());

    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    // const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    const places = ['Дворец Молодёжи', 'ДК Железнодорожников', 'ДК им. А.Г.Солдатова', 'ДК им. А.П.Чехова', 'ДК им. А.С.Пушкина', 
                        'ДК им. В.И.Ленина', 'ДС  «Орлёнок»', 'КДЦ «Мотовилиха»', 'Киномакс', 'Клуб «День & ночь»', 'Клуб «Дом культуры»', 'Клуб «М5»', 
                        'Клуб «Мичурин»', 'Краеведческий музей', 'Музей пермских древностей', 'Музей современного искусства Permm', 'Музей-Диорама', 'Набережная', 'Парк Горького', 
                        'Планетарий', 'Синема 5 Пермь', 'Синема Парк Планета', 'Синема Парк Семья', 'СпешиLove', 'Стадион  «Динамо»', 
                        'Стадион  «Трудовые резервы»', 'Стадион  «Юность»', 'Театр «У Моста»', 'Театр кукол', 'Театр оперы и балета', 'Театр юного зрителя', 
                        'Театр-Театр', 'УДС  «Молот»', 'Художественная галерея', 'Цирк', 'Эспланада'];

    const categories = ['Выставки', 'Детям', 'Диджей-сеты', 'Квесты', 'Кино', 'Конкурсы', 'Конференции', 'Концерты', 'Лекции', 'Мастер-классы', 'Мюзиклы', 'Спорт', 'Стендап', 'Театр', 'Фестивали', 'Хакатоны', 'Шоу', 'Экскурсии'];

    return (
        <>
            <div className='space-y-[30px] mt-[25px] md:mt-[50px]'>
            <Suspense fallback={<Loader/>}>
                <Await resolve={events}>
                    {
                        (resolvedEvents) => resolvedEvents.filter((event) => {
                            if (inputText === '') {
                                return event;
                            }
                            else {
                                return event.title.toLowerCase().includes(inputText);
                            }
                        }).map((event, index) => (
                            <div key={index} className={'w-full flex ' + ((index + 1) % 2 == 0 ? 'justify-end' : 'justify-start')}>
                                <EventCard  isCanEdit={false}
                                            event={event} 
                                            days={days} 
                                            places={places}
                                            categories={categories}/>
                            </div>
                        ))
                    }
                </Await>
            </Suspense>
            </div>
        </>
    );
};

async function getEvents() {
    const res = await fetch('http://localhost:8000/api/events/')
    return res.json()
}

const eventLoader = async () => {
    return defer({
        events: getEvents()
    })
}

export { Home, eventLoader } ;
