import './table.scss'

import {Column} from "../../types/table.types";
import DataTable from "../../components/dataTable/DataTable";
import React, {useEffect, useState} from "react";
import {CategoryObj} from "../../types/categories.types";
import {categoriesServices} from "../../services/categories.services";

import {formatDateTime} from "../../services/utils";
import {Button, TextField} from "@mui/material";
import Select from "react-select";
import {ecoPacketServices} from "../../services/qrcodes/ecoPacket.services";
import {Link} from "react-router-dom";

const EcoPacket = (props: any) => {

    const [categories, setCategories] = useState<CategoryObj[]>([]);
    const [rows, setRows] = useState<any>(undefined);

    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        categoriesServices.categories().then((res) => {
            setCategories(res);
        });
    }, [])

    useEffect(() => {
        setLoading(true)
        ecoPacketServices.get(
            pageIndex + 1,
            pageSize,
            search
        ).then((res) => {
            setRows(res.data)
            setLoading(false)
        })
    }, [pageIndex, pageSize, search])

    const columns: readonly Column[] = [
        {
            id: "qr_code",
            label: "Qr Code",
            format: (row: any) => {
                return row.qr_code;
            }
        },
        {
            id: "box",
            label: "Quti",
            align: "center",
            format: (row: any) => {
                return <Link to={`/qrcodes/box/${row.box.id}?life_cycle=${row.life_cycle}`}>{row.box.name}</Link>;
            }
        },
        {
            id: "user",
            label: "Foydalanuvchi",
            align: "center",
            format: (row: any) => {
                return <Link to={`/user-bank/${row.user.id}`}>{row.user.first_name}</Link>;
            }
        },
        {
            id: "category",
            label: "Kategoriya",
            align: "center",
            format: (row: any) => {
                const category = categories.find((item: CategoryObj) => item.id === row.category);
                return category?.name;
            }
        },
        {
            id: "created_at",
            label: "Yaratilgan vaqti",
            align: "center",
            format: (row: any) => {
                return formatDateTime(row.created_at);
            }
        },
        {
            id: "scannered_at",
            label: "Skaner qilingan vaqti",
            align: "right",
            format: (row: any) => {
                return formatDateTime(row.scannered_at);
            }
        },
    ]

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
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