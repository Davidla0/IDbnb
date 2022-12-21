import React from 'react';

import OMG from '../../assets/img/vector/omg.jpg'
import Lakefront from '../../assets/img/vector/lakefront.jpg'
import Beach from '../../assets/img/vector/beach.jpg'
// import Islands from '../../assets/img/vector/islands.jpg'
import Cabins from '../../assets/img/vector/cabins.jpg'
import Design from '../../assets/img/vector/Design.jpg'
import Campers from '../../assets/img/vector/Campers.jpg'
import Caves from '../../assets/img/vector/Caves.jpg'
import Castles from '../../assets/img/vector/Castles.jpg'
import Beachfront from '../../assets/img/vector/Beachfront.jpg'
import SharedHomes from '../../assets/img/vector/shared-homes.jpg'
import AmazingViews from '../../assets/img/vector/amazing-views.jpg'
import NationalParks from '../../assets/img/vector/National parks.jpg'
import AmazingPools from '../../assets/img/vector/amazing-pools.jpg'

export const LabelsFilter = ({ onChangeFilter, filterBy }) => {

    const labels = [{ 'OMG!': OMG }, { 'Lakefront': Lakefront }, { 'Beach': Beach }, { 'Cabins': Cabins },
    { 'Design': Design }, { 'Campers': Campers }, { 'Caves': Caves }, { 'Castles': Castles },
    { 'Beachfront': Beachfront }, { 'Shared homes': SharedHomes }, { 'Amazing views': AmazingViews },
    { 'National parks': NationalParks }, { 'Amazing pools': AmazingPools }]


    return <section className="filter-by-labels">
        {labels.map((label, idx) => {
            let labelClass = ''
             if (filterBy.label && filterBy.label === Object.keys(label).toString()) labelClass = 'chosen-label' 

            return <div key={idx} className={`filter-by-label ${labelClass}` } onClick={() => onChangeFilter({ label: Object.keys(label).toString() })} >
                <img src={Object.values(label)} alt="" />
                <p className='label-name'>{Object.keys(label).toString()}</p>
            </div>
        })}
    </section>
}

// export const LabelsFilter = ({ onChangeFilter }) => {

//     const labels = [{ 'OMG!': OMG }, { 'Lakefront': Lakefront }, { 'Beach': Beach }, { 'Cabins': Cabins },
//     { 'Design': Design }, { 'Campers': Campers },{ 'Caves': Caves }, { 'Castles': Castles },
//     { 'Beachfront': Beachfront }, { 'Shared homes': SharedHomes }, { 'Amazing views': AmazingViews },
//     { 'National parks': NationalParks },{ 'Amazing pools':  AmazingPools}]

//     return <section className="filter-by-labels">
//         {labels.map((label, idx) => {
//             return <div key={idx} className="filter-by-label" onClick={() => onChangeFilter({ label: Object.keys(label).toString() })} >
//                 <img src={Object.values(label)} alt="" />
//                 <p className='label-name'>{Object.keys(label).toString()}</p>
//             </div>
//         })}
//     </section>
// }