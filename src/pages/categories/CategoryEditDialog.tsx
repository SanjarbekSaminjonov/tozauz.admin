import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CategoryObj } from '../../types/categories.types';
import { categoriesServices } from '../../services/categories.services';

import Toast from '../../components/Toast';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { deleteButtonVisible } from '../../settings';


export default function FormDialog({ category, loadList }: { category: CategoryObj, loadList: (value: boolean) => void }) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState(category.name);
    const [summa, setSumma] = React.useState(category.summa);

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

    const handleDelete = () => {
        setIsLoading(true);
        categoriesServices.deleteCategory(category.id).then((res) => {
            setIsLoading(false)
            setSuccessMessage("Kateqoriya muvaffaqiyatli o'chirildi")
            setOpenSuccessToast(true)
            loadList(true)
        }).catch((err) => {
            setIsLoading(false)
            setErrorMessage('Xatolik yuz berdi')
            setOpenErrorToast(true)
        })
        setOpen(false)
    }

    const handleSubmit = () => {
        category.name = name;
        category.summa = summa;
        setIsLoading(true)
        categoriesServices.updateCategory(category).then((res) => {
            setIsLoading(false)
            setSuccessMessage("Kateqoriya muvaffaqiyatli yangilandi")
            setOpenSuccessToast(true)
            loadList(true)
        }).catch((err) => {
            setIsLoading(false)
            setErrorMessage('Xatolik yuz berdi')
            setOpenErrorToast(true)
        })
        setOpen(false);
    };

    return (
        <div>
            <Button size="small" color="primary" onClick={handleClickOpen}>
                O'zgartirish
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>O'zgartirish</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ushbu kategoriya bo'yicha {category.count_user || 0} ta foydalanuvchi(ishchi) bor.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Kategoriya nomi"
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={category.name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="summa"
                        label="Kategoriya summasi"
                        type="number"
                        fullWidth
                        variant="standard"
                        defaultValue={category.summa}
                        onChange={(e) => setSumma(Number(e.target.value))}
                    />
                </DialogContent>
                <DialogActions>
                    {deleteButtonVisible && <Button onClick={handleDelete} sx={{ color: "red" }}>O'chirish</Button>}
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
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isLoading}
                >
                    <CircularProgress color="inherit" />
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