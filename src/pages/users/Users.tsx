import "./users.scss"
import React, {useEffect, useState} from "react"

import {IconButton, TextField} from '@mui/material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import Select from 'react-select';

import {User, UserFetchResponse} from "../../types/users.types"
import {Column} from "../../types/table.types"
import DataTable from "../../components/dataTable/DataTable"
import {getUsers} from "../../services/users.services";
import {categoriesServices} from "../../services/categories.services";

import UserDelete from "./UserDelete";
import UserCreate from "./UserCreate";
import {CategoryObj} from "../../types/categories.types";
import UserUpdate from "./UserUpdate";


const Users = () => {
    const [categories, setCategories] = useState<CategoryObj[]>([])
    const [rows, setRows] = useState<UserFetchResponse>({
        count: 0,
        next: null,
        previous: null,
        results: []
    } as UserFetchResponse)

    const [search, setSearch] = useState<string>('')
    const [selectedRole, setSelectedRole] = useState<string>('')
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(false)
    const [load, setLoad] = useState(false)

    useEffect(() => {
        setLoading(true)
        categoriesServices.categories().then((res) => {
            setCategories(res)
        })
        getUsers(
            search,
            selectedRole,
            page + 1,
            rowsPerPage
        ).then((res) => {
            setRows(res.data)
            setLoading(false)
        });
        setLoad(false)
    }, [search, selectedRole, page, rowsPerPage, load])

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    const handleRoleSelect = (event: any) => {
        setSelectedRole(event.value)
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleEdit = (row: User) => {
        console.log(row)
    }

    const columns: readonly Column[] = [
        {
            id: 'id',
            label: 'ID',
            minWidth: 5
        },
        {
            id: 'first_name',
            label: 'Ism',
            minWidth: 90
        },
        {
            id: 'last_name',
            label: 'Familiya',
            minWidth: 90
        },
        {
            id: 'phone_number',
            label: 'Telefon raqami',
            minWidth: 50,
            align: 'right'
        },
        {
            id: 'role',
            label: 'Rol',
            minWidth: 50,
            align: 'right',
            format: (row: User) => {
                switch (row.role) {
                    case "POP":
                        return "Aholi"
                    case "EMP":
                        return "Ishchi"
                    case 'ADMIN':
                        return "Admin"
                    default:
                        return " - "
                }
            }
        },
        {
            id: 'categories',
            label: 'Kategoriyalar',
            minWidth: 90,
            align: 'right',
            format: (row: User) => {
                return (
                    <div>
                        {
                            row.categories.length > 0
                                ? (row.categories.map((category) => {
                                    return <div key={category}>{
                                        categories.find((cat) => cat.id === category)?.name
                                    }
                                    </div>
                                }))
                                : 'Kiritilmagan'
                        }
                    </div>
                )
            }
        },
        {
            id: 'car_number',
            label: 'Mashina raqami',
            minWidth: 50,
            align: 'right',
            format: (row: User) => {
                return (
                    <div>
                        {row.car_number ? row.car_number : 'Kiritilmagan'}
                    </div>
                )
            }
        },
        {
            id: 'edit',
            label: '',
            align: 'right',
            format: (row: User) => {
                return (
                    <UserUpdate user={row} setLoad={setLoad} />
                )
            }
        },
        {
            id: 'delete',
            label: '',
            format: (row: User) => {
                return <UserDelete setLoad={setLoad} row={row}/>
            }
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
                            onChange={handleSearch}
                        />
                        <Select
                            options={[
                                {value: '', label: 'Barchasi'},
                                {value: 'POP', label: 'Aholi'},
                                {value: 'EMP', label: 'Ishchi'},
                                {value: 'ADMIN', label: 'Admin'},
                            ]}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            name="role"
                            isSearchable={false}
                            styles={{control: base => ({...base, height: "56px"})}}
                            onChange={(e: any) => {
                                handleRoleSelect(e)
                            }}
                        />
                    </div>
                    <UserCreate
                        setLoad={setLoad}
                    />
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
    )
}

export default Users