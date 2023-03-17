import "./users.scss"

import { User, UserFetchResponse } from "../../types/users"
import { Column } from "../../types/table"
import DataTable from "../../components/dataTable/DataTable"

import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import UserTableFilter from "../../components/filter/Filter"
import { UserTableFilters } from "../../types/users"


const rows: UserFetchResponse = JSON.parse(
    `{
        "count": 36,
        "next": "http://tozauz-api.saminjonov.uz/api/v1/account/admin-register/?page=2",
        "previous": null,
        "results": [
            {
                "id": 36,
                "first_name": "User1489855362",
                "last_name": "Fake",
                "phone_number": "1489855362",
                "last_login": null,
                "role": "POP",
                "categories": [
                    1
                ],
                "car_number": null,
                "is_admin": false
            },
            {
                "id": 35,
                "first_name": "User2965390431",
                "last_name": "Fake",
                "phone_number": "2965390431",
                "last_login": null,
                "role": "POP",
                "categories": [
                    1
                ],
                "car_number": null,
                "is_admin": false
            },
            {
                "id": 34,
                "first_name": "User4108806090",
                "last_name": "Fake",
                "phone_number": "4108806090",
                "last_login": null,
                "role": "POP",
                "categories": [
                    1
                ],
                "car_number": null,
                "is_admin": false
            },
            {
                "id": 33,
                "first_name": "User3073043551",
                "last_name": "Fake",
                "phone_number": "3073043551",
                "last_login": null,
                "role": "POP",
                "categories": [
                    1
                ],
                "car_number": null,
                "is_admin": false
            },
            {
                "id": 32,
                "first_name": "User2470884639",
                "last_name": "Fake",
                "phone_number": "2470884639",
                "last_login": null,
                "role": "POP",
                "categories": [
                    1
                ],
                "car_number": null,
                "is_admin": false
            },
            {
                "id": 31,
                "first_name": "User3816093713",
                "last_name": "Fake",
                "phone_number": "3816093713",
                "last_login": null,
                "role": "POP",
                "categories": [
                    1
                ],
                "car_number": null,
                "is_admin": false
            },
            {
                "id": 30,
                "first_name": "User3282216387",
                "last_name": "Fake",
                "phone_number": "3282216387",
                "last_login": null,
                "role": "POP",
                "categories": [
                    1
                ],
                "car_number": null,
                "is_admin": false
            },
            {
                "id": 29,
                "first_name": "User578404732",
                "last_name": "Fake",
                "phone_number": "578404732",
                "last_login": null,
                "role": "POP",
                "categories": [
                    1
                ],
                "car_number": null,
                "is_admin": false
            },
            {
                "id": 28,
                "first_name": "User3857777707",
                "last_name": "Fake",
                "phone_number": "3857777707",
                "last_login": null,
                "role": "POP",
                "categories": [
                    1
                ],
                "car_number": null,
                "is_admin": false
            },
            {
                "id": 27,
                "first_name": "User4278853653",
                "last_name": "Fake",
                "phone_number": "4278853653",
                "last_login": null,
                "role": "POP",
                "categories": [
                    1
                ],
                "car_number": null,
                "is_admin": false
            }
        ]
    }`
)

const Users = () => {

    const handleView = (row: User) => {
        console.log(row)
    }

    const handleDelete = (row: User) => {
        console.log(row)
    }

    const columns: readonly Column[] = [
        {
            id: 'id',
            label: 'ID',
            minWidth: 20
        },
        {
            id: 'first_name',
            label: 'Ism',
            minWidth: 120
        },
        {
            id: 'last_name',
            label: 'Familiya',
            minWidth: 120
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
                    case null:
                        return " - "
                    default:
                        return " - "
                }
            }
        },
        {
            id: 'categories',
            label: 'Kategoriyalar',
            minWidth: 130,
            align: 'right',
            format: (row: User) => {
                <ul>
                    {row.categories.map((category) => {
                        return <li key={category}>{"fsdfs"}</li>
                    })}
                </ul>
            }
        },
        {
            id: 'car_number',
            label: 'Mashina raqami',
            minWidth: 80,
            align: 'right'
        },
        {
            id: 'is_admin',
            label: 'Admin',
            minWidth: 50,
            align: 'right',
            format: (row: User) => {
                return row.is_admin
                    ? <CheckCircleOutlineIcon />
                    : <HighlightOffIcon />
            }
        },
        {
            id: 'view',
            label: 'Ko\'rish',
            minWidth: 50,
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
            label: 'O\'chirish',
            minWidth: 50,
            align: 'right',
            format: (row: User) => {
                return (
                    <IconButton
                        aria-label="delete"
                        onClick={(view) => handleDelete(row)}
                    >
                        <DeleteIcon />
                    </IconButton>
                )
            }
        },
    ];

    const onFilterChange = (filter: UserTableFilters) => {
        console.log(filter)
    }

    return (
        <div className="users">
            <div className="table">
                <div className="tableFiler">
                    <UserTableFilter onFilterChange={onFilterChange} />
                </div>
                <DataTable
                    total={rows.count}
                    rows={rows.results}
                    columns={columns}
                />
            </div>
        </div>
    )
}

export default Users