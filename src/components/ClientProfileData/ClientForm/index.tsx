import { useState, ChangeEvent, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import clsx from 'clsx';

import './styles.scss';

export interface ClientFormData {
    firstName: string;
    lastName: string;
    document: string;
    email: string;
    phone: string;
}

export interface ClientFormProps {
    editable?: boolean;
    clientProfileData: any;
    onSubmit: (data: ClientFormData) => void;
    onContinue: () => void;
}

const initialState = {
    firstName: '',
    lastName: '',
    document: '',
    email: '',
    phone: '',
}

const ClientForm = (props: ClientFormProps) => {
    const [state, setState] = useState<ClientFormData>(initialState);
    const {
        editable = false,
        clientProfileData,
        onSubmit,
        onContinue,
    } = props;

    useEffect(() => {
        setState({
            firstName: clientProfileData?.firstName || '',
            lastName: clientProfileData?.lastName || '',
            document: clientProfileData?.document || '',
            email: clientProfileData?.email || '',
            phone: clientProfileData?.phone || '',
        });
    }, []);

    const handleChange = (e: ChangeEvent<Element>) => {
        const input = e.target as HTMLInputElement;
        setState({
            ...state,
            [input.name]: input.value,
        });
    }

    const isDisabled = (): boolean => {
        return !state.firstName ||
            !state.lastName ||
            !state.document ||
            !state.email ||
            !state.phone
    }

    const wasEdited = (): boolean => {
        return clientProfileData?.firstName !== state.firstName ||
            clientProfileData?.lastName !== state.lastName ||
            clientProfileData?.document !== state.document ||
            clientProfileData?.email !== state.email ||
            clientProfileData?.phone !== state.phone;
    }

    return (
        <div className={clsx(
            'clientForm',
            { 'clientForm--not-editable': !editable }
        )}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <p className="clientForm__description">Solicitamos tus datos básicos para la finalización del pedido.</p>
                </Grid>
                <Grid item md={12} xs={12}>
                    <TextField
                        name="email"
                        label="Correo electrónico"
                        variant="standard"
                        disabled={!editable}
                        onChange={handleChange}
                        value={state.email} />
                </Grid>
                <Grid item md={6} xs={12}>
                    <TextField
                        name="firstName"
                        label="Nombres"
                        variant="standard"
                        disabled={!editable}
                        onChange={handleChange}
                        value={state.firstName} />
                </Grid>
                <Grid item md={6} xs={12}>
                    <TextField
                        name="lastName"
                        label="Apellidos"
                        variant="standard"
                        disabled={!editable}
                        onChange={handleChange}
                        value={state.lastName} />
                </Grid>
                <Grid item md={6} xs={12}>
                    <TextField
                        name="document"
                        label="Número documento"
                        variant="standard"
                        disabled={!editable}
                        onChange={handleChange}
                        value={state.document} />
                </Grid>
                <Grid item md={6} xs={12}>
                    <TextField
                        name="phone"
                        label="Teléfono / Móvil"
                        variant="standard"
                        disabled={!editable}
                        onChange={handleChange}
                        value={state.phone} />
                </Grid>
                <Grid item xs={12}>
                    {editable && wasEdited() && (
                        <button
                            type="button"
                            className="clientForm__save"
                            disabled={isDisabled()}
                            onClick={() => onSubmit(state)}>
                        </button>
                    )}
                    {editable && !wasEdited() && (
                        <button
                            type="button"
                            className="clientForm__continue"
                            onClick={() => onContinue()}>
                        </button>
                    )}
                </Grid>
            </Grid>
        </div>
    )
}

export default ClientForm;