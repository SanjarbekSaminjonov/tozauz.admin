import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {CategoryObj} from '../../types/categories.types';
import {categoriesServices} from '../../services/categories.services';
import Toast from '../../components/Toast';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {NumberFormatValues, NumericFormat} from 'react-number-format';

export default function FormDialog({loadList}: { loadList: (value: boolean) => void }) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [summa, setSumma] = React.useState<number | null>(0);

    const [openErrorToast, setOpenErrorToast] = React.useState(false)
    const [openSuccessToast, setOpenSuccessToast] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [successMessage, setSuccessMessage] = React.useState('')
    const [errorMessage, setErrorMessage] = React.useState('')

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        const category: CategoryObj = {
            id: 0,
            name: name,
            summa: summa || 0,
            count_user: 0
        }
        setIsLoading(true)
        categoriesServices.createCategory(category).then((res) => {
            setIsLoading(false)
            setSuccessMessage("Kateqoriya muvaffaqiyatli qo'shildi")
            setOpenSuccessToast(true)
            loadList(true)
        }).catch((err) => {
            setIsLoading(false)
            setErrorMessage('Xatolik yuz berdi')
            setOpenErrorToast(true)
        })
        setOpen(false);
    };

    const onChangeCategorySum = (numeric: NumberFormatValues) => {
        setSumma(numeric.value !== '' ? Number(numeric.value) : null)
    }

    return (
        <div>
            <Button size="large" color="primary" variant="contained" onClick={handleClickOpen}>
                Yangi kategoriya
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Yangi kategoriya</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Yangi kategoriya qo'shish uchun nomi va summasini kiriting
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Kategoriya nomi"
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <NumericFormat
                        value={summa}
                        thousandSeparator
                        customInput={TextField}
                        margin="dense"
                        id="summa"
                        label="Kategoriya summasi"
                        fullWidth
                        variant="standard"
                        onValueChange={onChangeCategorySum}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Bekor qilish</Button>
                    <Button onClick={handleSubmit}>Saqlash</Button>
                </DialogActions>

                <Toast
                    severity="error"
                    message={errorMessage}
                    isOpen={openErrorToast}
                    handleClose={() => setOpenErrorToast(false)}
                />
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={isLoading}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>
            </Dialog>
            <Toast
                severity="success"
                message={successMessage}
                isOpen={openSuccessToast}
                handleClose={() => setOpenSuccessToast(false)}
            />
        </div>
    );
}