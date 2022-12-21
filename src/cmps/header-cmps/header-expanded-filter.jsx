import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { useState } from 'react'

import { loadStays, setFilterBy } from '../../store/stay.actions'
import { useFormRegister } from '../../hooks/useFormRegister'
import search from '../../assets/img/search-icon.png'
import { GustSelection } from './guests-selection'
import CustomDateRangePickerDay, {  } from '../calender-date-picker'


export function HeaderExpandedFilter({ onClickHeaderFilter, checkIn, checkOut, guests }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isGustSelectionOpen, setIsGustSelectionOpen] = useState(false)

    const onOpenGuestsFilter = () => {
        setIsGustSelectionOpen(!isGustSelectionOpen)
    }

    const onChangeFilter = (filterBy) => {
        dispatch(setFilterBy(filterBy))
        dispatch(loadStays())
    }

    const [register, setFilter, filterBy] = useFormRegister({
        where: '',
        checkInDate: checkIn,
        checkOutDate: checkOut,
        guestsCount: {
            adults: guests.adultsGuests,
            children: guests.childrenGuests,
            infants: guests.infantsGuests,
            pets: guests.petsGuests,
        }
    }, onChangeFilter)

    const changeDates = (checkInDate, checkOutDate) => {
        setFilter(filterBy => ({ ...filterBy, checkInDate: checkInDate }))
        setFilter(filterBy => ({ ...filterBy, checkOutDate: checkOutDate }))
    }

    const changeWho = (category, action) => {
        const { guestsCount } = filterBy
        if (guestsCount[category] + action < 0) return
        guestsCount[category] += action
        setFilter(filterBy => ({ ...filterBy }))
    }

    const onFilterClicked = () => {
        onClickHeaderFilter()
        const checkInDate = filterBy.checkInDate ? format(new Date(filterBy.checkInDate), 'yyyy-MM-dd') : null
        const checkOutDate = filterBy.checkOutDate ? format(new Date(filterBy.checkOutDate), 'yyyy-MM-dd') : null
        navigate(`/${checkInDate}/${checkOutDate}/${guestsCount.adults}/${guestsCount.children}/${guestsCount.infants}/${guestsCount.pets}`)
    }

    const { guestsCount } = filterBy
    const { adults, children, infants, pets } = guestsCount
    const whoCount = adults + children + infants + pets
    return (
        <section className="header-filter header-filter-expanded">
            <div className='header-expanded-filter'>

                <div className="where-filter">
                    <label htmlFor="">where</label>
                    <input className='filter-input' placeholder='Search destination' {...register('where', 'text')} />
                </div>

                <span></span>

                <div className="when-filter">
                    <CustomDateRangePickerDay onOpenGuestsFilter={onOpenGuestsFilter} changeDates={changeDates} checkInDate={checkIn} checkOutDate={checkOut} />
                </div>

                <span></span>

                <div className="who-filter-container">
                    <div className="who-filter" onClick={onOpenGuestsFilter}>
                        <p>who</p>
                        <span>{whoCount ? whoCount + ' guests' : 'Add guests'}</span>
                    </div>
                </div>
                <button className="expanded-search-btn" onClick={onFilterClicked}>
                    <div>
                        <img src={search} alt="" />
                        <p>search </p>
                    </div>
                </button>
            </div>
            {isGustSelectionOpen && <GustSelection changeWho={changeWho} guestsCount={guestsCount} />}
        </section>
    )
}