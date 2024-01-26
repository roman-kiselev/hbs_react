-- Получить только счетчики с невалидным номером
SELECT * FROM hbs_react.main_meters
WHERE objectBuildId=11 and typeMeter="Счётчик электроэнергии" and length(numberMeter) <> 8;
-- Получить только счетчики с невалидным номером
SELECT * FROM hbs_react.main_meters
WHERE objectBuildId=11 and typeMeter="Счётчик тепла" and length(numberMeter) <> 8;
-- Получить только счетчики с невалидным номером
SELECT * FROM hbs_react.main_meters
WHERE objectBuildId=11 and typeMeter!="Счётчик тепла" and typeMeter != "Счётчик электроэнергии" and length(numberMeter) <> 6;
-- Получить счётчики с повторными номерами
SELECT 
    *
FROM
    hbs_react.main_meters
WHERE
    numberMeter IN (SELECT 
            numberMeter
        FROM
            hbs_react.main_meters
        WHERE
            objectBuildId = 11
        GROUP BY numberMeter
        HAVING COUNT(numberMeter) > 1)
ORDER BY numberMeter DESC;