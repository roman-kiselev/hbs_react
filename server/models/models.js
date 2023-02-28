import sequelize from "../db.js";
import { Sequelize } from "sequelize";


class User extends Sequelize.Model {}
User.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize, modelName: "users"
})

class Role extends Sequelize.Model {}
Role.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize, modelName: "role"
})

class UsersRoles extends Sequelize.Model {}
UsersRoles.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
}, {
    sequelize, modelName: "users_role"
})
User.belongsToMany(Role, {through: UsersRoles})
Role.belongsToMany(User, {through: UsersRoles})


class ObjectBuilds extends Sequelize.Model {}
ObjectBuilds.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    img: {
        type: Sequelize.STRING,
        allowNull: false
    },
},{
    sequelize, modelName: "object_builds"
})

// Описание объекта
// У объекта 1 описание, а у описания много оббъектов
//  У объекта должен храниться ключ описания
class DescriptionObject extends Sequelize.Model {}

DescriptionObject.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        flat: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        section: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        office: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        metersInFlat: {
            type: Sequelize.BOOLEAN,
            default: false
        },
        metersInGr: {
            type: Sequelize.BOOLEAN,
            default: false
        },
        systemBolid: {
            type: Sequelize.BOOLEAN,
            default: false
        },
        systemTeplovodohran: {
            type: Sequelize.BOOLEAN,
            default: false
        }
    },

    {
        sequelize, modelName: 'description_objects'
    })
DescriptionObject.hasMany(ObjectBuilds);
ObjectBuilds.belongsTo(DescriptionObject);

// Номер объекта хранится в секциях
// Схема содержит Секцию №,  количество этажей
class Section extends Sequelize.Model {}
Section.init ({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    number: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    from: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    to: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    flat: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    office: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    flatInFloor: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    pipes: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
},{
    sequelize, modelName: 'section'
})

ObjectBuilds.hasMany(Section);
Section.belongsTo(ObjectBuilds);
// Опишем этажи , у секций много этажей а у этажа одна секций
// id Секции будет в этажах
// id Дома в этажах
class Floors extends Sequelize.Model {}
Floors.init({

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    number: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    }

}, {
    sequelize, modelName: 'floors'
})
// Создаём связь
Section.hasMany(Floors);
Floors.belongsTo(Section);
ObjectBuilds.hasMany(Floors);
Floors.belongsTo(ObjectBuilds);


// Опишем квартиры
// id этажа в квартирах
// id секции в квартирах
// id дома в квартирах

class Flats extends Sequelize.Model {}
Flats.init({

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    number: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    }

}, {
    sequelize, modelName: 'flats'
})
Section.hasMany(Flats);
Flats.belongsTo(Section);
ObjectBuilds.hasMany(Flats);
Flats.belongsTo(ObjectBuilds);
Floors.hasMany(Flats);
Flats.belongsTo(Floors);

class Office extends Sequelize.Model {}
Office.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    number: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
},{
    sequelize, modelName: 'office'
})
Section.hasMany(Office);
Office.belongsTo(Section);
ObjectBuilds.hasMany(Office);
Office.belongsTo(ObjectBuilds);
Floors.hasMany(Office);
Office.belongsTo(Floors);

// типы счётчиков
class TypeMeter extends Sequelize.Model {}
TypeMeter.init (
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        }
    },
    {
        sequelize, modelName: 'type_meter'
    }
)

//Бренды
class Brands extends Sequelize.Model {}
Brands.init (
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        }
    },
    {
        sequelize, modelName: 'brands'
    }
)

// Счётчики
class Meter extends Sequelize.Model {}
Meter.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        }
    },
    {
        sequelize, modelName: 'meter'
    }
)
// Прибор наименование
class Pribors extends Sequelize.Model {}
Pribors.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    }
}, {
    sequelize, modelName: 'pribors'
})
// Свойства для приборов, счётчиков и т.д
class NameProperty extends Sequelize.Model {}
NameProperty.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    }
}, {
    sequelize, modelName: 'name_property'
})
// Значения свойств
class ValueProperty extends Sequelize.Model {}
ValueProperty.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    value: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    }
}, {
    sequelize, modelName: 'value_property'
})

/*
class PriborsValueProperty extends Sequelize.Model {}

PriborsValueProperty.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
}, {
    sequelize, modelName: 'pribors_value'
})
*/


// У типов много счётчиков , а у счётчиков один тип(В счётчиках должен быть указан тип)
// Создаём связь
// Ключ в типах
/*Meter.hasMany(TypeMeter);
TypeMeter.belongsTo(Meter);*/
//
TypeMeter.hasMany(Meter);
Meter.belongsTo(TypeMeter);
// Связь счётчик-бренд
Brands.hasMany(Meter);
Meter.belongsTo(Brands);

// Создадим связь Description и sections многие ко многим



// Создаём связь приборов и значения свойств
/*NameProperty.hasMany(Pribors);
Pribors.belongsTo(NameProperty);*/

NameProperty.hasMany(ValueProperty);
ValueProperty.belongsTo(NameProperty);

Pribors.hasMany(ValueProperty);
ValueProperty.belongsTo(Pribors);

/*
Pribors.belongsToMany(ValueProperty, {through: PriborsValueProperty});
ValueProperty.belongsToMany(Pribors, {through: PriborsValueProperty});
*/


// Здесь хранятся номера счётчиков со связью к объектам и типам счётчков
class MeterNumber extends Sequelize.Model {}
MeterNumber.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    number: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    sum: {
        type: Sequelize.STRING,
        allowNull: true
    },
    numberSt: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
}, {
    sequelize, modelName: 'meter_number'
})

// Делаем связи
// Привязываем счётчик
Meter.hasMany(MeterNumber);
MeterNumber.belongsTo(Meter);
// Привязываем объект
ObjectBuilds.hasMany(MeterNumber);
MeterNumber.belongsTo(ObjectBuilds);
// Привязываем секцию
Section.hasMany(MeterNumber);
MeterNumber.belongsTo(Section);
// Привязываем этаж
Floors.hasMany(MeterNumber);
MeterNumber.belongsTo(Floors);
// Привязываем квартиру
Flats.hasMany(MeterNumber);
MeterNumber.belongsTo(Flats);
Office.hasMany(MeterNumber);
MeterNumber.belongsTo(Office);



// Здесь хранятся номера приборов со связью к объектам и типам приборов
class PriborNumber extends Sequelize.Model {}
PriborNumber.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    number: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: false
    },
    numberSt: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true
    }
}, {
    sequelize, modelName: 'pribor_number'
})
// Делаем связи
// Привязываем счётчик
Pribors.hasMany(PriborNumber);
PriborNumber.belongsTo(Pribors);
// Привязываем объект
ObjectBuilds.hasMany(PriborNumber);
PriborNumber.belongsTo(ObjectBuilds);
// Привязываем секцию
Section.hasMany(PriborNumber);
PriborNumber.belongsTo(Section);
// Привязываем этаж
Floors.hasMany(PriborNumber);
PriborNumber.belongsTo(Floors);
// Привязываем квартиру
Flats.hasMany(PriborNumber);
PriborNumber.belongsTo(Flats);
// Привязываем офис
Office.hasMany(PriborNumber);
PriborNumber.belongsTo(Office);
// Привязываем id счётчиков
MeterNumber.hasMany(PriborNumber);
PriborNumber.belongsTo(MeterNumber);

// Добавим таблицу с каналами

class Chanel extends Sequelize.Model {}

Chanel.init ({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    number: {
        type: Sequelize.INTEGER,
    }
}, {
    sequelize, modelName: 'chanel'
})

// У многих приборов с номерами много каналов, а у многих каналов много приборов
// Таблица для них
class PriborNumberChanel extends Sequelize.Model {}
PriborNumberChanel.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
}, {
    sequelize, modelName: 'pribor_number_chanel'
})
// Создаём связь много ко многим
PriborNumber.belongsToMany(Chanel, {through: PriborNumberChanel})
Chanel.belongsToMany(PriborNumber, {through: PriborNumberChanel})


// Связываем НомераПриборов_Каналы с таблицей номеров счётчиков
class PriborNumberChanelNumberMeters extends Sequelize.Model {}
PriborNumberChanelNumberMeters.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
}, {
    sequelize, modelName: 'p_n_chanel_m_n'
})
PriborNumberChanel.belongsToMany(MeterNumber, {through: PriborNumberChanelNumberMeters})
MeterNumber.belongsToMany(PriborNumberChanel, {through: PriborNumberChanelNumberMeters})


// Создаём для связи PriborNumberChanel и Flat таблицу
class PriborNumberChanelFlat extends Sequelize.Model {}
PriborNumberChanelFlat.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
}, {
    sequelize, modelName: 'prib_num_ch_flat'
})
PriborNumberChanel.belongsToMany(Flats, {through: PriborNumberChanelFlat})
Flats.belongsToMany(PriborNumberChanel, {through: PriborNumberChanelFlat})
// Создаём для связи PriborNumberChanel и Office таблицу
class PriborNumberChanelOffice extends Sequelize.Model {}
PriborNumberChanelOffice.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
}, {
    sequelize, modelName: 'prib_num_ch_office'
})
PriborNumberChanel.belongsToMany(Office, {through: PriborNumberChanelOffice})
Office.belongsToMany(PriborNumberChanel, {through: PriborNumberChanelOffice})

/*// Связь приборов каналов
class PriborChanel extends Sequelize.Model {}*/

class Line extends Sequelize.Model {}
Line.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    number: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
},{
    sequelize, modelName: 'line'
})

class MainAddMeter extends Sequelize.Model {}
MainAddMeter.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    section: {
        type: Sequelize.BIGINT,
        allowNull: true
    },
    floor: {
        type: Sequelize.BIGINT,
        allowNull: true
    },
    flat: {
        type: Sequelize.BIGINT,
        allowNull: true
    },
    line: {
        type: Sequelize.BIGINT,
        allowNull: true
    },
    typeMeter: {
        type: Sequelize.STRING,
        allowNull: true
    },
    numberMeter: {
        type: Sequelize.STRING,
        allowNull: true
    },
    sumMeter: {
        type: Sequelize.FLOAT(11),
        allowNull: true
    },
    numberKdl: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: '0'
    },
    numberAsr: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: '0'
    },
    comment: {
        type: Sequelize.STRING,
        allowNull: true
    },


},{
    sequelize, modelName: "main_meter"
})

ObjectBuilds.hasMany(MainAddMeter);
MainAddMeter.belongsTo(ObjectBuilds);
User.hasMany(MainAddMeter);
MainAddMeter.belongsTo(User);


export default {User, ObjectBuilds, TypeMeter, Role, UsersRoles, DescriptionObject, Section, Floors, Flats, Office, Brands, Meter, Pribors, NameProperty, ValueProperty, MeterNumber, PriborNumber, Chanel, PriborNumberChanel, PriborNumberChanelNumberMeters, PriborNumberChanelFlat, PriborNumberChanelOffice, MainAddMeter}


