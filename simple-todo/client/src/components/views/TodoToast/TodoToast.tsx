import Alert from '@mui/material/Alert';
import './TodoToast.scss';
import type { toast } from '../../../interfaces/toast';

export function TodoToast(props: toast) {
  const { severity, message } = props;
  return (
    <div className="toast-message">
      <Alert severity={severity}>{message}</Alert>
    </div>
  );
}
export default TodoToast;
