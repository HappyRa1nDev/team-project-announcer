import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Home, eventLoader } from './pages/home';
import { MainWrapper } from './layouts/MainWrapper';
import Layout from './layouts/Layout';
import { Notfound } from './pages/notfound';
import AddEvent from './pages/AddEvent';
import { UserEvents, userEventLoader } from './pages/getuserevents';
import PrivateRoute from './layouts/PrivateRoute';
import EditEvent from './pages/EditEvent';

const router = createBrowserRouter(createRoutesFromElements(
            <Route exact path='/' element={<Layout/>}>
                <Route index element={<Home />} loader={eventLoader}/>
                <Route exact path="eventUser" loader={userEventLoader} element={<PrivateRoute><UserEvents/></PrivateRoute>}/>
                <Route exact path="eventManage/add" element={<PrivateRoute><AddEvent/></PrivateRoute>} />
                <Route exact path="eventManage/edit/:id" element={<PrivateRoute><EditEvent/></PrivateRoute>} />
                <Route exact path='*' element={<Notfound/>}/>
            </Route>
));

const App = () => {
    return (
        <MainWrapper>
            <RouterProvider router={router}/>
        </MainWrapper>
    );
}

export {App};
