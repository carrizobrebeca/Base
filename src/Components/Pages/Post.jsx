import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

const Post = ({
    id,
    description,
    userId,
    eventId,
    image
}) => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const user = useSelector((state) => state.login.user);
    const token = useSelector((state) => state.login.token);
    const [liked, setLiked] = useState(false);
    const [totalLikes, setTotalLikes] = useState(0);

    const handleLike = async () => {
        try {
            if (liked) {
                const res = await axios.post(
                    `http://localhost:3001/${id}/dislike`,
                    { userId: user.id }
                );
                setLiked(false);
                setTotalLikes(res.data.totalLikes);
            } else {
                const res = await axios.post(
                    `http://localhost:3001/${id}/like`,
                    { userId: user.id }
                );
                setLiked(true);
                setTotalLikes(res.data.totalLikes);
            }
        } catch (err) {
            console.error("Error al hacer (dis)like:", err);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:3001/users");
            const foundUser = response.data.find((r) => r.id === userId);
            setUsers(foundUser); // ahora `users` es un solo usuario, no un array

            const res = await axios.get("http://localhost:3001/event");
            const foundEvent = res.data.find((e) => e.id === eventId);
            setEvents(foundEvent); // mismo para evento
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };



    useEffect(() => {
        fetchUsers();
        checkIfLiked();
    }, []);

    const checkIfLiked = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/${id}/likers`);
            setTotalLikes(res.data.totalLikes);
            const isLiked = res.data.likers.some((liker) => liker.id === user.id);
            setLiked(isLiked);
            console.log(res);
            
        } catch (err) {
            console.error("Error verificando likes:", err);
        }
    };

    return (
        <div className='w-[100%] flex justify-center p-30 bg-gray-200 rounded-xl'>
            <header className="">
                <div className="text-sm font-semibold ">
                    <div className=" flex justify-between p-2">
                        <div onClick={() => navigate("/profileuser")} className="text-gray-600 flex items-center">
                            <img
                                src={users.image}
                                className="w-10 h-10 object-cover  rounded-full"
                            />
                        </div>
                        <div onClick={() => navigate("/profileuser")} className="text-gray-600 flex items-center">
                            <h2>{users.name}</h2>
                        </div>
                        <div onClick={() => navigate("/profileevent")} className="text-gray-600 flex items-center">
                            <h2>{events.name}</h2>
                        </div>
                    </div>
                    <div className="text-text flex justify-start p-2">
                        <h2>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                        </h2>
                        <h2>{events.location}</h2>
                    </div>
                    <div className="flex justify-center items-center pb-2">

                        <img onClick={() => navigate("/max")}
                            src={image}
                            className="object-cover w-[400px] "
                        />
                    </div>
                    <div className="flex justify-start items-center pb-2">
                        <h2>{description}</h2>
                    </div>

                    <div className=" flex justify-between p-2">
                        <div key={id} className="text-gray-600 flex items-center">
                            <div className="text-gray-600 flex items-center">
                                <button onClick={handleLike} className="text-xl">
                                    {liked ? '❤️' : '🤍'}
                                </button>
                                <span className="ml-2">{totalLikes}</span>
                            </div>
                        </div>
                        <div onClick={() => navigate("/profileuser")} className="text-gray-600 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                            </svg>

                        </div>
                        <div className="text-gray-600 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                            </svg>


                        </div>
                        <div className="text-gray-600 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                            </svg>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Post
