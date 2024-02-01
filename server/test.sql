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


SELECT 
    *
FROM
    hbs_react.main_meters
WHERE
    objectBuildId = 14
ORDER BY floor, line ASC;

-- Добавим колонку радио(true, false)
ALTER TABLE hbs_react.object_builds
ADD COLUMN radio boolean default null;
SELECT 
    *
FROM
    hbs_react.object_builds;
    
-- Добавим значения в новую колонку
UPDATE hbs_react.object_builds
SET radio = false
WHERE id =! 14;

UPDATE hbs_react.object_builds
SET radio = true
WHERE id = 14;