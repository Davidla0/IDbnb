import { useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { getOrder, saveOrder } from "../store/order.actions"
import { CalcReserve } from "./calc-reserve"


import { ReactComponent as Star } from '../assets/icons/star.svg';
import { ReactComponent as Plus } from '../assets/img/vector/plus.svg';
import { ReactComponent as Minus } from '../assets/img/vector/minus.svg';
import { userService } from "../services/user.service"
import { showErrorMsg } from "../services/event-bus.service"


export const Reserve = ({ stay, avgRate }) => {

    let { order } = useSelector(state => state.orderModule)
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [guestsCount, setGuestsCount] = useState({
        adults: 1,
        children: 0,
        infants: 0,
        pets: 0,
    })

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const onClick = (category, action) => {
        action = action === '+' ? 1 : -1
        if (guestsCount[category] + action < 0 || action > stay.capacity) return
        guestsCount[category] += action
        setGuestsCount(prevGuestsCount => ({ ...prevGuestsCount }))
    }

    const submitReserve = () => {
        if(!userService.getLoggedinUser()) return showErrorMsg('must Logged in')
        const guests = guestsCount
        const currOrder = { ...order, guests }
        dispatch(saveOrder(currOrder)).then(
        navigate("/summary", {
            state: {
                stay,
                order
            },
        }));
    }

    // const calcTotal = async (total) => {
    //     const newOrder = await dispatch(getOrder(stay, { ...order, total }))
    // }

    const mouseMove = (e) => {
        const rect = e.target.getBoundingClientRect();
        const mouseX = e.pageX - e.currentTarget.offsetLeft;
        const mouseY = e.pageY - e.currentTarget.offsetTop;
        e.currentTarget.style.cssText = `
    --mouse-x: ${mouseX}; 
    --mouse-y: ${mouseY};
  `;
    }


    if(!order) return <h1>Loading..</h1>
    return (
        <div className="reserve-section" >
            <div className="reserve-form">
                <div className="reserve">
                    <div className="reserve-form">
                        <div className="reserve-header">
                            <div>
                                <div><span className="price">${stay.price}</span><span> night</span></div>
                            </div>
                            <div className="reserve-rate">
                                <div className="reserve-star"><span className="star"><Star /></span><span className="avg-rate"> {avgRate} &middot;</span></div>
                                <button className="reserve-reviews"><div>{stay.reviews.length} reviews</div></button>
                            </div>
                        </div>

                        <div className="reserve-info">
                            <div className="pick-dates">
                                <div className="dates-first-layer">
                                    <div className="dates-second-layer">
                                        <button className="reserve-dates">
                                            <div className="check-in">
                                                <div className="txt-reserve">Check-in</div>
                                                <div className="date-reserve">{order.startDate ? order.startDate : ''}</div>
                                            </div>
                                            <div className="check-out">
                                                <div className="txt-reserve">Check-out</div>
                                                <div className="date-reserve">{order.endDate ? order.endDate : ''}</div>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="guest-info">
                                <div className="guest-first-layer">
                                    <div className="guest-details-layer">
                                        <div className="guest-final-details">
                                            <button className="guests-details" onClick={() => toggleMenu()}>
                                                <div className="title">Guests</div>
                                                <div className="guest-section">
                                                    <div className="guest-description">
                                                        {guestsCount.adults + guestsCount.children} guest
                                                        {(guestsCount.infants) ? ',' + guestsCount.infants + 'infants' : ''}
                                                        {(guestsCount.pets) ? ',' + guestsCount.pets + 'pets' : ''}
                                                    </div>
                                                </div>

                                            </button>
                                        </div>
                                        {isOpen &&

                                            <div className="select-guests">
                                                <div className="pick-guest-account">
                                                    <div>
                                                        <h3>Adults</h3>
                                                        <h5>Age 13+</h5>
                                                    </div>
                                                    <div className="choose-amount">
                                                        <div>
                                                        <button onClick={() => onClick('adults', '-')}><Minus/></button>
                                                            <span>{guestsCount.adults}</span>
                                                            <button onClick={() => onClick('adults', '+')}><Plus/></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="pick-guest-account">
                                                    <div>
                                                        <h3>Children</h3>
                                                        <h5>Ages 2-12</h5>
                                                    </div>
                                                    <div className="choose-amount">
                                                        <div>
                                                            <button onClick={() => onClick('children', '-')}><Minus/></button>
                                                            <span>{guestsCount.children}</span>
                                                            <button onClick={() => onClick('children', '+')}><Plus/></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="pick-guest-account">
                                                    <div>
                                                        <h3>Infants</h3>
                                                        <h5>Under 2</h5>
                                                    </div>
                                                    <div className="choose-amount">
                                                        <div>
                                                            <button onClick={() => onClick('infants', '-')}><Minus/></button>
                                                            <span>{guestsCount.infants}</span>
                                                            <button onClick={() => onClick('infants', '+')}><Plus/></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="pick-guest-account">
                                                    <div>
                                                        <h3>Pets</h3>
                                                    </div>
                                                    <div className="choose-amount">
                                                        <div>
                                                            <button onClick={() => onClick('pets', '-')}><Minus/></button>
                                                            <span>{guestsCount.pets}</span>
                                                            <button onClick={() => onClick('pets', '+')}><Plus/></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="close-btn-reserve" onClick={() => toggleMenu()}>close</button>
                                            </div>
                                        }
                                    </div>

                                </div>


                            </div>
                        </div>

                        <div className="reserve-btn-section">
                            {/* <Link to={{ pathname: "/summary/", state: {order: order}}}> */}
                            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100" onClick={() => submitReserve()}>
                                <button onMouseMove={(e) => mouseMove(e)} id="gradientBtn">
                                    <span className="absolute inset-0 gradient opacity-0 transition-opacity duration-300"></span>
                                    <span className="relative z-1 pointer-events-none">Reserve</span>
                                </button>
                            </div>

                            {/* </Link> */}
                        </div>

                        {order.endDate &&
                            <section>
                                <div className="msg-txt">
                                    <div>You won't be charged yet</div>
                                </div>
                                <CalcReserve stay={stay}/>
                            </section>
                        }

                    </div>
                </div>
            </div>
        </div>


    )
}