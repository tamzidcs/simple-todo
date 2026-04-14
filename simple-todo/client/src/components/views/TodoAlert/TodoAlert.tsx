import * as React from 'react';
import Alert from '@mui/material/Alert';
import './TodoAlert.scss';
import { alert } from '../../../interfaces/alert';

export function TodoAlert(props: alert) {
  const { severity, message } = props;
  return (
    <div className="alert-message">
      <Alert severity={severity}>{message}</Alert>
    </div>
  );
}
export default TodoAlert;
