import { useState } from 'react'
import FullScreenDialog from '../../components/FullScreenDialog'

interface Props {
    setLoad: (val: boolean) => void;
}

const UserCreate = (props: Props) => {

    const { setLoad } = props;
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <FullScreenDialog
                open={open}
                handleClose={handleClose}
            />
        </div>
    )
}

export default UserCreate