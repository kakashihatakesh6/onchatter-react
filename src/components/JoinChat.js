import React from 'react'
import { useNavigate } from 'react-router-dom'

const JoinChat = () => {

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const username = event.target.elements.name.value;
        const room = event.target.elements.room.value;
    
        //   const newUrl = `${location.pathname}?name=${name}&email=${room}`;
        const newUrl = `/chat?name=${username}&room=${room}`;

        if (username && room) {
            navigate(newUrl);
        }else{
            alert("Enter details");
        }
        

    };

    return (
        <div>
            <div className="login-container row" >

                <form className='form-control form-chat' id="joinChat-form" method='GET' onSubmit={handleSubmit}>
                    <h1 className='joinchat-header'>Welcome to OnChatter</h1>
                    <div className="name-box my-4">
                        <label htmlFor="inputCity"><h4>Enter Your Name</h4></label>
                        <input type="text" className="form-control form-control-lg name-input" placeholder='Enter Your Name' name="name" id="name" />
                    </div>
                    
                    <select className="form-select select-input my-3 form-select-lg mb-3" name="room" id="room" aria-label="Default select example">
                        <option value="India">Select Room</option>
                        <option value="London">London</option>
                        <option value="Banaras">Banaras</option>
                        <option value="Newyork">Newyork</option>
                        <option value="Tokyo">Tokyo</option>
                    </select>

                    <button type="submit" className="btn btn-primary btn-lg my-2 btn-joinChat" >Submit</button>

                </form>
               
            </div>


        </div>
    )
}

export default JoinChat