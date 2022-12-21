import { Star } from "@mui/icons-material";
import React from "react";
import { useParams } from "react-router-dom";
import { stayService } from "../services/stay.service";

export function StayPreview({ stay }) {
    
    const params = useParams()
    const { checkInDate, checkOutDate } = params

    const avgRate = () => {
        return stayService.avgRate(stay)
    }

    if (!stay)return

    return (
        <div key={stay._id} className='stay-preview'>
            <img src={stay.imgUrls[0]} />
            <div>
                <div className="preview-title">
                    <p><span>{stay.loc.city}, {stay.loc.country}</span></p>
                    <span className="rate-star"><Star /> {avgRate()}</span>
                </div>
                {/* {stay.type} */}
                {/* roomType {stay.roomType} */}
                {!checkInDate && !checkOutDate && <p>{stay.loc.address.slice(0, 27)}</p>}
                {/* {checkInDate && checkOutDate && <p>{stay.summary.slice(0, 25)}...</p>} */}
                {checkInDate && checkOutDate && <p>{stay.beds} beds</p>}
                {/* {isSameMonth  && <p > {checkInDateMonth} {checkInDatedDate.getDate()} - {checkOutDateDate.getDate()} </p>} */}
                <p className="price"><span>${stay.price}</span> night</p>
            </div>
        </div>
    )
}