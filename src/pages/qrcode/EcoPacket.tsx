import './table.scss'

import {Column} from "../../types/table.types";
import DataTable from "../../components/dataTable/DataTable";
import React, {useEffect, useState} from "react";
import {CategoryObj} from "../../types/categories.types";
import {categoriesServices} from "../../services/categories.services";
import {earningServices} from "../../services/earningServices";
import {formatDateTime} from "../../services/utils";
import {Button, TextField} from "@mui/material";
import Select from "react-select";

const EcoPacket = (props: any) => {
    const {userId, setEarningSumma} = props;
    const [categories, setCategories] = useState<CategoryObj[]>([]);
    const [rows, setRows] = useState<any>(undefined);

    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        categoriesServices.categories().then((res) => {
            setCategories(res);
        });
    }, [])

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
            label: "Tranzaksiya raqami",
        },
        {
            id: "amount",
            label: "Miqdori",
            format: (row: any) => {
                return row.amount + " so'm";
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
            align: "right",
            format: (row: any) => {
                const category = categories.find((item: CategoryObj) => item.id === row.tarrif);
                return category?.name;
            }
        }
    ]

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setSearch(event.target.value);
        console.log(event.target.value)
    }

    const handleRoleSelect = (event: any) => {
        // setSelectedRole(event.value);
        console.log(event.value)
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

    return (
        <>
            <div className="tableHeader">
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
                        options={[
                            {value: "", label: "Barchasi"},
                            {value: "POP", label: "Aholi"},
                            {value: "EMP", label: "Ishchi"},
                            {value: "ADMIN", label: "Admin"},
                        ]}
                        defaultValue={{value: "", label: "Barchasi"}}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        name="role"
                        isSearchable={false}
                        onChange={(e: any) => {
                            handleRoleSelect(e);
                        }}
                    />
                </div>
                <Button variant="contained" color="primary">Add</Button>
            </div>
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
        </>

    )
}

export default EcoPacket