import AddHotMeter from "./pages/AddHotMeter";
import HomeObject from "./pages/HomeObject";
import HomePage from "./pages/HomePage";
import OneObject from "./pages/OneObject";
import PageOne from "./pages/PageOne";
import PageTwo from "./pages/PageTwo";
import { ADD_HOT_METER, HOME_PAGE_ROUTE, OBJECT_BUILD_ROUTE, PAGE_ONE, PAGE_TWO } from "./utils/consts";



export const publickRoutes = [
    {
        path: OBJECT_BUILD_ROUTE,
        Component: HomeObject
    },
    {
        path: OBJECT_BUILD_ROUTE + '/:id',
        Component: OneObject
    },
    {
        path: HOME_PAGE_ROUTE,
        Component: HomePage
    },
    {
        path: ADD_HOT_METER,
        Component: AddHotMeter
    },
    {
        path: PAGE_TWO,
        Component: PageTwo
    },
]


export const treeRoutes = [
    {
        path: PAGE_ONE,
        Component: PageOne
    },
    
]