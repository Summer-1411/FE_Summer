
import { useContext } from "react";
import ListProduct from "../../components/listProduct/ListProduct";
import Slider from "../../components/slider/Slider";
import './home.scss'
import { Radio } from 'antd';
import { AppContext } from "../../context/AppContext";
import { useGetProducer } from "../../services/producer";
import MyMenu from "../../components/myMenu/MyMenu";
import Voucher from "../voucher";
import { Outlet } from "react-router-dom"

function Home() {
    const { setFilterProduct } = useContext(AppContext)

    const { listProducer } = useGetProducer()

    const handleChange = (e) => {
        setFilterProduct(prev => {
            return {
                ...prev,
                sample: {
                    ...prev.sample,
                    idProducer: e.target.value
                }
            }
        })
    }
    console.log('listProducer', listProducer);


    return (
        <>
            <div className="home">
                <div style={{ maxWidth: 1200, margin: 'auto' }} className="home-container">
                    <Slider />
                    <MyMenu />
                    <div className="home-heading">

                        <div className='row'>
                            <div className='col l-4 c-12 m-6'>
                                <div className="home-title">
                                    ĐIỆN THOẠI NỔI BẬT NHẤT
                                </div>
                            </div>
                            <div className='col l-8 c-12 m-6'>
                                <div className="home-manufacturer">
                                    <Radio.Group onChange={handleChange}>
                                        {[{ id: '', name: 'Tất cả' }, ...listProducer].map((producer) => (
                                            <Radio.Button key={producer.id} value={producer.id}>{producer.name}</Radio.Button>
                                        ))}
                                    </Radio.Group>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Outlet />

                </div>
            </div>
        </>);
}

export default Home;