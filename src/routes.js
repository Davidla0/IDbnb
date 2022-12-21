import { StayApp } from './pages/stay-app'
import { StayDetails } from './pages/stay-details'
import { StayEdit } from './pages/add-edit-stay'
import { ReserveSummary } from './pages/reserve-summary'
import { TableOrders } from './pages/table-orders'
import { Dashboard } from './pages/dashboard'

const routes = [
    {
        path: '/',
        component: <StayApp />,
        label: 'bnbs'
    },
    {
        path: '/:checkInDate/:checkOutDate/:adultsGuests/:childrenGuests/:infantsGuests/:petsGuests',
        component: <StayApp />,
        label: 'bnbs'
    },
    {
        path: 'details/:id',
        component: <StayDetails />,
        label: 'Details'
    },
    {
        path: 'edit',
        component: <StayEdit />,
        label: 'Edit'
    },
    {
        path: 'summary',
        component: <ReserveSummary />,
        label: 'Summary'
    },
    {
        path: 'my-orders',
        component: <TableOrders/>,
        label: 'MyOrders'

    },
    {
        path:'Dashboard',
        component: <Dashboard/>,
        label: 'Dashboard'

    }
   
]

export default routes
