import React, { useState } from 'react';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi';

import Input from '../../components/Input';

import bigLogo from '../../images/big-logo.svg';

import './styles.css';

const ForgotPassword: React.FC = function () {

    const [emailValid, setEmailValid] = useState(false);
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [repeatVisiblePassword, setRepeatVisiblePassword] = useState(false);

    function handleVerify() {
        setEmailValid(true);
    }

    function handleRecovery() {

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

                {!emailValid ?
                    <div className="container-form">
                        <Form onSubmit={handleVerify}>
                            <h2> Esqueceu a senha? </h2>

                            <p> Insira o e-mail cadastrado para realizar a redefinição da sua senha. </p>

                            <Input name="email" label="E-mail" type="email" />

                            <button type="submit"> Verificar </button>
                        </Form>

                        <Link to="/login" className="btnBack">
                            <FiArrowLeft size={24} color="#15C3D6" />
                        </Link>
                    </div>
                    :
                    <div className="container-form">
                        <Form onSubmit={handleRecovery} className="form-recovery">
                            <h2> Redefinição de senha </h2>

                            <p> Crie uma nova senha para você acessar o dashboard do Happy. </p>

                            <Input name="password" label="Nova senha" type={visiblePassword ? 'text' : 'password'}>
                                <button onClick={function () {
                                    setVisiblePassword(!visiblePassword);
                                }}>
                                    {!visiblePassword ?
                                        <FiEye size={24} color="#8FA7B2" />
                                        :
                                        <FiEyeOff size={24} color="#15C3D6" />
                                    }
                                </button>
                            </Input>

                            <Input name="repeatPassword" label="Repetir senha" type={repeatVisiblePassword ? 'text' : 'password'}>
                                <button onClick={function () {
                                    setRepeatVisiblePassword(!repeatVisiblePassword);
                                }}>
                                    {!repeatVisiblePassword ?
                                        <FiEye size={24} color="#8FA7B2" />
                                        :
                                        <FiEyeOff size={24} color="#15C3D6" />
                                    }
                                </button>
                            </Input>

                            <button type="submit"> Redefinir senha </button>
                        </Form>

                    </div>
                }

            </div>
        </div>
    );
}

export default ForgotPassword;