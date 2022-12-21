import { NavLink, useLocation } from 'react-router-dom'

import { HeaderFilter } from './header-filter'
import { HeaderProfile } from './header-profile'
import { HeaderExpandedFilter } from './header-expanded-filter'

import logo from '../../assets/img/logo48.png'

export function AppHeader({ layoutClass, onClickHeaderFilter, isHeaderFilterOpen }) {

    const pathname = useLocation().pathname
    const filterBy = pathname.split('/')

    const checkIn = filterBy[1] === 'null' ? JSON.parse(filterBy[1]) : filterBy[1]
    const checkOut = filterBy[2] === 'null' ? JSON.parse(filterBy[2]) : filterBy[2]
    const guests = {
        adultsGuests: filterBy[3] ? +filterBy[3] : 0,
        childrenGuests: filterBy[4] ? +filterBy[4] : 0,
        infantsGuests: filterBy[5] ? +filterBy[5] : 0,
        petsGuests: filterBy[6] ? +filterBy[6] : 0
    }

    const guestsCount = guests.adultsGuests + guests.childrenGuests + guests.infantsGuests + guests.petsGuests

    return <header className={`${layoutClass ? 'main-layout-details details-header flex full' : 'main-layout app-header flex full'} `}>
        <section className='flex'>
            <NavLink to='/'>
                <div className='logo-container flex'>
                    <img src={logo} alt='logo' style={{ maxWidth: '37px' }} />
                    <span>idebnb</span>
                </div>
            </NavLink>
            {layoutClass ? <input type="text" /> :
                isHeaderFilterOpen ?
                    !layoutClass && <div className='filters-container' >
                        <div className='expanded-filter-stay'>
                            <p >Stays</p>
                        </div>
                        <HeaderExpandedFilter onClickHeaderFilter={onClickHeaderFilter} checkIn={checkIn}
                            checkOut={checkOut} guests={guests} />
                    </div> :

                    <HeaderFilter onClickHeaderFilter={onClickHeaderFilter} isHeaderFilterOpen={isHeaderFilterOpen}
                        checkIn={checkIn} checkOut={checkOut} guestsCount={guestsCount} />
            }
            <div className='flex'>
                <NavLink to='edit'>
                    <span className='become-host-link'>Become a host</span>
                </NavLink>
                <HeaderProfile />
            </div>

        </section>

    </header>
}