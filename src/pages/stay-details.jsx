import { useEffect, useLayoutEffect, useRef } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Calender } from "../cmps/calender"
import { Reserve } from "../cmps/reserve"
import { stayService } from "../services/stay.service"
import { Review } from "../cmps/stay-review"
import { DetailsHeader } from "../cmps/header-cmps/details-header"
import { StayKeys } from "../cmps/stayDetails/stay-keys"
import { AirCover } from "../cmps/stayDetails/stay-air-cover"
import { Amenities } from "../cmps/stayDetails/stay-amenities"

import { ReactComponent as Star } from '../assets/icons/star.svg';
import { ReactComponent as Heart } from '../assets/icons/heart.svg';
import { ReactComponent as Share } from '../assets/icons/share.svg';
import { ReactComponent as User } from '../assets/icons/user.svg';
import { useSelector } from "react-redux"
// import { orderService } from "../services/order.service"
import { useDispatch } from "react-redux"
import {  getOrder } from "../store/order.actions"

export const StayDetails = () => {

    const [stay, setStay] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    let { order } = useSelector(state => state.orderModule)

    const params = useParams()
    const dispatch = useDispatch()

    const imgSection = useRef(null)
    const amenitiesSection = useRef(null)
    const reviewsSection = useRef(null)
    const startPhotos = useRef(null)

    const loadStay = () => {
        const stayId = params.id
        stayService.getById(stayId).then((stay) => {
            setStay(stay)
            loadOrder(stay)
            // setReviews(reviews)
        })
    }

    const loadOrder = (stay) => {
        if(!order.length) {
            dispatch(getOrder(stay))
        }

    }

    useEffect(() => {
        loadStay()
        // loadOrder()
    }, [])

    useLayoutEffect(() => {
        if (!imgSection.current) return
        const imgObserver = new IntersectionObserver(onImgObserver, {
            rootMargin: "2px 0px 0px",
        });
        imgObserver.observe(imgSection.current)

        function onImgObserver(entries) {
            if (!imgSection.current) return
            entries.forEach((entry) => {
                setIsOpen(!entry.isIntersecting)
            })
        }
    }, [stay])

    const avgRate = () => {
        return stayService.avgRate(stay)
    }


    if (!stay) return <div>Loading...</div>
    const rate = avgRate()

    return <div className="stay-details">
        {(isOpen) ? <DetailsHeader myRef={{ amenitiesSection, reviewsSection, startPhotos }} stay={stay} /> : ''}

        <div className="header-details" ref={startPhotos}>
            <h1>{stay.name}</h1>
            <div className="mini-details">
                <div className="mini-info">
                    <span className="rate-star"><Star /> {rate} &middot;</span>

                    <button className="review-amount">{stay.reviews.length} reviews</button>
                    <span className="separate-dot">&middot;</span>
                    <span className="country-code">{stay.loc.city},{stay.loc.countryCode},{stay.loc.country}</span>
                </div>
                <div className="details-actions">
                    <div className="share-details"><button href="#"><span><Share /></span>Share</button></div>
                    <div className="save-details"><button href="#"><span><Heart /></span> Save</button></div>
                </div>
            </div>
        </div>


        <div className="img-details" ref={imgSection} id="img-details">
            {stay.imgUrls.map((imgUrl, index) => <img className={`img-${index}`} src={`${stay.imgUrls[index]}`} alt="" srcSet="" key={index} />)}
        </div>

        <div className="main-details">
            <div className="details-section">
                <div className="mini-details">
                    <div className="stay-details">
                        <h2>{stay.roomType} hosted by {stay.host.fullname}</h2>
                        <ol>
                            <li>
                                <span>{stay.capacity} guests</span>
                                <span> &middot;</span>
                            </li>
                            <li>
                                <span>{stay.bathrooms} bathrooms</span>
                                <span> &middot;</span>
                            </li>
                            <li>
                                <span>{stay.bedrooms} bedrooms</span>
                            </li>

                        </ol>
                    </div>
                    <div className="user-photo"><User /></div>
                </div>

                <StayKeys />

                <AirCover />

                <div className="more-description">
                    <div className="summary">{stay.summary}</div>
                    <button className="show-more">Show more </button>
                </div>

                <div ref={amenitiesSection}></div>
                <Amenities stay={stay} />

                <Calender stay={stay} order={order} />

            </div>

            <Reserve stay={stay} avgRate={rate}  />
        </div>

        <div ref={reviewsSection}></div>
        <div className="reviews-section"  >

            <Review stay={stay} avgRate={rate} />

        </div>
    </div>


}