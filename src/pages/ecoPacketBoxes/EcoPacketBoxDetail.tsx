import './ecoPacketBoxDetail.scss'

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { ecoPacketBoxesServices } from "../../services/ecoPacket/ecoPacketBoxes.services";
import { formatDateTime } from "../../services/utils";
import BackLink from '../../components/BackLink';
import { Button } from '@mui/material';

const EcoPacketBoxDetail = () => {

    const { boxId } = useParams<{ boxId: string }>();

    const [box, setBox] = useState<any>(null);

    useEffect(() => {
        if (typeof boxId === 'undefined') return;
        ecoPacketBoxesServices.getOne(boxId).then((res: any) => {
            setBox(res.data);
        })
    }, [boxId]);

    return (
        <div className={"boxDetail"}>
            <BackLink pathName={'/boxes'} />
            <Paper elevation={3} className="header">
                <h2 className="title">Quti ma'lumotlari {!box && "topilmadi"}</h2>
                {box && (
                    <div className="content">
                        <div className="item">
                            <div className="label">Nomi</div>
                            <div className="value">{box.name}</div>
                        </div>

                        <span className="divider"></span>

                        <div className="item">
                            <div className="label">Sim module</div>
                            <div className="value">{box.sim_module}</div>
                        </div>

                        <span className="divider"></span>

                        <div className="item">
                            <div className="label">Qr Kod</div>
                            <div className="value">{box.qr_code}</div>
                        </div>

                        <span className="divider"></span>

                        <div className="item">
                            <div className="label">Quti qo'shilgan sanasi</div>
                            <div className="value">{formatDateTime(box.created_at)}</div>
                        </div>

                        <span className="divider"></span>

                        <div className="item">
                            <Link to={`/boxes/${box.id}/delete`}>
                                <Button sx={{
                                    backgroundColor: "red",
                                    fontWeight: "bold",
                                    ":hover": { backgroundColor: "red" }
                                }}
                                    variant="contained">
                                    O'chirish
                                </Button>
                            </Link>
                        </div>

                    </div>
                )}
            </Paper>
        </div>
    )
}

export default EcoPacketBoxDetail