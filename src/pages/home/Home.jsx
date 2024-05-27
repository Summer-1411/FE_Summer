
import { useContext } from "react";
import ListProduct from "../../components/listProduct/ListProduct";
import Slider from "../../components/slider/Slider";
import './home.scss'
import {  request } from "../../requestMethod";
import { Radio } from 'antd';
import { AppContext } from "../../context/AppContext";
import { useGetProduct } from "../../services/products";
import { useGetProducer } from "../../services/producer";


function Home() {
    const { filterProduct, setFilterProduct } = useContext(AppContext)
    
    const { productList } = useGetProduct(filterProduct)
    const { listProducer } = useGetProducer()
    
    const handleChange = (e) => {
        setFilterProduct(prev => {
            return {
                ...prev,
                sample: {
                    ...prev.sample,
                    idOwner: e.target.value
                }
            }
        })
    }
    return (
        <>
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
                                    <Radio.Group  onChange={handleChange}>
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