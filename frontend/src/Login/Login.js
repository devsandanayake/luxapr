import React from 'react'
import './Login.css'
import background from '../Images/ap5.jpg'

export default function Login() {
    return (
        <>
            <div 
                className='flex items-center justify-center' 
                style={{ 
                    height: 'calc(100vh - 60px)', 
                    backgroundImage: `url(${background})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center',
                }}
            >
                <div className="form-container border border-white">
                    <p className="title">Login</p>
                    <form className="form">
                        <div className="input-group">
                            <label htmlFor="username">E-mail</label>
                            <input type="text" name="username" id="username" placeholder="" />
                        </div>
                        <div className="input-group ">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" placeholder=""/>
                            <div className="forgot">
                                <a rel="noopener noreferrer" href="#">Forgot Password ?</a>
                            </div>
                        </div>
                        <button className="sign mt-2">Sign in</button>
                    </form>
                    <p className="signup mt-2">Don't have an account? 
                        &nbsp;<a rel="noopener noreferrer" href="#" className="">Sign up</a>
                    </p>
                </div>
            </div>
        </>
    )
}