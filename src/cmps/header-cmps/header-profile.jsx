import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import profile from '../../assets/img/user_header.png'
import { socketService } from '../../services/socket.service'
import { userService } from '../../services/user.service'
import { onLogout } from '../../store/user.actions'
import { LoginSignup } from '../login-signup'

export function HeaderProfile() {
    const [isOpen, setIsOpen] = useState(false)
    const [isSignIn, setIsSignIn] = useState(false)
    const user = useSelector(state => state.userModule.user)
    const navigate = useNavigate()

    const btnRef = useRef()
    const logRef = useRef()
    const dispatch = useDispatch()

    useEffect(() => {

        const closeMenu = e => {
            if (e.path[0] !== btnRef.current) setIsOpen(false)
        }

        document.body.addEventListener('click', closeMenu)

        return () => document.body.removeEventListener('click', closeMenu)
    }, [])

    // const toggleOpen = () => {
    //     setIsOpen(prev => !prev )
    // }



    const toggleSignIn = () => {
        if (logRef.current.innerText === 'Log out') {
            setIsSignIn(false)
            dispatch(onLogout())

            navigate('/')
        } else {
            setIsSignIn(true)
        }

    }

    return (<section className='header-profile-section'>
        <div className="header-profile" ref={btnRef} onClick={() => setIsOpen(prev => !prev)}>
            <p>☰</p>
            <img src={user ? user.imgUrl.thumbnail : profile} alt="" />
        </div>
        <div className={`header-menu-${isOpen}`}>
            <div className='login-signup-section'>
                <div onClick={() => toggleSignIn()}><p ref={logRef}>{!userService.getLoggedinUser() ? 'Log in' : 'Log out'}</p></div>
                <div onClick={() => {
                    setIsOpen(false)
                    navigate('Dashboard')
                }}><p>Dashboard</p></div>
                <div onClick={() => {
                    setIsOpen(false)
                    navigate('my-orders')
                }}><p>My Orders</p></div>
            </div>
        </div>

        {isSignIn && <div className="login-true"><LoginSignup /></div>}
    </section>
    )
}