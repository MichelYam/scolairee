import React, { useState } from 'react'
import SelectField from '../../../Components/Form/selectField'
import TextAreaField from '../../../Components/Form/textAreaField'
import { Task } from '../../../Redux/features/task/taskSlice'
import "../style.css"
import Avatar from '@mui/material/Avatar'
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button'
import { updateTask } from "../../../Redux/features/task/taskAction"

import { useAppDispatch } from '../../../Redux/store'
interface IProps {
    _id: string
    edit: boolean,
    setEdit: (value: boolean) => void
    userRole?: string
    title: string
    description: string
    assignee: string
    date: string
    dateDue: string
    status: string
    createdBy: string
}
const optionsData = [
    {
        label: "en cours",
        value: "en cours"
    },
    {
        label: "terminée",
        value: "terminée"
    }
]
const Index = ({ _id, edit, setEdit, userRole, title, description, assignee, date, dateDue, status, createdBy }: IProps) => {
    const dispatch = useAppDispatch()
    const [data, setData] = useState({
        _id: _id,
        title: title,
        description: description,
        dateDue: dateDue,
        status: status
    })
    const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setData({
            ...data,
            [event.target.id]: event.target.value,
        })
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("data", data)
        dispatch(updateTask(data))
        setEdit(false)
    }

    const stringAvatar = (name: string) => {
        return {
            // sx: {
            //     bgcolor: stringToColor(name),
            // },
            children: `${name.split(' ')[0][0].toLocaleUpperCase()}`,
        };
    }
    return (
        <>
            {
                edit ?
                    <form onSubmit={handleSubmit}>
                        <div className='task-container'>
                            <div className='task-view-header'>
                                <h2>{title}</h2>
                                <button className='edit' onClick={() => setEdit(false)}> <CloseIcon /></button >
                            </div >
                            <div className='task-view-body'>
                                <div className='task-view-assigne'>
                                    <div className='task-assigned'>
                                        <p>Assigné par :</p>
                                        <Avatar {...stringAvatar(createdBy)} />
                                    </div>
                                    <p>Donné a <span>{assignee}</span> le : <span>{date}</span> </p>
                                </div>
                                <div className='task-view-description'>
                                    <label htmlFor="description">Description</label>
                                    <textarea name="description" id="description" value={data.description} onChange={handleChangeValue} />
                                </div >
                                <div className='task-view-date'>
                                    <div>
                                        <label htmlFor="dateDue">Date limite:</label>
                                        <input name='dateDue' type="date" id="dateDue" value={data.dateDue} onChange={handleChangeValue} />
                                    </div>
                                    <div>
                                        <label htmlFor="status">status:</label>
                                        <select name="status" id="status" value={data.status} onChange={handleChangeValue}>
                                            {
                                                optionsData.map((item) => (
                                                    <option key={item.value} value={item.value}>{item.label}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div >
                            <div className='group-button'>
                                <Button variant="outlined" color="error" onClick={() => setEdit(false)}>
                                    Annuler
                                </Button>
                                <Button variant="contained" color="success" type="submit">
                                    Confirmer
                                </Button>
                            </div>
                        </div >
                    </form>
                    :
                    <div className='task-container'>
                        <div className='task-view-header'>
                            <h2>{title}</h2>
                            {userRole === "Tutor" ? <button className='edit' onClick={() => setEdit(!edit)}><EditIcon /></button > : ""}
                        </div >
                        <div className='task-view-body'>
                            <div className='task-view-assigne'>
                                <div className='task-assigned'>
                                    <p>Assigné par :</p>
                                    <Avatar {...stringAvatar(createdBy)} />
                                    {/* <p>{createdBy}</p> */}
                                </div>
                                <p>Donné a <span>{assignee}</span> le : <span>{date}</span> </p>
                            </div>
                            <div className='task-view-description'>
                                <p>Description</p>
                                <textarea name="description" id="description" value={description} disabled></textarea>
                            </div >
                            <div className='task-view-date'>
                                <p>Date limite: <span>{dateDue}</span> </p>
                                <p>Status: <span>{status}</span> </p>
                            </div>
                        </div >
                    </div >
            }

        </>
    )
}

export default Index