import { USERS_URL } from '../constants';
import { apiSlice } from './apiSlice';
const loginUrl = USERS_URL + '/authuser'
const logoutUrl = USERS_URL + '/logout'
const registerUrl = USERS_URL + '/'
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: loginUrl,
                method: 'POST',
                body: data,
            }),
            keepUnusedDataFor: 5,
        }),
        register: builder.mutation({
            query: (data) => ({
                url: registerUrl,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: logoutUrl,
                method: 'POST',

            })
        })
    }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = usersApiSlice;
