import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = (props) => {

    const history = useNavigate();

    const [credentials, setcredentials] = useState({name: "", email: "", password: "", cpassword: ""})


    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {name, email, password } = credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });

        const json = await response.json();
        console.log(json)
        if (json.success) {
            //save the authtoken and redirect
            localStorage.setItem('token', json.authtoken);
            history('/')
            props.showAlert("Account created successfully", "success")

        }
        else{
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    return (
        <div className="container w-50 my-3">

            <h1>Get started with a free account</h1>
            <form className="row g-3 my-3" onSubmit={handleSubmit}>

                <div className="col-12">
                    <label htmlFor="inputAddress" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" placeholder="Enter your name" value={credentials.name} onChange={onChange} />
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" autoComplete="username" value={credentials.email} onChange={onChange} />
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputPassword4" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} autoComplete="current-password" minLength={5} required/>
                </div>

                <div className="col-md-12">
                    <label htmlFor="inputCPassword" className="form-label">Confirm Password</label>
                    <input type="Password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange} />
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </div>
            </form>

        </div>
    )
}

export default SignUp