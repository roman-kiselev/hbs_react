import React from "react";
import { useSelector } from "react-redux";

const LineRowHeader = ({ numberSection }) => {
  const { formHouse } = useSelector((state) => state.formHouse);
  const countLine = formHouse.filter(
    (item) => item.numberSection === numberSection
  );

  // Сформируем из числа массив количество линий
  let arrCountLines = [];
  if (countLine.length === 0) {
    return <></>;
  }
  for (let i = 1; i <= countLine[0].lines; i++) {
    arrCountLines.push({
      numberLine: i,
    });
  }

  return (
    <thead>
      <tr>
        <th>Этаж</th>
        {arrCountLines.map((item) => {
          return <th key={item.numberLine}>Линия №{item.numberLine}</th>;
        })}
      </tr>
    </thead>
  );
};

export default LineRowHeader;
