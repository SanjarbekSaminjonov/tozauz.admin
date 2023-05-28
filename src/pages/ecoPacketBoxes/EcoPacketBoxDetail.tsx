import './ecoPacketBoxDetail.scss'

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { Button } from '@mui/material';

import { ecoPacketBoxesServices } from "../../services/ecoPacket/ecoPacketBoxes.services";
import { formatDateTime } from "../../services/utils";
import BackLink from '../../components/BackLink';
import { Column } from "../../types/table.types";
import DataTable from "../../components/dataTable/DataTable";

const EcoPacketBoxDetail = () => {

    const { boxId } = useParams<{ boxId: string }>();

    const [box, setBox] = useState<any>(null);
    const [lifeCycles, setLifeCycles] = useState<any>(null);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [loading, setLoading] = useState(false);

    const handleChangePageIndex = (event: unknown, newPage: number) => {
        setPageIndex(newPage);
    };

    const handleChangePageSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(+event.target.value);
        setPageIndex(0);
    };

    useEffect(() => {
        if (typeof boxId === 'undefined') return;
        ecoPacketBoxesServices.getOne(boxId).then((res: any) => {
            setBox(res.data);
        })
    }, [boxId]);

    useEffect(() => {
        if (!box) return;
        setLoading(true);
        ecoPacketBoxesServices.getLifeCycles(box.id).then((res: any) => {
            setLifeCycles(res.data);
            setLoading(false);
        }).catch((err: any) => {
            setLoading(false);
        })
    }, [box]);

    useEffect(() => {
        if (!lifeCycles) return;
        console.log(lifeCycles);
    }, [lifeCycles]);

    const columns: readonly Column[] = [
        {
            id: "id",
            label: "ID"
        },
        {
            id: "employee",
            label: "Hodim",
            align: 'center',
            format: (row) => {
                return <Link to={`/user-bank/${row.employee.id}`}>{row.employee.first_name} {row.employee.last_name}</Link>
            }
        },
        {
            id: "state",
            label: "Holati",
            align: 'center',
            format: (row) => {
                return `${row.state} %`
            }
        },
        {
            id: "location",
            label: "Joylashuvi",
            align: 'center',
            format: (row) => {
                if (row.location === null) return "Joylashuvi aniqlanmagan"
                if (row.location.includes(" ")) {
                    const lng = row.location.split(" ")[0];
                    const lat = row.location.split(" ")[1];
                    return <a href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`} target="_blank" rel="noreferrer">Google Maps</a>
                }
            }
        },
        {
            id: "started_at",
            label: "Boshlandi",
            align: 'right',
            format: (row) => {
                return formatDateTime(row.started_at)
            }
        },
        {
            id: "filled_at",
            label: "To'lgan sana",
            align: 'right',
            format: (row) => {
                if (row.filled_at === null) return "To'ldirilmagan"
                return formatDateTime(row.filled_at)
            }
        },
    ]

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
                            <div className="label">Holati</div>
                            <div className="value">
                                {
                                    box.state > 80
                                        ? <span style={{ color: "red", fontWeight: "bold" }}>{box.state} %</span>
                                        : <span style={{ color: "green", fontWeight: "bold" }}>{box.state} %</span>
                                }
                            </div>
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
            <div className="table">
                <h3 className="title">Yashik davrlari</h3>
                <DataTable
                    isLoading={loading}
                    total={lifeCycles?.count || 0}
                    rows={lifeCycles?.results || []}
                    columns={columns}
                    page={pageIndex}
                    rowsPerPage={pageSize}
                    handleChangePage={handleChangePageIndex}
                    handleChangeRowsPerPage={handleChangePageSize}
                />
            </div>
        </div>
    )
}

export default EcoPacketBoxDetail