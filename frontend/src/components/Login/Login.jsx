import React, { useState } from 'react'
import './Login.css'


const Login = () => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loginState, setloginState] = useState("Log in");

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 login-page'>
        <div className='p-3 rounded w-25 border login-form'>
            <h2 className='text-center'>Login</h2>
            <form>
                {loginState === "Register" ? 
                <div className='mb-3'>
                    <label htmlFor='name'><strong>Name</strong></label>
                    <input className='form-control rounded-0' type="text" name="name" placeholder='Enter name'
                        value={name} 
                        onChange={(e) => setName(e.currentTarget.value)}
                    />
                </div> : <></>}
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input className='form-control rounded-0' type="email" name="email" autoComplete='off' placeholder='Enter Email'
                        value={email} 
                        onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input className='form-control rounded-0' type="password" name="password" placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-3'>{loginState}</button>
                <div className='mb-3 text-center auth-change'>
                    {loginState === "Log in" ? 
                    <p>Click here to, <span onClick={() => setloginState("Register")}>Register</span></p> :
                     <p>Already a user? <span onClick={() => setloginState("Log in")}>Log in</span></p>}
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login