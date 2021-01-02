import React, { useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

interface IParams {
    id: string;
}

const DeletePage: React.FC = function () {

    const history = useHistory();

    const params: IParams = useParams();

    const handleCancel = useCallback(function () {
        history.push('/dashboard');
    }, [history]);

    const handleConfirm = useCallback(async function () {
        const id = Number(params.id);

        await api.delete(`orphanages/${id}`);

        history.push('/dashboard');
    }, [history, params.id]);

    return (
        <div id="delete">
            <div className="content">
                <main>
                    <h1> Excluir! </h1>

                    <p>
                        Você tem certeza que quer <br /> excluir esse orfanato?
                    </p>

                    <div className="container-buttons">
                        <button className="btnNo" onClick = { handleCancel } >
                            Não
                        </button>

                        <button className="btnYes" onClick = { handleConfirm } >
                            Sim
                        </button>
                    </div>

                </main>

            </div>
        </div>
    );
}

export default DeletePage;