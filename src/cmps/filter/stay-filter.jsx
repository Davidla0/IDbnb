import React, { useEffect, useRef } from 'react'

import { ExpandedFilter } from './expanded-filter'
import filterImg from '../../assets/img/filter-btn-img.png'
import { LabelsFilter } from './filter-by-lables'
import { useSelector } from 'react-redux'

export const StayFilter = (props) => {
    const filter = useRef(null)
    const filterContainer = useRef(null)

    const { filterBy } = useSelector(state => state.stayModule)

    useEffect(() => {
        if (!filterContainer.current || !filter.current) return
        const filterObserver = new IntersectionObserver(onFilterObserved, {
            rootMargin: "-100px 0px 0px",
        });

        filterObserver.observe(filter.current)

        function onFilterObserved(entries) {
            if (!filterContainer.current || !filter.current) return
            entries.forEach((entry) => {
                filterContainer.current.className = entry.isIntersecting ? 'full main-layout ' : 'fixed full main-layout';
            })
        }
    }, [])

    const { onClickFilter, onChangeFilter, isFilterOpen } = props
    return (
        <section className='stay-filter full main-container' >
            <div ref={filter}></div>
            <div ref={filterContainer}>
                <div className={isFilterOpen ? 'filter-open filter-container  ' : 'filter-container '}>
                    <div className='labels-container'>
                        <LabelsFilter onChangeFilter = {onChangeFilter} filterBy= {filterBy}/>
                    </div>
                    <button className='stay-filter-btn' onClick={onClickFilter}>
                        <div><img src={filterImg} alt="" /></div>
                        Filters
                    </button>
                    <ExpandedFilter onChangeFilter={onChangeFilter} onClickFilter={onClickFilter} />
                </div>
            </div>
        </section>
    )
}