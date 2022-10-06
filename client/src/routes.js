import HomeObject from "./pages/HomeObject";
import OneObject from "./pages/OneObject";
import { OBJECT_BUILD_ROUTE } from "./utils/consts";



export const publickRoutes = [
    {
        path: OBJECT_BUILD_ROUTE,
        Component: HomeObject
    },
    {
        path: OBJECT_BUILD_ROUTE + '/id',
        Component: OneObject
    }
]