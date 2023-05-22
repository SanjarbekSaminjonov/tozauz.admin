import React, { useEffect, useState } from "react";

import { Button, TextField } from "@mui/material";

import { Column } from "../../types/table.types";
import DataTable from "../../components/dataTable/DataTable";
import { useParams } from "react-router-dom";
import { paymeServices } from "../../services/payme.services";
import { formatCardNumberwith4, formatDateTime, numberWithCommas } from "../../services/utils";


const UserPaymeList = ({ userId, reload, setReloadPage }: any) => {
    const { earnerType } = useParams<string>()

    const [rows, setRows] = useState({
        count: 0,
        next: null,
        previous: null,
        results: [],
    });

    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        setLoading(true);
        paymeServices.getList(
            page + 1,
            rowsPerPage,
            search,
            earnerType,
            userId
        ).then((res) => {
            setRows(res.data);
            setLoading(false);
        });
        setLoad(false);
    }, [search, page, rowsPerPage, load, earnerType, userId]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setPage(0);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const onPay = (id: number) => {
        paymeServices.pay(id).then((res) => {
            setLoad(true);
            setReloadPage(reload + 1);
        });
    };

    const columns: readonly Column[] = [
        {
            id: "created_at",
            label: "So'rov vaqti",
            align: "center",
            minWidth: 50,
            format: (row) => {
                return (
                    formatDateTime(row.created_at)
                );
            },
        },
        {
            id: "card",
            label: "Karta raqami",
            minWidth: 50,
            align: "center",
            format: (row) => {
                return (
                    <div>
                        {row.card ? <b>{formatCardNumberwith4(row.card)}</b> : "Kiritilmagan"}
                    </div>
                );
            },
        },
        {
            id: "card_name",
            label: "Karta nomi",
            minWidth: 50,
            align: "center",
            format: (row) => {
                return (
                    <div>
                        {row.card_name ? <b>{formatCardNumberwith4(row.card_name)}</b> : "Kiritilmagan"}
                    </div>
                );
            },
        },
        {
            id: "amount",
            label: "Summa (so'm)",
            minWidth: 50,
            align: "center",
            format: (row) => {
                return (
                    numberWithCommas(row.amount)
                );
            },
        },
        {
            id: "bank",
            label: "To'lov holati",
            align: "center",
            format: (row) => {
                if (row.payed) {
                    return <Button variant="text" >
                        To'langan
                    </Button>;
                }
                return <Button onClick={() => onPay(row.id)} variant="contained" color="error">
                    To'lash
                </Button>
            },
        },
    ];



    return (
        <div className="users">
            <div className="table">
                <div className="tableHeader">
                    <div className="tableFiler">
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
                    </div>
                </div>
                <DataTable
                    isLoading={loading}
                    total={rows.count}
                    rows={rows.results}
                    columns={columns}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </div>
        </div>
    );
}

export default UserPaymeList;