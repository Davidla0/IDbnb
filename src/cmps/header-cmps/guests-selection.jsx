
import { ReactComponent as Plus } from '../../assets/img/vector/plus.svg';
import { ReactComponent as Minus } from '../../assets/img/vector/minus.svg';

export const GustSelection = ({ changeWho, guestsCount }) => {

    return <div className="select-guests guests-selection">
        <div className="pick-guest-account">
            <div>
                <h3>Adults</h3>
                <h5>Age 13+</h5>
            </div>
            <div className="choose-amount">
                <div>
                    <button onClick={() => changeWho('adults', -1)}><Minus /></button>
                    <span>{guestsCount.adults}</span>
                    <button onClick={() => changeWho('adults', 1)}><Plus /></button>
                </div>
            </div>
        </div>
        <div className="pick-guest-account">
            <div>
                <h3>Children</h3>
                <h5>Ages 2-12</h5>
            </div>
            <div className="choose-amount">
                <div>
                    <button onClick={() => changeWho('children', -1)}><Minus /></button>
                    <span>{guestsCount.children}</span>
                    <button onClick={() => changeWho('children', 1)}><Plus /></button>
                </div>
            </div>
        </div>
        <div className="pick-guest-account">
            <div>
                <h3>Infants</h3>
                <h5>Under 2</h5>
            </div>
            <div className="choose-amount">
                <div>
                    <button onClick={() => changeWho('infants', -1)}><Minus /></button>
                    <span>{guestsCount.infants}</span>
                    <button onClick={() => changeWho('infants', 1)}><Plus /></button>
                </div>
            </div>
        </div>
        <div className="pick-guest-account">
            <div>
                <h3>Pets</h3>
            </div>
            <div className="choose-amount">
                <div>
                    <button onClick={() => changeWho('pets', -1)}><Minus /></button>
                    <span>{guestsCount.pets}</span>
                    <button onClick={() => changeWho('pets', 1)}><Plus /></button>
                </div>
            </div>
        </div>
        {/* <button className="close-btn-reserve" onClick={() => toggleMenu()}>close</button> */}
    </div>
}
// export const GustSelection= ({changeWho, guestsCount})=>{

//     return(
//         // guests-selection
//         <div className="select-guests">
//         <div className="pick-guest-account">
//             <div>
//                 <h3>Adults</h3>
//                 <h5>Age 13+</h5>
//             </div>
//             <div>
//                 <span onClick={() => changeWho('adults', 1)}>+</span>
//                 <span>{guestsCount.adults}</span>
//                 <span onClick={() => changeWho('adults', -1)}>-</span>
//             </div>
//         </div>
//         <div className="pick-guest-account">
//             <div>
//                 <h3>Children</h3>
//                 <h5>Ages 2-12</h5>
//             </div>
//             <div>
//                 <span onClick={() => changeWho('children', 1)}>+</span>
//                 <span>{guestsCount.children}</span>
//                 <span onClick={() => changeWho('children', -1)}>-</span>
//             </div>
//         </div>
//         <div className="pick-guest-account">
//             <div>
//                 <h3>Infants</h3>
//                 <h5>Under 2</h5>
//             </div>
//             <div>
//                 <span onClick={() => changeWho('infants', 1)}>+</span>
//                 <span>{guestsCount.infants}</span>
//                 <span onClick={() => changeWho('infants', -1)}>-</span>
//             </div>
//         </div>
//         <div className="pick-guest-account">
//             <div>
//                 <h3>Pets</h3>
//             </div>
//             <div>
//                 <span onClick={() => changeWho('pets', 1)}>+</span>
//                 <span>{guestsCount.pets}</span>
//                 <span onClick={() => changeWho('pets', -1)}>-</span>
//             </div>
//         </div>
//     </div>
//     )
// }