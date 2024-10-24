import React, { useEffect, useState } from 'react';
import './poemTable.css';
import axios from 'axios';


export const PoemTable: React.FC = () => {
    const [poemData, setPoemData] = React.useState([]);

    useEffect(() => {
        axios.get('https://poetrydb.org/titles')
            .then(response => {
                setPoemData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    console.log('here: ',)

    return(
        <div>Poem Table</div>
    )
}