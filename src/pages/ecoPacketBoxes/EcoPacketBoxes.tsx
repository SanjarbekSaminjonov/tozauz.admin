import './ecoPacketBoxes.scss'

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {ecoPacketBoxesServices} from '../../services/ecoPacket/ecoPacketBoxes.services';
import {formatDateTime} from "../../services/utils";
import {categoriesServices} from "../../services/categories.services";

const BoxCard = ({box}: any) => (
    <Box sx={{minWidth: 275}}>
        <Card variant="outlined">
            <CardContent>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    {formatDateTime(box.created_at)} da qo'shilgan
                </Typography>
                <Typography variant="h5" component="div">
                    {box.name}
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    {box.category?.name}
                </Typography>
                <Typography variant="body2">
                    Sim moduli/Qr Kod: <i>{box.sim_module}</i>
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    </Box>
);

const EcoPacketBoxes = () => {
    const [rows, setRows] = React.useState<any>([]);

    const [categories, setCategories] = React.useState<any>([]);

    React.useEffect(() => {
        ecoPacketBoxesServices.getAll().then((res: any) => {
            setRows(res.data);
        });
    }, []);

    React.useEffect(() => {
        categoriesServices.categories().then((res: any) => {
            setCategories(res);
            console.log(res);
        });
    }, []);

    return (
        <div className='ecoPacketBoxes'>
            <div className="header">Header</div>
            <div className="content">
                {
                    rows.map((row: any) => {
                        const category = categories?.find((category: any) => category.id === row.category);
                        row.category = category;
                        console.log(category);
                        return (
                            <div className="card" key={row.id}>
                                <BoxCard
                                    box={row}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default EcoPacketBoxes