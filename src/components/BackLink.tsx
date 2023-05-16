import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


type Props = {
    pathName: string
}

const BackLink = ({ pathName }: Props) => {
    return (
        <div style={{
            margin: '20px'
        }}>
            <Link to={`${pathName}`}>
                <Button variant="contained">
                    <ArrowBackIcon />
                    Orqaga
                </Button>
            </Link>
        </div>
    )
}

export default BackLink