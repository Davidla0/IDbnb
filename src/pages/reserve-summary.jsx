
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { CalcReserve } from "../cmps/calc-reserve";

export const ReserveSummary = () => {

    const params = useLocation()
    const { guests: { adults, children, infants, pets }, startDate, endDate } = useSelector(state => state.orderModule.order)

    const { name, type, imgUrls } = params.state.stay
    const navigate = useNavigate()

    return <section className="summary-section">
        <div>
            <div>Your order summary is:</div>
        </div>
        <div className="stay-details">
            <div>
                <h3>{name}</h3>
                <h6>{type}</h6>
            </div>
            <div><img src={imgUrls[0]} alt=''></img></div>
        </div>
        <div className="guests-details">
            <div>
                Guests:
            </div>
            <div>
                <span>{(adults) ? `${adults} adults ` : ''} </span>
                <span>{(children) ? `,${children} children` : ''}</span>
                <span>{(infants) ? `,${infants} infants` : ''}</span>
                <span>{(pets) ? `,${pets} pets` : ''}</span>
            </div>

        </div>

        <div className="stay-dates">
            <div>Dates:</div>
            <div>
                Arrive at: {startDate}&middot;
                Leaving at: {endDate}
            </div>
        </div>

        <div className="order-total-price">
            <div>Total:</div>
            <div>
                <CalcReserve stay={params.state.stay} />
            </div>
        </div>

        <div className="btns-summary">
            <button className="back-home-btn" onClick={() => navigate('/')}>Back to home page</button>
            <button className="your-orders-btn" onClick={() => navigate('/my-orders')}>Your orders</button>
        </div>
    </section>

}
