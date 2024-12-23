import './profile.scss'
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import { useEffect, useState } from 'react';
import { genders } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { request } from '../../requestMethod';
import { updateUser } from '../../redux/userRedux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOption } from '../../constants';
import { Button, Image } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
export default function Profile() {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.user.currentUser);
    const [gender, setGender] = useState(currentUser.gender)
    const [name, setName] = useState(currentUser.username)
    const [date, setDate] = useState("");
    const [file, setFile] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const initialDate = new Date(currentUser.birthday).toISOString().substr(0, 10);
        setDate(initialDate);
    }, [currentUser.birthday]);

    const handleOpenWidget = () => {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "drkmrlmla",
                uploadPreset: "summer"
            },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    const url = result.info.url;
                    setFile(url)
                }
            }
        );

        widget.open(); // Open the widget
    };
    const handleValid = () => {
        if (!name.trim()) {
            setError("Vui lòng nhập họ tên !")
        } else {
            setError(null)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (error) {
            return;
        }
        let infor = {
            username: name,
            gender: gender,
            birthday: date
        }

        if (file) {
            infor.avatar = file
        }
        try {
            const res = await request.put(`/user/update/${currentUser.id}`, infor)
            console.log(res.data);
            setFile(null);
            dispatch(updateUser(infor))
            toast.success(res.data.message, toastOption);
        } catch (error) {
            toast.error(error.response.data.message, toastOption);
            console.log(error);
        }
    }

    return (
        <div className="ai_css_profile-wrapper">
            <div className="ai_css_profile-heading">
                <h2 className="ai_css_profile-title">Hồ Sơ Của Tôi</h2>
            </div>

            <div className="ai_css_profile-content">
                {/* Left Side: Information Form */}
                <div className="ai_css_profile-content-left">
                    <div className="ai_css_profile-content-left-item">
                        <div className="ai_css_profile-title">Email</div>
                        <div className="ai_css_profile-item-value">{currentUser.email}</div>
                    </div>
                    <div className="ai_css_profile-content-left-item">
                        <div className="ai_css_profile-title">
                            Họ và tên <span className="required">*</span>
                        </div>
                        <div className="ai_css_profile-item-value">
                            <input
                                type="text"
                                className="ai_css_profile-input-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onBlur={handleValid}
                                placeholder="Nhập họ và tên"
                            />
                            {error && <div className="error-message">{error}</div>}
                        </div>
                    </div>
                    <div className="ai_css_profile-content-left-item">
                        <div className="ai_css_profile-title">Ngày sinh</div>
                        <div className="ai_css_profile-item-value">
                            <input
                                type="date"
                                className="ai_css_profile-input-name"
                                name="date"
                                defaultValue={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="ai_css_profile-content-left-item">
                        <div className="ai_css_profile-title">Giới tính</div>
                        <div className="ai_css_profile-item-value">
                            <div className="ai_css_profile-gender">
                                {genders.map((gen) => (
                                    <div
                                        key={gen.id}
                                        className={`ai_css_profile-gender-item ${gen.id === gender ? 'selected' : ''}`}
                                        onClick={() => setGender(gen.id)}
                                    >
                                        <div className="ai_css_profile-check-radio">
                                            {gen.id === gender ? (
                                                <RadioButtonCheckedOutlinedIcon />
                                            ) : (
                                                <RadioButtonUncheckedOutlinedIcon />
                                            )}
                                        </div>
                                        <span className="ai_css_profile-title-radio">{gen.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ai_css_profile-content-right">
                    <div className="ai_css_profile-avatar-wrapper">
                        <div className="ai_css_profile-avatar-container">
                            <Image
                                width={300}
                                style={{ objectFit: 'cover' }}
                                src={file ? file : `${currentUser.avatar}`}
                            />
                        </div>
                        <Button
                            style={{ marginRight: 4 }}
                            icon={<CloudUploadOutlined />}
                            onClick={async () => {
                                handleOpenWidget()
                            }}
                            size="default"
                        >
                            Ảnh
                        </Button>
                    </div>
                </div>
            </div>

            {/* Bottom: Save Button */}
            <div className="ai_css_profile-bottom">
                <Button type="primary" size="large" onClick={handleSubmit}>
                    Lưu
                </Button>
            </div>
        </div>

    )
}
