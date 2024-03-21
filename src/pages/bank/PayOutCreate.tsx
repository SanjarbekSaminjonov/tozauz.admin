import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {payOutServices} from "../../services/payOutServices";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Toast from "../../components/Toast";
import Draggable from "react-draggable";
import {NumberFormatValues, NumericFormat, PatternFormat} from "react-number-format";

export default function PayOutCreate(props: any) {
    const [open, setOpen] = React.useState(false);
    const [amount, setAmount] = React.useState<number | null>(0)
    const [card, setCard] = React.useState('')
    const [cardName, setCardName] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const [openErrorToast, setOpenErrorToast] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState('')

    const {userId, reload, setLoadPayOut} = props

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        if (!amount) {
            setErrorMessage('Pul miqdorini kiriting')
            setOpenErrorToast(true)
            return;
        }

        if (amount < 0) {
            setErrorMessage('Pul miqdori 0 dan yuqori bo\'lishi kerak')
            setOpenErrorToast(true)
            return
        }

        setLoading(true)
        payOutServices.createPayOut(userId, amount, card, cardName).then((res) => {
            setLoading(false)

            if (res?.data.error) {
                if (res.data.error === "The user's capital is insufficient. Please try paying less") {
                    setErrorMessage('Hisobda bunday miqdorda pul yo\'q.')
                } else {
                    setErrorMessage(res.data.error)
                }
                console.log(errorMessage)
                setOpenErrorToast(true)
                return
            }
            setLoadPayOut(reload + 1)
            setOpen(false)
        })
    }

    const onChangeCategorySum = (numeric: NumberFormatValues) => {
        setAmount(numeric.value !== '' ? Number(numeric.value) : null)
    }

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                Pul o'tkazish
            </Button>
            <Draggable>
                <Dialog open={open} onClose={handleClose} BackdropProps={{invisible: true}}>
                    <DialogTitle>Pul o'tkazish</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Ushbu foydalanuvchi yoki ishchi uchun to'lovni amalga oshirish
                        </DialogContentText>
                        <NumericFormat
                            value={amount}
                            thousandSeparator
                            fullWidth
                            autoFocus
                            margin="dense"
                            id="amount"
                            variant="standard"
                            customInput={TextField}
                            label="Pul summasi (so'mda)"
                            onValueChange={onChangeCategorySum}
                        />
                        <PatternFormat
                            value={card}
                            customInput={TextField}
                            margin="dense"
                            id="card"
                            label="Karta raqami"
                            fullWidth
                            mask="*"
                            format="####  ####  ####  ####"
                            variant="standard"
                            onValueChange={(numeric) => setCard(numeric.value)}
                        />
                        <TextField
                            margin="dense"
                            id="cardName"
                            label="Karta nomi"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setCardName(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Bekor qilish</Button>
                        <Button onClick={handleSubmit}>Ok</Button>
                    </DialogActions>
                    <Toast
                        severity="error"
                        message={errorMessage}
                        isOpen={openErrorToast}
                        handleClose={() => setOpenErrorToast(false)}
                    />
                    <Backdrop
                        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                        open={loading}
                    >
                        <CircularProgress color="inherit"/>
                    </Backdrop>
                </Dialog>
            </Draggable>
        </div>
    );
}
