import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Home = () => {
    const router = useRouter();
    useEffect(() => {
        const queryParams = router.query;
        // const decodedUserObject = JSON.parse(Buffer.from(queryParams?.data, 'base64').toString('utf-8'));
        console.log(queryParams);
    }, []);
    return <div className="text-yellow-500">Home</div>;
};

export default Home;
