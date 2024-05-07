
import { useContext, useEffect, useState } from "react";
import ListProduct from "../../components/listProduct/ListProduct";
import Slider from "../../components/slider/Slider";
import './home.scss'
import {  request } from "../../requestMethod";
import { Radio } from 'antd';
import { AppContext } from "../../context/AppContext";
import { useGetProduct } from "../../services/products";


function Home() {
    const { productFilter, setProductFilter, filterProduct, setFilterProduct } = useContext(AppContext)
    const [listProducer, setListProducer] = useState([])

    const { productList } = useGetProduct(filterProduct)
    useEffect(() => {
        const getProducer = async () => {
            try {
                const res = await request.get("/producer")
                console.log('cehck ress', res);
                setListProducer(res.data.producer)
            } catch (error) {
                console.log(error);
            }
        }
        getProducer()
    }, [])
    const handleChangeProducer = (e) => {
        let id = e.target.value
        if (id === productFilter.producer) {
            setProductFilter(prev => ({ category: null, producer: null }))
        } else {
            setProductFilter(prev => ({ category: null, producer: id }))
        }
    }
    return (
        <>
            {/* <Loading /> */}
            <div className="home">
                <div className="home-container">
                    <Slider />
                    <div className="home-heading">

                        <div className='row'>
                            <div className='col l-4 c-12 m-6'>
                                <div className="home-title">
                                    ĐIỆN THOẠI NỔI BẬT NHẤT
                                </div>
                            </div>
                            <div className='col l-8 c-12 m-6'>
                                <div className="home-manufacturer">
                                    <Radio.Group onChange={handleChangeProducer} >
                                        {listProducer.map((producer) => (
                                            <Radio.Button key={producer.id} value={producer.id}>{producer.name}</Radio.Button>
                                        ))}

                                    </Radio.Group>
                                </div>
                            </div>


                        </div>


                    </div>
                    <ListProduct productList={productList}/>
                </div>
            </div>
        </>);
}

export default Home;