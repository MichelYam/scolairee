import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { saveStorage } from "../../../utils/TokenStorage";
import { INotification } from "../../../Interfaces";

const BASE_URL = "http://localhost:3001/api/v1/user";

export interface IUser {
    _id?: string
    email?: string
    password?: string
    firstName: string
    lastName: string
    friendList?: IUser[]
    remember?: boolean
    role?: string
}

export const userLogin = createAsyncThunk("user/login", async ({ email, password, remember }: IUser, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }
        const { data } = await axios.post(`${BASE_URL}/login`, { email, password }, config);
        saveStorage(data.body.token, remember)
        return data;
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
}
)

export const getUserDetails = createAsyncThunk("user/getUserDetails", async (arg, { rejectWithValue, getState }) => {
    const { user }: any = getState()

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${user.userToken}`,
            },
        }
        const { data } = await axios.post(`${BASE_URL}/profile`, arg, config);
        // console.log("getUser: ", data)
        return data
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
}
)

export const updateUserProfile = createAsyncThunk("user/updateUserProfile", async ({ firstName, lastName }: IUser, { rejectWithValue, getState }) => {
    const { user }: any = getState()
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${user.userToken}`,
            },
        }
        const { data } = await axios.put(`${BASE_URL}/profile`, { firstName, lastName }, config);
        // console.log("update:",data)
        return data
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
}
)


export const userRegister = createAsyncThunk('user/userRegister', async (userData: IUser, { rejectWithValue }) => {
    try {
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }
        const { data } = await axios.post(`${BASE_URL}/signup`, userData, config);
        console.log("login", data)
        sessionStorage.setItem("userToken", data.body.token)
        return data;
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})

export const getAllUsers = createAsyncThunk('user/getAllUsers', async (arg, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken")
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        const { data } = await axios.get(`${BASE_URL}/users`, config);
        // console.log("login", data)
        return data;
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})
export const deleteUser = createAsyncThunk('user/delete', async ({ _id }: IUser, { rejectWithValue, getState }) => {
    // console.log(_id);

    try {
        const { data } = await axios.delete(`${BASE_URL}/delete/${_id}`);
        return data;
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})
export const getFriendList = createAsyncThunk('user/friends', async (arg, { rejectWithValue, getState }) => {
    const { user }: any = getState()
    const config = {
        headers: {
            Authorization: `Bearer ${user.userToken}`,
        },
    }
    try {
        const { data } = await axios.get(`${BASE_URL}/friends`, config);
        return data;
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})


// notification Friend Request

export const sendFriendRequest = createAsyncThunk("notification/sendFriendRequest", async (email: string, { rejectWithValue, getState }) => {

    const { user }: any = getState()
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${user.userToken}`
            },
        }
        const { data } = await axios.post(`${BASE_URL}/sendfriendrequest`, { email }, config)
        // console.log(data);

        return data
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})

export const getFriendRequest = createAsyncThunk('notification/getFriendRequest', async (arg, { rejectWithValue, getState }) => {
    const { user }: any = getState()
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${user.userToken}`
            },
        }
        const { data } = await axios.get(`${BASE_URL}/getFriendRequest`, config)

        return data
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})
export const acceptFriendRequest = createAsyncThunk("notification/acceptFriendRequest", async (senderId: string, { rejectWithValue, getState }) => {

    const { user }: any = getState()
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${user.userToken}`
            },
        }
        const { data } = await axios.put(`${BASE_URL}/acceptFriendRequest`, { senderId }, config)
        // console.log(data);

        return data
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})
export const rejectFriendRequest = createAsyncThunk('notification/rejectFriendRequest', async (_id: INotification, { rejectWithValue }) => {
    try {
        const { data } = await axios.delete(`${BASE_URL}/rejectFriendRequest/${_id}`);
        return data;
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})
