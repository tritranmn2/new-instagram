import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { getCookie, setCookie, getCookies } from 'typescript-cookie';
const Home = () => {
    const router = useRouter();
    useEffect(() => {
        const data: any = getCookie('data');
        const { accessTokenFacebook, user } = JSON.parse(data);
        setCookie('accessTokenFacebook', accessTokenFacebook);

        // console.log('user', user);
    });
    return <div className="text-yellow-500">Home</div>;
};

export default Home;
