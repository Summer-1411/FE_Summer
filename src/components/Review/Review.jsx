import React from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Rate, Space } from 'antd';

const data = Array.from({ length: 23 }).map((_, i) => ({
  // href: 'https://ant.design',
  title: `levantung14112002@gmail.com${i}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  description:
    '00:00:24 25/02/2024',
  content:
    'Sản phẩm đẹp',
}));

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Review = () => (
  <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={data}
    
    renderItem={(item) => (
      <List.Item
        key={item.title}
        
        extra={
          <img
            width={272}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        <div>

        <Rate disabled  value={5} />
        </div>
        <div>
          {item.content}
        </div>
      </List.Item>
    )}
  />
);

export default Review;