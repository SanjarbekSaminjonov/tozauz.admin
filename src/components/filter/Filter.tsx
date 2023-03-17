import { useState } from 'react';
import { TextField, Checkbox, FormControlLabel } from '@mui/material';

import { UserTableFilters } from "../../types/users";

interface UserTableFilterProps {
    onFilterChange: (filters: UserTableFilters) => void;
}

const UserTableFilter: React.FC<UserTableFilterProps> = ({ onFilterChange }) => {
    const [filters, setFilters] = useState<UserTableFilters>({
        search: '',
        isAdmin: false,
        role: false,
    });

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked, value } = event.target;
        setFilters((prevState) => ({
            ...prevState,
            [name]: name === 'search' ? value : checked,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onFilterChange(filters);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Search"
                variant="outlined"
                size="small"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={filters.isAdmin}
                        onChange={handleFilterChange}
                        name="isAdmin"
                        color="primary"
                    />
                }
                label="Admin"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={filters.role}
                        onChange={handleFilterChange}
                        name="role"
                        color="primary"
                    />
                }
                label="Role"
            />
            <button type="submit">Apply Filters</button>
        </form>
    );
};

export default UserTableFilter;