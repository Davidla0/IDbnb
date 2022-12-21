// import { upload } from '@testing-library/user-event/dist/upload'
import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useFormRegister } from '../hooks/useFormRegister'
import { addStay, updateStay } from '../store/stay.actions'


export const StayEdit = () => {

    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const [register, setStay, stay] = useFormRegister({
        name: '',
        price: ''
        // img: null
    })

    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
        const stayId = params.stayId
        if (!stayId) return
        // stayService
        //     .getById(stayId)
        //     .then((stay) => {
        //         setStay(stay)
        //     })
        //     .catch((err) => {
        //     })
    }, [])

    const onSaveStay = (ev) => {
        ev.preventDefault()
        if (stay._id) {
            try {
                dispatch(updateStay(stay))
                navigate('/')
            } catch (err) {
                console.error('ERROR!', err)
            }
        } else {
            try {
                dispatch(addStay(stay))
                navigate('/')
            } catch (err) {
                console.error('ERROR!', err)
            }
        }

    }

    return (
        <form onSubmit={onSaveStay}>
            <h1>{stay._id ? 'Edit' : 'Add'} stay</h1>

            <label htmlFor="name">name</label>
            <input ref={inputRef} {...register('name', 'text')} />

            <label htmlFor="price">Price</label>
            <input {...register('price', 'number')} />
            <button>submit</button>
        </form>
    )
}