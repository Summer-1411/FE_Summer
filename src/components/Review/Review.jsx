import React from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, Image, List, Rate, Space } from 'antd';


const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Review = ({ feedbackListProduct }) => (
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
            width={200}
            src={item.img}
          /> : ''

        }
      >
        <List.Item.Meta
          avatar={<Avatar src={`${item.avatar}`} />}
          title={<p>{item.email}</p>}
          description={item.createAt}
        />
        <div>

          <Rate disabled value={item.rate} />
        </div>
        <div>
          {item.description}
        </div>
      </List.Item>
    )}
  />
);

export default Review;