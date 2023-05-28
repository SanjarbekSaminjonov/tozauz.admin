import { Column } from "../../types/table.types";
import DataTable from "../../components/dataTable/DataTable";
import React, { useEffect, useState } from "react";

import { payOutServices } from "../../services/payOutServices";

import { formatDateTime, numberWithCommas } from "../../services/utils";

const UserPayouts = (props: any) => {
    const { userId, reload, setPayOutSumma } = props;
    const [rows, setRows] = useState<any>(undefined);

    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        payOutServices.getUserPayOuts(userId, pageIndex + 1, pageSize).then((res) => {
            setRows(res.data)
            setPayOutSumma(res.data.amount__sum)
            setLoading(false)
        })
    }, [userId, pageIndex, pageSize, reload, setPayOutSumma])


    const handleChangePage = (event: unknown, newPage: number) => {
        setPageIndex(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPageSize(+event.target.value);
        setPageIndex(0);
    };

    const columns: readonly Column[] = [
        {
            id: "id",
            label: "ID",
        },
        {
            id: "amount",
            label: "Miqdori",
            format: (row: any) => {
                return numberWithCommas(row.amount) + " so'm";
            }
        },
        {
            id: "created_at",
            label: "Vaqt",
            align: "center",
            format: (row: any) => {
                return formatDateTime(row.created_at);
            }
        },
        {
            id: "card",
            label: "Karta",
            align: "right",
            format: (row: any) => {
                if (!row.card) {
                    return "Karta raqami kiritilmagan"
                }
                return <>
                    {row.card}
                    <br />
                    {row.card_name}
                </>
            }
        },
        {
            id: "admin",
            label: "Admin",
            align: "right",
            format: (row: any) => {
                return <>
                    {row.admin.first_name}
                    {" // "}
                    {row.admin.phone_number}
                </>
            }
        }
    ]

    return (
        <DataTable
            isLoading={loading}
            total={rows?.count}
            rows={rows?.results}
            columns={columns}
            page={pageIndex}
            rowsPerPage={pageSize}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
    )
}

export default UserPayouts;