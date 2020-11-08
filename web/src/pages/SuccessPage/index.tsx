import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

const SuccessPage: React.FC = function () {
    return (
        <div id="success">
            <div className="content">
                <main>
                    <h1> Ebaaa! </h1>

                    <p>
                        O cadastro deu certo e foi enviado ao administrador para ser aprovado. <br /> Agora é so esperar :)
                    </p>

                    <Link to="/orphanages">
                        Voltar para o mapa
                    </Link>
                </main>

            </div>
        </div>
    );
}

export default SuccessPage;