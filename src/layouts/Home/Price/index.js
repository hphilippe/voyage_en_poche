import React from "react";
import { Row, Col, Card, Icon, Avatar } from 'antd';
import '../style.css';
import './style.css';

const { Meta } = Card;

const Price = () => {
    return(
        <div className={'body-index'}>
          <div className="body-index-centerHeight">
            <div className="price-body container">
              <Row gutter={16} classname="row">
                <Col className="gutter-row"xs={24} sm={24} md={12} lg={12} xl={6} >
                  <div className="gutter-box">
                  
                  <Card
                    style={{ width: '100%' }}
                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                    actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                  >
                    <Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title="Card title"
                      description="This is the description"
                    />
                  </Card>
                 
                  </div>
                </Col>
                <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={6} >
                  <div className="gutter-box">
                  
                  <Card
                    style={{ width: '100%' }}
                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                    actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                  >
                    <Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title="Card title"
                      description="This is the description"
                    />
                  </Card>
                  
                  </div>
                </Col>
                <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={6} >
                  <div className="gutter-box">
                  
                  <Card
                    style={{ width: '100%' }}
                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                    actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                  >
                    <Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title="Card title"
                      description="This is the description"
                    />
                  </Card>
                  
                  </div>
                </Col>
                <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={6} >
                  <div className="gutter-box">
                  
                  <Card
                    style={{ width: '100%' }}
                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                    actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                  >
                    <Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title="Card title"
                      description="This is the description"
                    />
                  </Card>
                  
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
    );
}

export default Price;