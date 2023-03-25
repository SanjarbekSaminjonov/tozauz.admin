import { useState } from 'react'
import FullScreenDialog from '../../components/FullScreenDialog'
import { Button } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

interface Props {
    setLoad: (val: boolean) => void;
}

const UserCreate = (props: Props) => {

    const { setLoad } = props;
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }

    const onSubmit = () => {
        console.log("submit")
        setOpen(false)
        setLoad(true)
    }

    return (
        <div>
            <Button onClick={() => setOpen(true)}>
                <PersonAddAlt1Icon />
            </Button>
            <FullScreenDialog
                title="Yangi foydalanuvchi qo'shish"
                open={open}
                handleClose={handleClose}
            >
                <div onClick={onSubmit}>Hello</div>
            </FullScreenDialog>
        </div>
    )
}

export default UserCreate