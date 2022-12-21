import { NavLink } from "react-router-dom";

import { HeaderFilter } from "./header-filter";
import { HeaderProfile } from "./header-profile";
import logo from '../assets/img/logo48.png'

export function MainHeader(){


   return <section className='container flex'>
            <NavLink to='/'>
                <div className='logo-container flex'>
                    <img src={logo} alt='logo' style={{ maxWidth: '37px' }} />
                    <span>idebnb</span>
                </div>
            </NavLink>
            <HeaderFilter />
            <div className='flex'>
                <NavLink to='edit'>
                    <span className='become-host-link'>Become a host</span>
                </NavLink>
                <HeaderProfile />
            </div>
        </section>
}