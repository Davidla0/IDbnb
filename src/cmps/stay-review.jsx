import { useState } from 'react';

import { ReactComponent as Star } from '../assets/icons/star.svg';
import { ReactComponent as User } from '../assets/icons/user.svg';

export const Review = ({ stay, avgRate }) => {   
    const [isOpen, setIsOpen] = useState(false)

    const getREviews = (minSize = 0, size = 6) => {
        return stay.reviews.map((review, idx) =>
            <div key= {idx} className='review'>
                <div className='reviewer-header-details'>
                    <div className='reviewer-img'><img src="https://xsgames.co/randomusers/avatar.php?g=male" alt=""/></div>
                   
                    <div className='reviewer-details'>
                        <h3 className='reviewer-name'>{review.by.fullname}</h3>
                        <div className='review-date'>{
                        new Date(review.at).toLocaleDateString('en-us', { month:"long", year:"numeric"})
                        
                        }</div>
                    </div>
                </div>
    
                <div className='review-body'>
                    {review.txt}
                </div>
            </div>).slice(minSize, size)
    }

    const toggleIsOpen = () => {
        setIsOpen(!isOpen)
    }



    return (
        <section className="reviews">
            <div className='review-header'>
                <div className='reviews-rate'>
                    <div><Star /></div>
                    <div>{avgRate}</div>&middot;
                </div>
                <div>{stay.reviews.length} reviews</div>
            </div>

            <div className={`reviews-section ${isOpen}`}>
                {!isOpen ?  getREviews() : getREviews(0, stay.reviews.length)}
            </div>
            <div className='show-all-btn'>
                <div onClick={() => toggleIsOpen()}>
                    {!isOpen ?  ` Show all ${stay.reviews.length} reviews` : 'Show less'}
                   
                </div>
            </div>
        </section>
    )
}