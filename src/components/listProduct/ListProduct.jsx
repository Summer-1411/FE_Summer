import "./listProduct.scss"
import {List } from 'antd';
import Product from "../product/Product";
import { useContext, useEffect, useState } from "react";
import { request } from "../../requestMethod";
import { AppContext } from "../../context/AppContext";

export default function ListProduct({productList}) {
    const { productFilter, setProductFilter } = useContext(AppContext)
    const [listProduct, setListProduct] = useState([])
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1)
    useEffect(() => {
        const getNumberPage = async () => {
            try {
                const res = await request.get(`/product/page`)
                setPages(res.data[0].numPages)
            } catch (error) {
                console.log(error);
            }
        }
        getNumberPage()
    }, [])
    useEffect(() => {
        const getProducts = async () => {
            try {
                if (productFilter.category) {
                    //console.log("category");
                    const res = await request.get(`/product?page=${currentPage}&&category=${productFilter.category}`)
                    //console.log("product :", res.data.products);
                    setListProduct(res.data.products)
                } else if (productFilter.producer) {
                    //console.log("producer");
                    const res = await request.get(`/product?page=${currentPage}&&producer=${productFilter.producer}`)
                    //console.log("product :", res.data.products);
                    setListProduct(res.data.products)
                } else {
                    //console.log("all");
                    const res = await request.get(`/product?page=${currentPage}`)
                    //console.log("product :", res.data.products);
                    setListProduct(res.data.products)

                }
            } catch (error) {
                console.log(error);
            }

        }
        getProducts()
    }, [currentPage, productFilter.category, productFilter.producer])


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
                    pageSize: 8,
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
