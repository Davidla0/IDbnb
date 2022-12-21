import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { HeaderFilter } from './header-filter'
import { HeaderProfile } from './header-cmps/header-profile'
import { HeaderExpandedFilter } from '../cmps/header-expanded-filter'

import logo from '../assets/img/logo48.png'

export function AppHeader({ layoutClass }) {

    const [isFilterOpen, setIsFilterOpen] = useState(false)

    const onFilterClicked = (ev) => {
        if (ev) ev.preventDefault()
        setIsFilterOpen(!isFilterOpen)
    }

    return <header className={`${layoutClass ? 'main-layout-details details-header flex full' : 'main-layout app-header flex full'} `}>
        <section className='container flex'>
            <NavLink to='/'>
                <div className='logo-container flex'>
                    <img src={logo} alt='logo' style={{ maxWidth: '37px' }} />
                    <span>idebnb</span>
                </div>
            </NavLink>
            {/*to fix here */}
            {isFilterOpen ?
                (< ><div className='expanded-filter-stay'><p >Stays</p> </div> <HeaderExpandedFilter onFilterClicked={onFilterClicked} /></>)
                : (<HeaderFilter onFilterClicked={onFilterClicked} isFilterOpen={isFilterOpen} />)}
            <div className='flex'>
                <NavLink to='edit'>
                    <span className='become-host-link'>Become a host</span>
                </NavLink>
                <HeaderProfile />
            </div>
        </section>

    </header>

}