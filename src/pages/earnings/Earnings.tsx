import './earnings.scss'
import React, {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";
import DataTable from "../../components/dataTable/DataTable";
import {Column} from "../../types/table.types";
import {formatDateTime, numberWithCommas} from "../../services/utils";
import {categoriesServices} from "../../services/categories.services";
import {CategoryObj} from "../../types/categories.types";
import {Link} from "react-router-dom";
import {earningServices} from "../../services/earningServices";
import {Chip, TextField} from "@mui/material";

import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Tooltip from "@mui/material/Tooltip";

import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Select from "react-select";

const Earnings = () => {
    const [categories, setCategories] = useState<CategoryObj[]>([]);
    const [rows, setRows] = useState<any>([]);

    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [selectedCategory, setSelectedCategory] = useState<any>('');
    const [search, setSearch] = useState<any>('');
    const [startDate, setStartDate] = useState<any>('');
    const [endDate, setEndDate] = useState<any>('');

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        categoriesServices.getCategories().then(res => {
            setCategories(res.data);
            setIsLoading(false);
        })
    }, [])

    useEffect(() => {
        setIsLoading(true);
        earningServices.get(
            pageIndex + 1,
            pageSize,
            selectedCategory,
            search,
            startDate,
            endDate
        ).then(res => {
            setRows(res.data);
            setIsLoading(false);
        })
    }, [pageIndex, pageSize, selectedCategory, search, startDate, endDate])

    const columns: Column[] = [
        {
            id: 'created_at',
            label: 'Vaqti',
            align: 'left',
            format: (row: any) => formatDateTime(row.created_at),
        },
        {
            id: 'amount',
            label: 'Summa',
            align: 'center',
            format: (row: any) => numberWithCommas(row.amount)
        },
        {
            id: 'tarrif',
            label: 'Tarif',
            align: 'center',
            format: (row: any) => <Chip label={categories.find((item: any) => item.id === row.tarrif)?.name}/>
        },
        {
            id: 'box_packet',
            label: 'Box/Paket',
            align: 'center',
            format: (row: any) => {
                if (row.packet === null) {
                    return <Link to={`/boxes/${row.box}`}>
                        <Tooltip title="Qutini ko'rish" arrow>
                            <DeleteSweepIcon style={{color: "#019109"}}/>
                        </Tooltip>
                    </Link>
                }
                return <Link to={`/packets/${row.packet}`}>
                    <Tooltip title="Paketni ko'rish" arrow>
                        <LocalMallIcon style={{color: "#ff4646"}}/>
                    </Tooltip>
                </Link>
            }
        },
        {
            id: 'user',
            label: 'Foydalanuvchi',
            align: 'right',
            format: (row: any) => (
                <Link style={{textDecoration: "none", fontWeight: "bold"}} to={`/user-bank/${row.user.id}`}>
                    {row.user.first_name} {row.user.phone_number}
                </Link>
            )
        },
        {
            id: 'role',
            label: 'Rol',
            align: 'left',
            format: (row: any) => {
                if (row.user.role === 'ADMIN') {
                    return <Tooltip title="Administrator" arrow>
                        <AdminPanelSettingsRoundedIcon style={{color: "#00bb00"}}/>
                    </Tooltip>
                } else if (row.user.role === 'EMP') {
                    return <Tooltip title="Hodim" arrow>
                        <EngineeringRoundedIcon style={{color: "#0000ff"}}/>
                    </Tooltip>
                } else if (row.user.role === 'POP') {
                    return <Tooltip title="Aholi" arrow>
                        <PersonRoundedIcon style={{color: "#af0000"}}/>
                    </Tooltip>
                }
            }
        }
    ]

    const handleSearch = (e: any) => {
        setSearch(e.target.value);
    }

    const handleCategorySelect = (e: any) => {
        setSelectedCategory(e.value);
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPageIndex(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPageSize(+event.target.value);
        setPageIndex(0);
    };

    const handleStartDate = (e: any) => {
        setStartDate(e.target.value);
    }

    const handleEndDate = (e: any) => {
        setEndDate(e.target.value);
    }

    return (
        <div className="earnings">
            <h2 style={{marginBottom: "10px"}}>Ishlangan mablag' ({numberWithCommas(rows.amount__sum)} so'm)</h2>
            <Paper>
                <div className={"tableHeader"}>
                    <div className="tableFilter">
                        <TextField
                            label="Qidirish"
                            type="search"
                            sx={{
                                backgroundColor: "white",
                                borderRadius: "5px",
                            }}
                            size={"small"}
                            onChange={handleSearch}
                        />
                        <Select
                            options={
                                [
                                    {value: "", label: "Barchasi"},
                                    ...categories.map((item: any) => {
                                        return {value: item.id, label: item.name}
                                    })
                                ]
                            }
                            defaultValue={{value: "", label: "Barchasi"}}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            name="role"
                            isSearchable={false}
                            onChange={(e: any) => {
                                handleCategorySelect(e);
                            }}
                        />
                    </div>
                    <div className="dateFilter">
                        <TextField
                            type="date"
                            sx={{
                                backgroundColor: "white",
                                borderRadius: "5px",
                            }}
                            size={"small"}
                            onChange={handleStartDate}
                        />
                        <div> dan - gacha</div>
                        <TextField
                            type="date"
                            sx={{
                                backgroundColor: "white",
                                borderRadius: "5px",
                            }}
                            size={"small"}
                            onChange={handleEndDate}
                        />
                    </div>
                </div>
                <DataTable
                    isLoading={isLoading}
                    columns={columns}
                    rows={rows?.results}
                    total={rows?.count}
                    page={pageIndex}
                    rowsPerPage={pageSize}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}

export default Earnings;
