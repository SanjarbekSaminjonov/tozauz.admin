import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogProps } from '../types/props.types';

export default function ConfirmDialog(props: DialogProps) {

    const {
        open,
        title,
        content,
        onConfirm,
        onCancel
    } = props;


    return (
        <Dialog
            open={open}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>
                    Bekor qilish
                </Button>
                <Button onClick={onConfirm} autoFocus>
                    Tasdiqlash
                </Button>
            </DialogActions>
        </Dialog>
    );
}