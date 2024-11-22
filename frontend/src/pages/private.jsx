import { useEffect, useState } from 'react';
import useAxios from '../utils/useAxios';

const Private = () => {
    const [res, setRes] = useState('');
    const [posRes, setPostRes] = useState('');
    const api = useAxios();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/test/');
                setRes(response.data.response);
            } catch (error) {
                setPostRes(error.response.data);
            }
        };
        fetchData();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/test/', {
                text: e.target[0].value,
            });
            setPostRes(response.data.response);
        } catch (error) {
            setPostRes(error.response.data);
        }
    };
    const handleSubmit2 = (e) => {
        e.preventDefault();
        try {
            const response = api.get('/events/personal/');
            setPostRes(response.data.response);
        } catch (error) {
            setPostRes(error.response.data);
        }
    };
    const handleSubmit3 = (e) => {
        e.preventDefault();
        try {
            const response = api.get('/events/personal/' + e.target[0].value + '/');
            setPostRes(response.data.response);
        } catch (error) {
            setPostRes(error.response.data);
        }
    };
    const handleSubmit4 = (e) => {
        e.preventDefault();
        try {
            const response = api.put('/events/personal/' + e.target[0].value + '/',
            {
                title: 'aboba',
                description: "228", 
                category: 1,
                date: new Date().toUTCString,
                user: 0,
            });
            setPostRes(response.data.response);
        } catch (error) {
            setPostRes(error.response.data);
        }
    };
    const handleSubmit5 = (e) => {
        e.preventDefault();
        try {
            const response = api.post('/events/personal/',
            {
                title: 'aboba!',
                description: "228!", 
                category: 2,
                date: new Date().toUTCString,
                user: 0,
            });
            setPostRes(response.data.response);
        } catch (error) {
            setPostRes(error.response.data);
        }
    };

    return (
        <section>
            <h1 className='text-white'>Private</h1>
            <p className='text-white'>{res}</p>
            <form method="GET" onSubmit={handleSubmit5}>
                <input type="text" placeholder="Enter Text" />
                <button className='text-white' type="submit">Submit</button>
            </form>
            
            {posRes && <p>{posRes}</p>}
            
        </section>
    );
};

export default Private;
