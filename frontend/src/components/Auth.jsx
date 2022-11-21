import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';

export default function Auth({ setUser, setIsAuthenticated }) {

   const [isLoginPage, setIsLoginPage] = React.useState(true);
   const [Loading, setLoading] = React.useState(true);
   const [name, setName] = React.useState('');
   const [email, setEmail] = React.useState('');
   const [password, setPassword] = React.useState('');
   const [confirmPassword, setConfirmPassword] = React.useState('');
   const [err, setErr] = React.useState('');

   const handleLogin = (e) => {
      e.preventDefault();

      setLoading(true);
      axios.post(process.env.REACT_APP_baseURL + '/auth/login', {
         email,
         password
      }, {})
         .then(res => {
            setLoading(false);
            localStorage.setItem('token', res.data.access_token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            setUser(res.data.user);
            setIsAuthenticated(true);

         })
         .catch(err => {
            setLoading(false);
            setErr(err.response.data.message);
         })
   }

   const handleRegister = (e) => {
      e.preventDefault();

      if (password !== confirmPassword) {
         alert('Passwords do not match!');
         return;
      }
      setLoading(true);
      axios.post(process.env.REACT_APP_baseURL + '/auth/register', {
         name,
         email,
         password,
      }, {})
         .then(res => {
            setLoading(false);
            console.log(res);
            setIsLoginPage(true);
         })
         .catch(err => {
            setLoading(false);
            setErr(err.response.data.message);
         })
   }

   useEffect(() => {
      setLoading(false);
      setConfirmPassword('');
      setEmail('');
      setName('');
      setPassword('');

   }, [isLoginPage]);

   return (
      <>
         {
            Loading ? <div className='h4 mt-5 text-center'>Loading...</div> : err !== '' ? <div className='h4 mt-5 text-danger text-center'>{err}</div> :
               <div className="container mt-5">
                  <div className="row justify-content-center">
                     <div className="col-md-6">
                        <div className="card shadow-sm">
                           {
                              isLoginPage ?
                                 <div className="card-body p-5">
                                    <h1 className="main-heading text-center mb-4">Login</h1>
                                    <form onSubmit={handleLogin}>

                                       <div className="row mb-3">
                                          <label htmlFor="email" className="col-md-4 col-form-label text-md-end">Email Address</label>
                                          <div className="col-md-6">
                                             <input value={email} id="email" type="email" className="form-control " name="email" required autoFocus
                                                onChange={(e) => setEmail(e.target.value)} />
                                          </div>
                                       </div>

                                       <div className="row mb-3">
                                          <label htmlFor="password" className="col-md-4 col-form-label text-md-end">Password</label>
                                          <div className="col-md-6">
                                             <input value={password} id="password" type="password" className="form-control " name="password" required
                                                onChange={(e) => setPassword(e.target.value)} />
                                          </div>
                                       </div>

                                       <div className="row mb-0 mt-5">
                                          <div className="col-md-8 offset-md-3">
                                             <button type="submit" className="btn btn-primary py-1 px-4">
                                                Login
                                             </button>

                                             <span className="text-primary ps-4 " role={'button'} onClick={() => setIsLoginPage(false)} >
                                                Create an account
                                             </span>
                                          </div>
                                       </div>
                                    </form>
                                 </div> :
                                 <div className="card-body p-5">
                                    <h1 className="main-heading text-center mb-4">Register</h1>
                                    <form onSubmit={handleRegister}>
                                       <div className="row mb-3">
                                          <label htmlFor="email" className="col-md-4 col-form-label text-md-end">Name</label>
                                          <div className="col-md-6">
                                             <input value={name} id="text" type="name" className="form-control " name="name" required autoFocus
                                                onChange={(e) => setName(e.target.value)} />
                                          </div>
                                       </div>
                                       <div className="row mb-3">
                                          <label htmlFor="email" className="col-md-4 col-form-label text-md-end">Email Address</label>
                                          <div className="col-md-6">
                                             <input value={email} id="email" type="email" className="form-control " name="email" required autoFocus
                                                onChange={(e) => setEmail(e.target.value)} />
                                          </div>
                                       </div>

                                       <div className="row mb-3">
                                          <label htmlFor="password" className="col-md-4 col-form-label text-md-end">Password</label>
                                          <div className="col-md-6">
                                             <input value={password} id="password" type="password" className="form-control " name="password" required
                                                onChange={(e) => setPassword(e.target.value)} />
                                          </div>
                                       </div>

                                       <div className="row mb-3">
                                          <label htmlFor="confirm_password" className="col-md-4 col-form-label text-md-end">Confirm Password</label>
                                          <div className="col-md-6">
                                             <input value={confirmPassword} id="confirm_password" type="password" className="form-control " name="confirm_password" required
                                                onChange={(e) => setConfirmPassword(e.target.value)} />
                                          </div>
                                       </div>

                                       <div className="row mb-0 mt-4">
                                          <div className="col-md-8 offset-md-3">
                                             <button type="submit" className="btn btn-primary py-1 px-4">
                                                Register
                                             </button>

                                             <span className="text-primary ps-4 " role={'button'} onClick={() => setIsLoginPage(true)} >
                                                Already have an account?
                                             </span>
                                          </div>
                                       </div>
                                    </form>
                                 </div>
                           }
                        </div>
                     </div>
                  </div>
               </div>
         }
      </>

   )
}
