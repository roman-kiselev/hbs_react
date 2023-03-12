// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Row, Col } from "react-bootstrap";
// import Pages from "../../../../Pages";

// const TestListHeatMeters = ({ id: objectId }) => {
    
//     const dispatch = useDispatch()
//     const { id: userId } = useSelector((state) => state.users.user)
//     const cardMeter = useSelector((state) => state.mainTable.mainTable)

//     const { currentPage, limit } = useSelector((state) => state.mainTable)
//     const { perPage } = useSelector((state) => state.mainTable)
//     const { totalCount } = useSelector((state) => state.mainTable)

//     // Создаём объект для передачи данных для пагинации
//     const paginationObject = {
//         limit,
//         currentPage,
//         totalCount
//     }



//     return (
//         <Row>
//             <Row>
//                 {
//                     cardMeter.length !== 0 ?
//                         cardMeter.map((card) => (
//                             <TestCardMeter key={card.id} {...card} objectId={objectId}/>
//                         )) :
//                         <p>Пока ничего нет</p>
//                 }
//             </Row>
//             <Row className='m-3 '>

//                 <Col>
                    
//                     <Pages {...paginationObject} />
//                 </Col>
//             </Row>
//         </Row>
//     )
// }

// export default TestListHeatMeters;