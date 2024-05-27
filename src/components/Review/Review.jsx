import React from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, Image, List, Rate, Space } from 'antd';
import { IMAGE_LINK } from '../../requestMethod';

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

const Review = ({feedbackListProduct}) => (
  <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={feedbackListProduct}
    
    renderItem={(item) => (
      <List.Item
        key={item.id}
        
        extra={
          item.img ? <Image
          width={120}
          src={`${IMAGE_LINK}/${item.img}`}
        /> : ''
          
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={`${IMAGE_LINK}/${item.avatar}`} />}
          title={<p>{item.email}</p>}
          description={item.createAt}
        />
        <div>

        <Rate disabled  value={item.rate} />
        </div>
        <div>
          {item.description}
        </div>
      </List.Item>
    )}
  />
);

export default Review;