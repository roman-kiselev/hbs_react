import React from 'react'
import { Row, Container, Col } from 'react-bootstrap';
import Tree from '../components/Tree';
import { TreeData } from '../components/TreeData';
import { treeRoutes } from '../routes';
import PageOne from './PageOne';


const AddHotMeter = () => {

  console.log(TreeData);

  return (
    
      <Container>
      <Row>
       <Col>
          <Tree treeData={TreeData}/>
       </Col>
       <Col>
          <PageOne />
       </Col>
      </Row>
    </Container>
    
    
  )
}

export default AddHotMeter;