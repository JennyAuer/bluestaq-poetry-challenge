import React, { useEffect, useState } from 'react';
import './AuthorPage.css';
import axios from 'axios';

export const AuthorPage: React.FC<{}> = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('https://poetrydb.org/author')
            .then(response => {
                setPosts(response.data.authors);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    console.log("test endpoint call: ", posts);


    return (
        <div>It worked! 
             {posts.map(post => (
                <li>{post}</li>
             ))}
        </div>
        
    )
}
