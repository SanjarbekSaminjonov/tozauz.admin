import "./users.scss"
import { useEffect, useState } from "react"

import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

import {
    User,
    UserFetchResponse,
    UserTableFilters
} from "../../types/users.types"
import { Column } from "../../types/table.types"

import TableFilter from "../../components/filter/Filter"
import DataTable from "../../components/dataTable/DataTable"
import { getUsers } from "../../services/users.services";
import UserDelete from "./UserDelete";
import UserCreate from "./UserCreate";


const Users = () => {

    const [load, setLoad] = useState(false)

    const [rows, setRows] = useState<UserFetchResponse>({
        count: 0,
        next: null,
        previous: null,
        results: []
    } as UserFetchResponse)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getUsers(
            page + 1,
            rowsPerPage
        ).then((res) => {
            setRows(res.data)
            setLoading(false)
        });
        setLoad(false)
    }, [page, rowsPerPage, load])

    const handleView = (row: User) => {
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
                        {row.categories.map((category) => {
                            return <div key={category}>{"fsdfs"}</div>
                        })}
                    </div>
                )
            }
        },
        {
            id: 'car_number',
            label: 'Mashina raqami',
            minWidth: 50,
            align: 'right'
        },
        {
            id: 'view',
            label: '',
            align: 'right',
            format: (row: User) => {
                return (
                    <IconButton
                        aria-label="view"
                        onClick={(view) => handleView(row)}
                    >
                        <VisibilityIcon />
                    </IconButton>
                )
            }
        },
        {
            id: 'delete',
            label: '',
            format: (row: User) => {
                return <UserDelete setLoad={setLoad} row={row} />
            }
        },
    ];

    const onFilterChange = (filter: UserTableFilters) => {
        console.log(filter)
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div className="users">
            <div className="table">
                <div className="tableFiler">
                    <TableFilter onFilterChange={onFilterChange} />
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