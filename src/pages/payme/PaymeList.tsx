import React, { useEffect, useState } from "react";

import { Button, TextField } from "@mui/material";

import { User, UserFetchResponse } from "../../types/users.types";
import { Column } from "../../types/table.types";
import DataTable from "../../components/dataTable/DataTable";
import { Link, useParams } from "react-router-dom";
import { paymeServices } from "../../services/payme.services";
import { formatCardNumberwith4 } from "../../services/utils";

const PaymeList = () => {
    const { earnerType } = useParams<string>()

    const [rows, setRows] = useState<UserFetchResponse>({
        count: 0,
        next: null,
        previous: null,
        results: [],
    } as UserFetchResponse);

    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        setLoading(true);
        paymeServices.getList(
            page + 1,
            rowsPerPage,
            search,
            earnerType
        ).then((res) => {
            setRows(res.data);
            setLoading(false);
        });
        setLoad(false);
    }, [search, page, rowsPerPage, load, earnerType]);

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

    const columns: readonly Column[] = [
        {
            id: "full_name",
            label: "F.I.O",
            format: (row) => {
                return (
                    <div>
                        {row.user.first_name && row.user.last_name
                            ? row.user.first_name + " " + row.user.last_name
                            : "Kiritilmagan"}
                    </div>
                );
            },
        },
        {
            id: "phone_number",
            label: "Telefon raqami",
            minWidth: 50,
            align: "right",
            format: (row) => {
                return (
                    <div>
                        {row.user.phone_number ? row.user.phone_number : "Kiritilmagan"}
                    </div>
                );
            },
        },
        {
            id: "card",
            label: "Karta raqami",
            minWidth: 50,
            align: "right",
            format: (row) => {
                return (
                    <div>
                        {row.card ? <b>{formatCardNumberwith4(row.card)}</b> : "Kiritilmagan"}
                        <br />
                        <span>{row.card_name}</span>
                    </div>
                );
            },
        },
        {
            id: "bank",
            label: "",
            align: "right",
            format: (row: User) => {
                return <Link to={`/user-bank/${row.id}`}>
                    <Button variant="contained">
                        To'lash
                    </Button>
                </Link>;
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

export default PaymeList;