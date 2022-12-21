import { Link, useNavigate } from 'react-router-dom'

import { StayPreview } from '../cmps/stay-preview'
import { showErrorMsg } from '../services/event-bus.service'
import { userService } from '../services/user.service'

export function StayList({ stays }) {
    const navigate = useNavigate()

    function checkLogIn(stayId){
        if(!userService.getLoggedinUser()) return showErrorMsg('must Logged in')
        navigate(`/details/${stayId}`)
    }

    return (
        <section className="stay-list">
            {stays.map(stay =>
                <div className='stay-navigate' key = {stay._id} onClick={() => checkLogIn(stay._id)}>
                    <StayPreview stay={stay} />
                </div>
            )}
        </section>
    )
}
