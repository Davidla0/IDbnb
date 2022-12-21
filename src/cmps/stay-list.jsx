import { Link } from 'react-router-dom'

import { StayPreview } from '../cmps/stay-preview'

export function StayList({ stays }) {
    return (
        <section className="stay-list">
            {stays.map(stay =>
                <Link key = {stay._id} to={`/details/${stay._id}`}>
                    <StayPreview stay={stay} />
                </Link>
            )}
        </section>
    )
}
