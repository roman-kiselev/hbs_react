import React, { useEffect } from "react";
import OneObject from "./OneObject";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllObjects } from "../../features/objectBuild/objectBuildSlice";

const ListObjects = () => {
  const dispatch = useDispatch();
  const { objects } = useSelector((state) => state.objectBuilds.objectsBuild);

  useEffect(() => {
    dispatch(getAllObjects());
  }, [dispatch]);

  return (
    <>
      {objects != undefined ? (
        <Row className="mt-3 justify-content-center">
          {objects.map((object) => (
            <OneObject
              key={object.id}
              description={{
                id: object.id,
                img: object.img,
                name: object.name,
                description: object.description,
              }}
            />
          ))}
        </Row>
      ) : (
        <p>Пока нет объектов</p>
      )}
    </>
  );
};

export default ListObjects;
