
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {loadUsers, onLogin, onSignUp} from '../store/user.actions'
import { useEffect } from 'react';

const theme = createTheme();

export function LoginSignup() {

  const dispatch = useDispatch()
  // const [credentials, setCredentials] = useState()
  const [isHaveCount, setIsHaveCount] = useState(true)
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    dispatch(loadUsers())

    // document.body.addEventListener('click', () => setIsOpen(false))

    // return () => document.body.removeEventListener('click', () => setIsOpen(false))

  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const credentials = {
      username: data.get('user-name'),
      password: data.get('password'),
      fullname: data.get('full-name') ? data.get('full-name') : ''
    }

    !credentials.fullname ? dispatch(onLogin(credentials)) : dispatch(onSignUp(credentials))
    
    setIsOpen(false)
  }

//   const clearState = () => {
//     // setCredentials({ username: '', password: '', fullname: ''})
//     setIsSignup(false)
// }


  return (
      <ThemeProvider theme={theme}>
        {isOpen && 

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Welcome to Idebnb
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          
              <TextField
                margin="normal"
                required
                fullWidth
                id="user-name"
                label="User name"
                name="user-name"
                autoComplete="current-name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {!isHaveCount && 
              <TextField
              margin="normal"
              required
              fullWidth
              name="full-name"
              label="Full name"
              type="full-name"
              id="full-name"
              autoComplete="current-full-name"
            />
              }
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="#" 
                  onClick={() => setIsHaveCount(false)} 
                  variant="body2"
                  style={!isHaveCount ? {"display": 'none'} : {"display": 'block'}}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              
            </Box>
          </Box>
        
        </Container>
         }
      </ThemeProvider>
    
  );
}

// import { useState, useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import { userService } from '../services/user.service'
// import { loadUsers } from '../store/user.actions'
// // import { ImgUploader } from '../cmps/img-uploader'

// export function LoginSignup(props) {
//     const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
//     const [isSignup, setIsSignup] = useState(false)
//     const [users, setUsers] = useState([])
//     const dispatch = useDispatch()

//     useEffect(() => {

//         async function load(){
//             const users = await dispatch(loadUsers())
//             setUsers(users)
//         }
//         load()
       
//     }, [])

    // const clearState = () => {
    //     setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
    //     setIsSignup(false)
    // }

//     const handleChange = ev => {
//         const field = ev.target.name;
//         const value = ev.target.value;
//         setCredentials({ ...credentials, [field]: value });
//     }

    // const onLogin = (ev = null) => {
    //     if (ev) ev.preventDefault();
    //     if (!credentials.username) return;
    //     dispatch(props.onLogin(credentials));
    //     clearState()
    //     // props.toggleOpen()
    // }

//     const onSignup = (ev = null) => {
//         if (ev) ev.preventDefault();
//         if (!credentials.username || !credentials.password || !credentials.fullname) return;
//         dispatch(props.onSignup(credentials));
//         clearState()
//         // props.toggleOpen()
//     }

//     const toggleSignup = () => {
//         setIsSignup(!isSignup)
//     }
//     // const onUploaded = (imgUrl) => {
//     //     setCredentials({ ...credentials, imgUrl });
//     // }

//     return (
//         <div className="login-section">
//             <p>
//                 <button className="btn-link" onClick={toggleSignup}>{!isSignup ? 'Signup' : 'Login'}</button>
//             </p>
//             {!isSignup && <form className="login-form" onSubmit={onLogin}>
//                 {/* <select
//                     name="username"
//                     value={credentials.username}
//                     onChange={handleChange}
//                 >
//                     <option value="">Select User</option>
//                     {users.map(user => <option key={user._id} value={user.username}>{user.fullname}</option>)}
//                 </select> */}
//                 <input
//                     type="text"
//                     name="username"
//                     value={credentials.username}
//                     placeholder="Username"
//                     onChange={handleChange}
//                     required
//                     autoFocus
//                 />
//                 <input
//                     type="password"
//                     name="password"
//                     value={credentials.password}
//                     placeholder="Password"
//                     onChange={handleChange}
//                     required
//                 />
//                 <button>Login!</button>
//             </form>}
//             <div className="signup-section">
//                 {isSignup && <form className="signup-form" onSubmit={onSignup}>
//                     <input
//                         type="text"
//                         name="fullname"
//                         value={credentials.fullname}
//                         placeholder="Fullname"
//                         onChange={handleChange}
//                         required
//                     />
//                     <input
//                         type="text"
//                         name="username"
//                         value={credentials.username}
//                         placeholder="Username"
//                         onChange={handleChange}
//                         required
//                     />
//                     <input
//                         type="password"
//                         name="password"
//                         value={credentials.password}
//                         placeholder="Password"
//                         onChange={handleChange}
//                         required
//                     />
//                     {/* <ImgUploader onUploaded={onUploaded}/>                     */}
//                     <button >Signup!</button>
//                 </form>}
//             </div>
//         </div>
//     )
// }
