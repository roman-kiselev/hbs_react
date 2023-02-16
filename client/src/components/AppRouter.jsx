import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Layout from "../pages/Layout";
import HomePage from "../pages/HomePage";
import DescriptionObject from "../pages/DescriptionObject";
import Description from "./addMeters/Description";
import AddCoolMetersBolid from "./addMeters/bolid/AddCoolMetersBolid";
import AddHotMeterBolid from "./addMeters/bolid/AddHotMeterBolid";
import AddMeterCoolHotBolid from "./addMeters/bolid/AddMeterCoolHotBolid";
import AddCoolMeterPulsar from "./addMeters/pulsar/AddCoolMeterPulsar";


const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={< Layout/>}>
            <Route path="/" element={< HomePage />}/>
            <Route path="object/:id" element={< DescriptionObject />}>
                <Route index path="description" element={< Description />}/>
                <Route path="addCoolMeterBolid" element={< AddCoolMetersBolid />}/>
                <Route path="addHotMeterBolid" element={< AddHotMeterBolid />}/>
                <Route path="addMeterCoolHotBolid" element={< AddMeterCoolHotBolid />}/>
                <Route path="addCoolMeterPulsar" element={< AddCoolMeterPulsar />}/>


            </Route>

        </Route>
    </Routes>
  )
}

export default AppRouter;