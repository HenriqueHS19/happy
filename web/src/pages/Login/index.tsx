import React, { useState } from 'react';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';

import api from '../../services/api';

import Input from '../../components/Input';

import bigLogo from '../../images/big-logo.svg';

import './styles.css';

interface IData {
    email: string;
    password: string;
}

const Login: React.FC = function () {

    const [inputCheck, setInputCheck] = useState(false);

    const history = useHistory();

    async function handleSubmit(data: IData) {

        const { email, password } = data;

        try {
            const response = await api.post('session/login', { email, password });

            if (response.status === 200) {
                history.push('/dashboard');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div id="login-page">
            <div className="content">
                <div className="container-logo">
                    <img src={bigLogo} alt="Happy" />

                    <div className="location">
                        <strong> São Paulo </strong>
                        <p> São Paulo </p>
                    </div>
                </div>

                <div className="container-login">
                    <Form onSubmit={handleSubmit}>
                        <h2> Fazer login </h2>

                        <Input name="email" label="E-mail" type="email" />
                        <Input name="password" label="Senha" type="password" />

                        <div className="options">
                            <div className="input-box">
                                <span
                                    className={inputCheck ? 'custom-checkbox checked' : 'custom-checkbox'}
                                    onClick={function () {
                                        setInputCheck(!inputCheck);
                                    }}
                                >
                                    <FiCheck size={12} color="#fff" className={inputCheck ? 'visible' : 'hidden'} />
                                </span>

                                <p> Lembrar-me </p>
                            </div>

                            <Link to="/login/forgot-password">
                                Esqueci minha senha
                            </Link>
                        </div>

                        <button type="submit"> Entrar </button>
                    </Form>

                    <Link to="/" className="btnBack">
                        <FiArrowLeft size={24} color="#15C3D6" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;