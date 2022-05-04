import { dividerClasses } from "@mui/material";
import React from 'react';
import {Alert} from '@mui/material';

export default class AlertMessage extends React.Component {
    render() {
        const { alert_type, alert_message } = this.props;
        return (
            <Alert severity={alert_type} onClose={() => {}}>{alert_message}</Alert>
        );
    }
}