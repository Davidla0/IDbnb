import React ,{useState,useEffect}from "react";
import { Routes, Route, useLocation } from 'react-router'
import routes from './routes'
import { AppHeader } from './cmps/header-cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { useDispatch, useSelector } from "react-redux";

export function RootCmp () {
  const location = useLocation()
  const dispatch = useDispatch()
    const [layoutClass, setLayoutClass] = useState(false)

    const { isFilterOpen, isHeaderFilterOpen } = useSelector(state => state.stayModule)

    useEffect(() => {
      location.pathname.includes('details')? setLayoutClass(true):  setLayoutClass(false)
    }, [location.pathname])

    const  onClickHeaderFilter = (ev) => {
      if(ev)ev.preventDefault()
      dispatch({
          type: 'SET_IS_HEADER_FILTER_OPEN',
          isHeaderFilterOpen: !isHeaderFilterOpen
      })
  }
  //   const onClickFilter = (ev) => {
  //     if(ev)ev.preventDefault()
  //     ev.preventDefault()
  //     dispatch({
  //         type: 'SET_IS_FILTER_OPEN',
  //         isFilterOpen: !isFilterOpen
  //     })
  //     // if (!isFilterOpen) dispatch(loadStays())
  // }

  const onClickBack = ()=>{
    dispatch({
      type: 'SET_IS_FILTER_OPEN',
      isFilterOpen: false
  })
  dispatch({
    type: 'SET_IS_HEADER_FILTER_OPEN',
    isHeaderFilterOpen: false
})
  }
    return (
      // <div className= "full main-layout">
      <div className= {`full main-layout ${(isFilterOpen || isHeaderFilterOpen) && 'filter-open'} ${( isHeaderFilterOpen) && 'ex-filter-open'}`}>
        <div onClick={onClickBack} className='main-screen' ></div>
        <AppHeader layoutClass={layoutClass} onClickHeaderFilter = {onClickHeaderFilter} isHeaderFilterOpen = {isHeaderFilterOpen}/>
        <main className={`${layoutClass? 'main-layout-details':'full main-layout'} `} >
        {/* <main className={`${(isFilterOpen || isHeaderFilterOpen) && 'filter-open'} ${layoutClass? 'main-layout-details':'full main-layout'} `} > */}
          <Routes>
            {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
            {/* <Route path="user/:id" element={<UserDetails />} /> */}
          </Routes>
        </main>
        <AppFooter layoutClass={layoutClass} />
      </div>
    )
}
