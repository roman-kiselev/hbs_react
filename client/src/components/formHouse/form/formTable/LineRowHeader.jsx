import React from "react";
import { useSelector } from "react-redux";

const LineRowHeader = ({ numberSection }) => {
  const { formHouse } = useSelector((state) => state.formHouse);
  const countLine = formHouse.filter(
    (item) => item.numberSection === numberSection
  );

  // Сформируем из числа массив количество линий
  let arrCountLines = [];
  for (let i = 1; i <= countLine[0].lines; i++) {
    arrCountLines.push({
      numberLine: i,
    });
  }

  console.log(countLine);
  return (
    <thead>
      <tr>
        <th>Этаж</th>
        <th>Линия №2</th>
        <th>Линия №3</th>
        <th>Линия №4</th>
        <th>Линия №5</th>
        <th>Линия №6</th>
        <th>Линия №7</th>
        <th>Линия №8</th>
        <th>Линия №9</th>
      </tr>
    </thead>
  );
};

export default LineRowHeader;
