import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DeskTableShort from "../../../entities/desk/deskTable/DeskTableShort";
import { metersApi } from "../../../shared/api/meters";

const RepeatingNumbers = () => {
    const { id } = useParams();
    const { list, number } = useSelector(
        (store) => store.deskAuto.repeatingNumbers
    );

    const {
        data: listDesk,
        isLoading,
        refetch,
    } = metersApi.useGetRepeatingMetersQuery({
        objectBuildId: id,
    });

    return (
        <div>
            <>
                {isLoading ? (
                    <Spinner animation="border" />
                ) : (
                    <>
                        {list && list.length > 0 ? (
                            <DeskTableShort
                                listDesk={list}
                                isLoading={isLoading}
                                refetch={refetch}
                            />
                        ) : (
                            <h1>Нет таких счётчиков</h1>
                        )}
                    </>
                )}
            </>
        </div>
    );
};

export default RepeatingNumbers;
