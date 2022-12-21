import search from '../../assets/img/search-icon.png'

export function HeaderFilter({ onClickHeaderFilter, checkIn, checkOut, guestsCount }) {

    const checkIndDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)

    const checkInMonth = checkIndDate.toLocaleString('en-US', { month: 'short' })
    const checkOutInMonth = checkOutDate.toLocaleString('en-US', { month: 'short' })

    return (
        <section className="header-filter header-filter-position">
            <div className='filter-contaner'>
                <button className='header-btn first-header-btn' onClick={onClickHeaderFilter}>Anywhere</button>
                <span></span>
                <button className='header-btn' onClick={onClickHeaderFilter}>
                    {checkIn && checkOut ? < > {checkInMonth} {checkIndDate.getDate()} - {checkOutInMonth} {checkOutDate.getDate()} </> : <> Any week</>}
                </button>
                <span></span>
                <button className={`header-btn search-last-btn ${guestsCount ? 'guests-count' : ''}`} onClick={onClickHeaderFilter}>{guestsCount ? guestsCount + ' guests' : 'Add guests'}</button>
                <button className='search-btn ' onClick={onClickHeaderFilter}><img src={search} alt='img'/></button>
            </div>
        </section>
    )
}