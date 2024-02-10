import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {

    const [credentials, setcredentials] = useState({email: "", password: ""});
    let history = useNavigate();

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });

        const json = await response.json()
        console.log(json)
        if (json.success) {
            // save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Logged in Successfully", "success")
            history("/")
        }
        else{
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    return (
        <div>
            <h1 className='my-4'>Login to your Account</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" autoComplete="username" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} autoComplete="current-password"/>
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login