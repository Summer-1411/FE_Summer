import "./listProduct.scss"
import {List } from 'antd';
import Product from "../product/Product";
export default function ListProduct({productList}) {
    return (
        <div className="list-products">
            <List
                grid={{
                    gutter: 16,
                    xs: 2,
                    sm: 2,
                    md: 3,
                    lg: 4,
                    xl: 4,
                    xxl: 1
                }}
                pagination={{
                    onChange: (page) => {
                        console.log('page', page);
                    },
                    pageSize: 12,
                    total: productList?.length ?? 0,
                    position: 'bottom',
                    align: 'center',
                    onShowSizeChange: (current, size) => {
                        console.log({ current, size });
                    }
                }}

                dataSource={productList}
                renderItem={(item) => {
                    return (
                        <List.Item>
                            <Product product={item} />
                        </List.Item>
                    )
                }}
            />
        </div>
    )
}
