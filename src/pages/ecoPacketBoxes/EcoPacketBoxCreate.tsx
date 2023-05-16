import './ecoPacketBoxCreate.scss'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Backdrop, Button, CircularProgress, Container } from '@mui/material'
import Select from 'react-select';
import { categoriesServices } from '../../services/categories.services';
import { CategoryObj } from '../../types/categories.types';
import { ecoPacketBoxesServices } from '../../services/ecoPacket/ecoPacketBoxes.services';
import BackLink from '../../components/BackLink';

export const EcoPacketBoxCreate = () => {
    const navigate = useNavigate()

    const [categoryOptions, setCategoryOptions] = useState([] as { value: number, label: string }[])
    const [isLoading, setIsLoading] = useState(false)

    const [form, setForm] = useState({
        name: '',
        category: '',
        simModule: ''
    })

    useState(() => {
        setIsLoading(true)
        if (categoryOptions.length === 0) {
            categoriesServices.categories().then(res => {
                setCategoryOptions(res.map((item: CategoryObj) => {
                    return { value: item.id, label: item.name }
                }))
                setIsLoading(false)
            })
        }
    })

    const onSubmit = (e: any) => {
        e.preventDefault()

        if (!form.name) {
            alert('Nomi kiritilmagan')
            return
        }

        if (!form.category) {
            alert('Kategoriyani tanlang')
            return
        }

        if (!form.simModule) {
            alert('Miqdorini kiriting')
            return
        }

        setIsLoading(true)
        ecoPacketBoxesServices.create({ ...form, sim_module: form.simModule }).then(res => {
            alert('Muvaffaqiyatli yaratildi');
            navigate(`/boxes/${res.data.id}`)
            setIsLoading(false)
        }).catch(() => {
            alert('Kutilmagan xatolik yuz berdi');
            setIsLoading(false);
        })
    }

    return (
        <div className="createEcoBox">   
            <BackLink pathName='/boxes' />
            <Container maxWidth="sm">
                <h1 className='title'>Yangi yashik ma'lumotlarini kiriting</h1>

                <div className="formElement">
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isLoading={isLoading}
                        name="category"
                        onChange={(e: any) => setForm({ ...form, category: e.value })}
                        options={categoryOptions}
                        placeholder="Kategoriyasi"
                    />
                </div>

                <div className="formElement">
                    <input
                        onChange={(e: any) => setForm({ ...form, name: e.target.value })}
                        className='numberInput'
                        name="name"
                        type="text"
                        placeholder="Nomi"
                    />
                </div>

                <div className="formElement">
                    <input
                        onChange={(e: any) => setForm({ ...form, simModule: e.target.value })}
                        className='numberInput'
                        name="simModule"
                        type="text"
                        placeholder="Sim moduli"
                        maxLength={15}
                    />
                </div>

                <div className="formElement submitBtn">
                    <Button onClick={onSubmit} fullWidth variant="contained">Saqlash</Button>
                </div>

            </Container>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}
