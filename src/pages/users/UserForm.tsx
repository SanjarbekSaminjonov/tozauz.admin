import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import {categoriesServices} from '../../services/categories.services';
import {CategoryObj} from '../../types/categories.types';
import Toast from '../../components/Toast';
import {User} from '../../types/users.types';
import {Checkbox, FormControlLabel} from "@mui/material";

interface Props {
    onSubmit: (user: User) => void
    user?: User
}

export default function UserForm(props: Props) {
    const {onSubmit, user} = props;

    const initialState = user
        ? user
        : {
            first_name: '',
            last_name: '',
            phone_number: '',
            password: '',
            role: '',
            categories: [],
            car_number: '',
        }

    const [open, setOpen] = React.useState(false);
    const [categories, setCategories] = React.useState([] as CategoryObj[]);
    const [errorMessage, setErrorMessage] = React.useState('');

    const [newPassword, setNewPassword] = React.useState(false);

    const [firstName, setFirstName] = React.useState(initialState.first_name);
    const [lastName, setLastName] = React.useState(initialState.last_name);
    const [phoneNumber, setPhoneNumber] = React.useState(initialState.phone_number);
    const [password, setPassword] = React.useState('');
    const [role, setRole] = React.useState(initialState.role);
    const [carNumber, setCarNumber] = React.useState(initialState.car_number);
    const [categories_, setCategories_] = React.useState([] as any);

    React.useEffect(() => {
        categoriesServices.categories().then((res) => {
            setCategories(res as CategoryObj[]);
        });

        if (user) {
            const _categories = initialState.categories.map((categoryId) => {
                return {
                    value: categoryId,
                    label: categories.find((category) => category.id === categoryId)?.name,
                }
            })
            setCategories_(_categories);
        }
    }, [categories]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (firstName === '') {
            setErrorMessage('Ismni kiriting')
            setOpen(true);
            return;
        }

        if (lastName === '') {
            setErrorMessage('Familiyani kiriting')
            setOpen(true);
            return;
        }

        if (phoneNumber === '') {
            setErrorMessage('Telefon raqamini kiriting')
            setOpen(true);
            return;
        }

        if (phoneNumber.length !== 13 || !phoneNumber.startsWith('+998')) {
            setErrorMessage('Telefon raqamini to`g`ri kiriting: +998*********')
            setOpen(true);
            return;
        }

        if (password === '' && (!user || newPassword)) {
            setErrorMessage('Parolni kiriting')
            setOpen(true);
            return;
        }

        if (role === '') {
            setErrorMessage('Rolni tanlang')
            setOpen(true);
            return;
        }

        if (categories_.length === 0 && role === 'EMP') {
            setErrorMessage('Kategoriyani tanlang')
            setOpen(true);
            return;
        }

        const userData: User = {
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            role: role,
            categories: categories_,
            car_number: carNumber ? carNumber.replace(/ /g, '') : '',
        };
        if (user) {
            userData.id = user.id;
        }
        if (password !== '' || newPassword) {
            userData.password = password;
        }
        onSubmit(userData);
    };

    const categoryOptions = categories.map((category) => {
        return {value: category.id, label: category.name};
    });

    const roleOptions = [
        {value: 'ADMIN', label: 'Admin'},
        {value: 'EMP', label: 'Ishchi'},
    ]

    const animatedComponents = makeAnimated();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="Ism"
                                autoFocus
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Familiya"
                                name="lastName"
                                autoComplete="family-name"
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="phoneNumber"
                                label="Telefon raqam"
                                name="phoneNumber"
                                autoComplete="phoneNumber"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                value={phoneNumber}
                            />
                        </Grid>
                        {
                            user && (
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                        label="Parolni o`zgartirish"
                                        onChange={() => setNewPassword(!newPassword)}
                                    />
                                </Grid>
                            )
                        }
                        <Grid item xs={12}>
                            {
                                (!user || newPassword) && (
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Parol"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                )
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <Select
                                placeholder="Rolni tanlang *"
                                name="role"
                                options={roleOptions}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={(e: any) => setRole(e.value)}
                                value={roleOptions.find((item) => item.value === role)}
                            />
                        </Grid>
                        {
                            role === 'EMP' && (
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="carNumber"
                                        label="Mashina raqami"
                                        type="text"
                                        id="carNumber"
                                        onChange={(e) => setCarNumber(e.target.value)}
                                        value={carNumber}
                                    />
                                </Grid>
                            )
                        }
                        {
                            role === 'EMP' && (
                                <Grid item xs={12}>
                                    <Select
                                        required
                                        placeholder="Kategoriyalarni tanlang *"
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        isMulti
                                        options={categoryOptions}
                                        onChange={(e: any) => setCategories_(e.map((item: any) => item.value))}
                                        value={categories_}
                                    />
                                </Grid>
                            )
                        }
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Saqlash
                    </Button>
                </Box>
            </Box>
            <Toast
                severity="warning"
                message={errorMessage}
                isOpen={open}
                handleClose={() => setOpen(false)}
            />
        </Container>
    );
}