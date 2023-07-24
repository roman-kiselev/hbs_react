//Features — части функциональности приложения. Пожалуй, самый сложный для понимания и определения слой в методологии, так как само определение «фичи» зависит от конкретной прикладной области и бизнес-требований. Поэтому при переходе на FSD нужно внедрять «фичи»  только при полной уверенности, что это не внесет дополнительную сложность для разработчиков.
import { RequireAuth, CheckRoleAuth } from "./auth";
import NavbarAskueFeaters from "./navbar/NavbarAskueFeaters";
import LeftMenuAdmin from "./leftMenu/LeftMenuAdmin";
import LeftMenuManager from "./leftMenu/LeftMenuManager";
import LeftMenuMain from "./leftMenu/LeftMenuMain";
import { UsersAdminFeatures, OneUserForm } from "./admin";
import { Objects } from "./managment";
import { AddObject, ListObjectsFeatures, MainObjects } from "./objects";
import { SuspenseAndLoading } from "./utils";

export {
    RequireAuth,
    NavbarAskueFeaters,
    CheckRoleAuth,
    LeftMenuAdmin,
    UsersAdminFeatures,
    OneUserForm,
    LeftMenuManager,
    Objects,
    AddObject,
    MainObjects,
    LeftMenuMain,
    SuspenseAndLoading,
};
