import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import { EnvironmentOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons'

const Footer = () => {
    return (
        <div className="footer">
           
            <div className="container">
                <div className="row">
                    <div className="footer__title">
                        <h3>HỆ THỐNG CỬA HÀNG</h3>
                        <div className="footer__content">
                            <ul className="footer__list">
                                <li className="footer__list__item">
                                    <Link to="/">Địa chỉ: Số 16 Ngõ 58 Trần Bình, Mai Dịch, Cầu Giấy, HN</Link>
                                </li>
                                <li className="footer__list__item">
                                    <Link to="/">Số điện thoại: 0964572402</Link>
                                </li>
                                <li className="footer__list__item">
                                    <Link to="/">Email: hao2016vt@gmail.com</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer__title">
                        <h3>HỖ TRỢ</h3>
                        <div className="footer__content">
                            <ul className="footer__list">
                                <li className="footer__list__item">
                                    <Link to="/">Hướng dẫn chọn cỡ giày</Link>
                                </li>
                                <li className="footer__list__item">
                                    <Link to="/">Chính sách đổi trả/ hoàn tiền</Link>
                                </li>
                                <li className="footer__list__item">
                                    <Link to="/">Chính sách bảo mật thông tin</Link>
                                </li>
                                <li className="footer__list__item">
                                    <Link to="/">Hướng dẫn mua hàng</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer__title">
                        <h3>HỆ THỐNG CỬA HÀNG</h3>
                        <div className="footer__content">
                            <ul className="footer__list">
                                <li className="footer__list__item">
                                    <Link to="/">Hướng dẫn đặt hàng</Link>
                                </li>
                                <li className="footer__list__item">
                                    <Link to="/">Thông tin thanh toán</Link>
                                </li>
                                <li className="footer__list__item">
                                    <Link to="/">Chính sách giao hàng và nhận hàng</Link>
                                </li>
                                <li className="footer__list__item">
                                    <Link to="/">Liên hệ</Link>
                                </li>
                                <li className="footer__list__item">
                                    <Link to="/">Sơ đồ website</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer__title">
                        <h3>HỆ THỐNG CỬA HÀNG</h3>
                        <div className="footer__content">
                            <ul className="footer__list">
                                <li className="footer__list__item">
                                    <Link to="/"><EnvironmentOutlined className="footer__icon" /> 159/3 Chợ Phùng Khoang Hà Đông Hà Nội</Link>
                                </li>
                                <li className="footer__list__item">
                                    <Link to="/"><PhoneOutlined className="footer__icon nth-2" /> Số điện thoại: 0964572402</Link>
                                </li>
                                <li className="footer__list__item">
                                    <Link to="/"><MailOutlined className="footer__icon" /> Email: hao2016vt@gmail.com</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
