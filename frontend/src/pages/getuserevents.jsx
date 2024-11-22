import { EventCard } from '../components/EventCard';
import useAxios from '../utils/useAxios';
import { useLoaderData, Await, defer } from 'react-router-dom';
import { Suspense } from 'react';
import { Loader } from '../components/Loader';

const api = useAxios();

const UserEvents = () => {
    const {events} = useLoaderData();
    
     const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    const places = ['Дворец Молодёжи', 'ДК Железнодорожников', 'ДК им. А.Г.Солдатова', 'ДК им. А.П.Чехова', 'ДК им. А.С.Пушкина', 
                        'ДК им. В.И.Ленина', 'ДС  «Орлёнок»', 'КДЦ «Мотовилиха»', 'Киномакс', 'Клуб «День & ночь»', 'Клуб «Дом культуры»', 'Клуб «М5»', 
                        'Клуб «Мичурин»', 'Краеведческий музей', 'Музей пермских древностей', 'Музей современного искусства Permm', 'Музей-Диорама', 'Набережная', 'Парк Горького', 
                        'Планетарий', 'Синема 5 Пермь', 'Синема Парк Планета', 'Синема Парк Семья', 'СпешиLove', 'Стадион  «Динамо»', '', 
                        'Стадион  «Трудовые резервы»', 'Стадион  «Юность»', 'Театр «У Моста»', 'Театр кукол', 'Театр оперы и балета', 'Театр юного зрителя', 
                        'Театр-Театр', 'УДС  «Молот»', 'Художественная галерея', 'Цирк', 'Эспланада'];

    const categories = ['Выставки', 'Детям', 'Диджей-сеты', 'Квесты', 'Кино', 'Конкурсы', 'Конференции', 'Концерты', 'Лекции', 'Мастер-классы', 'Мюзиклы', 'Спорт', 'Стендап', 'Театр', 'Фестивали', 'Хакатоны', 'Шоу', 'Экскурсии']
    
    return (
        <>
            <div className='space-y-[30px] mt-[25px] md:mt-[50px]'>
            <Suspense fallback={<Loader/>}>
                <Await resolve={events}>
                    {
                        (resolvedEvents) => resolvedEvents.map((event, index) => (
                            <div key={event.id} className={'w-full flex ' + ((index + 1) % 2 == 0 ? 'justify-end' : 'justify-start')}>
                                <EventCard  isCanEdit={true}
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
    return api.get('/events/personal/').then(r=>r.data);
}

const userEventLoader = async () => {
    return defer({
        events: getEvents()
    })
}

export { UserEvents, userEventLoader };