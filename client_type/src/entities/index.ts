//Entities — это компоненты, связанные с представлением бизнес-сущностей, «кирпичики», с помощью которых происходит построение бизнес-логики. Этот слой стоит внедрять желательно вместе со слоем Features
import NavbarAskue from "./navbar";
import LoadingSpin from "./loadingSpin";
import LinkGroup from "./linkGroup/LinkGroup";
import LeftMenu from "./leftPanel/LeftMenu";
import { CreateUserModal, UserTable, FormRowsOneUser } from "./admin";

export {
    NavbarAskue,
    LoadingSpin,
    LinkGroup,
    LeftMenu,
    CreateUserModal,
    UserTable,
    FormRowsOneUser,
};
