import HomeObject from "./pages/HomeObject";
import HomePage from "./pages/HomePage";
import OneObject from "./pages/OneObject";
import { HOME_PAGE_ROUTE, OBJECT_BUILD_ROUTE } from "./utils/consts";



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
    }
]