

export function DetailsHeader({ myRef, stay }) {
    const { startPhotos, amenitiesSection, reviewsSection } = myRef


    const executeScroll = (loc) => {
        switch (loc) {
            case 'startPhotos':
                startPhotos.current.scrollIntoView({ behavior: 'smooth' })
                break;
            case 'amenitiesSection':
                amenitiesSection.current.scrollIntoView({ behavior: 'smooth' })
                break;
            case 'reviewsSection':
                reviewsSection.current.scrollIntoView({ behavior: 'smooth' })
                break;
            default:
                break;
        }

    }

    return <div className='details-header-scrolling main-layout full'>
        <div className='main-layout-details '>
            <div className="list-sections">
                <ul>
                    <li onClick={() => executeScroll('startPhotos')}>Photos</li>
                    <li onClick={() => executeScroll('amenitiesSection')}>Amenities</li>
                    <li onClick={() => executeScroll('reviewsSection')}>Reviews</li>
                    <li onClick={executeScroll}>Location</li>
                </ul>
                <div>
                    <span>ssdad</span>
                </div>
            </div>



        </div>

    </div>
}