import { Link } from 'react-router-dom'

const Notfound = () => {
    return (
        <div className="fixed inset-0 bg-[#0F0C0C]/70 flex justify-center items-center backdrop-blur-md">
            <p className='text-[#888] text-center'>Страница не найдена. Перейти на <Link className='text-[#f5f5fa]' to="/"> главную страницу</Link></p>
        </div>
    )
}

export {Notfound};