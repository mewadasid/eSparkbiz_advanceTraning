
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function Userdetail() {

    const [userdata, setUserData] = useState([]);
    const fetchUser = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();
            // console.log(data);
            if (data) {
                setUserData(data);
            }

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchUser();
    }, [])

   function fetchAddress(address){
    console.log(address);
  
    let useraddress ='';
 
    if(address)
    {
        for (const key in address) {
            if(key !== 'geo')
               useraddress = useraddress.concat(", ",address[key]); 
            }
            useraddress = useraddress.substring(1);   
            return useraddress;
    }
   }
    return (
        <div className='user_table'>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Adress</th>
                        <th>Post</th>
                    </tr>
                </thead>

                <tbody>
                    {userdata.map((data) => {
                        return(
                            <tr key={data.id}>
                            <td >{data.name}</td>
                            <td>{data.username}</td>
                            <td>{data.email}</td>
                            <td>{fetchAddress(data.address)}</td>
                            <td><Link to={'/post'} state={data.id} >View Post</Link></td>
                        </tr>
                        )
                       
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default Userdetail;