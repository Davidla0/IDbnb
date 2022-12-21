import { useFormRegister } from '../../hooks/useFormRegister'

export const ExpandedFilter = (props) => {

    // const [register, setFilter, filterBy] = useFormRegister({
    const [register] = useFormRegister({
        name: '',
        maxPrice: 1610,
        minPrice: 50,
        EntirePlace: false,
        PrivateRoom: false,
        SharedHome: false,
        Wifi: false,
        Washer: false,
        // airConditioning: false,
        Kitchen: false,
        Dryer: false,
        Heating: false
    }, props.onChangeFilter)


    const { onClickFilter } = props

    return (
        <form className='expanded-filter' onSubmit={onClickFilter}>
            <section className='filter-header'>
                <h1>filter</h1>
            </section>

            <div className='inputs'>
                <h1>Price range</h1>
                <section className='price-range'>
                    <section className='range-slider'>
                        <input min="0" max="1800"  {...register('minPrice', 'range')} />
                        <input min="0" max="1600"  {...register('maxPrice', 'range')} />
                    </section>
                    <div className='number-price-filter'>
                        <input {...register('minPrice', 'number')} /> - <input {...register('maxPrice', 'number')} />
                    </div>
                </section>

                <h1>Type of place</h1>
                <section className='type-of-place'>

                    <label htmlFor="entire-place">
                        <input  {...register('EntirePlace', 'checkbox')} />
                        <div className='label-title'>
                            Entire place  <br />
                            <span>A place all to yourself</span>
                        </div>
                    </label>

                    <label htmlFor="entire-place">
                        <input  {...register('SharedHome', 'checkbox')} />
                        <div className='label-title'>
                            SharedHome  <br />
                            <span>Your own room in a home or a hotel, plus some shared common spaces</span>
                        </div>
                    </label>

                    <label htmlFor="entire-place">
                        <input  {...register('PrivateRoom', 'checkbox')} />
                        <div className='label-title'>
                            Private room  <br />
                            <span>A sleeping space and common areas that may be shared with others</span>
                        </div>
                    </label>

                </section>

                <h1>Essentials</h1>
                <section className='amenities'>
                    <label htmlFor="Wifi">
                        <input  {...register('Wifi', 'checkbox')} />
                        Wifi
                    </label>
                    <label htmlFor="Washer">
                        <input  {...register('Washer', 'checkbox')} />
                        Washer
                    </label>
                    <label htmlFor="Kitchen">
                        <input  {...register('Kitchen', 'checkbox')} />
                        Kitchen
                    </label>
                    <label htmlFor="Dryer">
                        <input  {...register('Dryer', 'checkbox')} />
                        Dryer
                    </label>
                    <label htmlFor="Heating">
                        <input  {...register('Heating', 'checkbox')} />
                        Heating
                    </label>
                </section>
            </div>

            <section className='filter-footer'>
                <button>show homes</button>
            </section>
        </form >
    )
}
