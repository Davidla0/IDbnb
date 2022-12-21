
// import React, { useState } from "react"

// export const SelectGuests = () => {
//     const [isOpen, setIsOpen] = useState(false)

//     const [guestsCount, setGuestsCount] = useState({
//         adults: 0,
//         children: 0,
//         infants: 0,
//         pets: 0,
//     })

//     const toggleMenu = () => {
//         setIsOpen(!isOpen)
//     }

//     const onClick = (category, action) => {
//         action = action === '+' ? 1 : -1
//         if (guestsCount[category] + action < 0 || action > stay.capacity) return
//         guestsCount[category] += action
//         setGuestsCount(prevGuestsCount => ({ ...prevGuestsCount }))
//         console.log(guestsCount)
//     }


//     return  <React.Fragment>
//     { isOpen && <div className="select-guests">
//         <div className="pick-guest-account">
//             <div>
//                 <h3>Adults</h3>
//                 <h5>Age 13+</h5>
//             </div>
//             <div>
//                 <span onClick={() => onClick('adults', '+')}>+</span>
//                 <span>{guestsCount.adults}</span>
//                 <span onClick={() => onClick('adults', '-')}>-</span>
//             </div>
//         </div>
//         <div className="pick-guest-account">
//             <div>
//                 <h3>Children</h3>
//                 <h5>Ages 2-12</h5>
//             </div>
//             <div>
//                 <span onClick={() => onClick('children', '+')}>+</span>
//                 <span>{guestsCount.children}</span>
//                 <span onClick={() => onClick('children', '-')}>-</span>
//             </div>
//         </div>
//         <div className="pick-guest-account">
//             <div>
//                 <h3>Infants</h3>
//                 <h5>Under 2</h5>
//             </div>
//             <div>
//                 <span onClick={() => onClick('infants', '+')}>+</span>
//                 <span>{guestsCount.infants}</span>
//                 <span onClick={() => onClick('infants', '-')}>-</span>
//             </div>
//         </div>
//         <div className="pick-guest-account">
//             <div>
//                 <h3>Pets</h3>
//             </div>
//             <div>
//                 <span onClick={() => onClick('pets', '+')}>+</span>
//                 <span>{guestsCount.pets}</span>
//                 <span onClick={() => onClick('pets', '-')}>-</span>
//             </div>
//         </div>
//         <button onClick={() => toggleMenu()}>close</button>
//     </div>
//     }
//      </React.Fragment>
// }