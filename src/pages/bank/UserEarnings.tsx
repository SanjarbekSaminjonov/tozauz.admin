import {Column} from "../../types/table.types";
import DataTable from "../../components/dataTable/DataTable";
import React, {useEffect, useState} from "react";
import {earningServices} from "../../services/earningServices";
import {formatDateTime, numberWithCommas} from "../../services/utils";

const UserEarnings = (props: any) => {
    const {userId, setEarningSumma} = props;
    const [rows, setRows] = useState<any>(undefined);

    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        earningServices.getUserEarnings(userId, pageIndex + 1, pageSize).then((res) => {
            setRows(res.data)
            setEarningSumma(res.data.amount__sum)
            setLoading(false)
        })
    }, [userId, pageIndex, pageSize, setEarningSumma])

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
            id: "tarrif",
            label: "Kategoriya",
            align: "right"
        }
    ]

    const handleChangePage = (event: unknown, newPage: number) => {
        setPageIndex(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPageSize(+event.target.value);
        setPageIndex(0);
    };

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

export default UserEarnings