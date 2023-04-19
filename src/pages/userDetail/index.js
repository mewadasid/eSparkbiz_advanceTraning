import './index.css';
import { useEffect } from 'react';

function Userdetail() {
    useEffect(() => {
        try {
            fetch('https://jsonplaceholder.typicode.com/users')
                .then(response => response.json())
                .then(json => console.log(json))
        } catch (error) {
            console.log(error);
        }

    })

    return (
        <div className='user_table'>
            
        </div>
    )
}

export default Userdetail;