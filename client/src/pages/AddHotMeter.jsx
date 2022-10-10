import React from 'react'

import { Container, Row, Col } from 'react-bootstrap';
import TreeNode from '../components/TreeNode';


const AddHotMeter = () => {
    const treeData = [
        {
          key: "0",
          label: "Documents",
          children: [
            {
              key: "0-0",
              label: "Document 1-1",
              children: [
                {
                  key: "0-1-1",
                  label: "Document-0-1.doc",
                },
                {
                  key: "0-1-2",
                  label: "Document-0-2.doc",
                },
              ],
            },
          ],
        },
        {
          key: "1",
          label: "Desktop",
          children: [
            {
              key: "1-0",
              label: "document1.doc",
            },
            {
              key: "0-0",
              label: "documennt-2.doc",
            },
          ],
        },
        {
          key: "2",
          label: "Downloads",
          children: [],
        },
      ];


  return (
    <Container fluid>
        <Row>
            <Col md={2} style={{borderRight: "1px solid grey"}}>
                {treeData.map((node) => (
                    <TreeNode node={node} key={node.key}/>
                ))}
            </Col>

            <Col>
            asdasd
            
            
            </Col>
        </Row>
    </Container>
  )
}

export default AddHotMeter;