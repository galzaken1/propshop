import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Loader from '../components/UI/Loader'
import { useLoginMutation } from '../slices/usersApiSlice'
import { BASE_URL } from '../constants'
import authSlice from '../slices/authSlice'

import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify';
const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const { userInfo } = useSelector((state) => state.auth)
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';
    useEffect(() => {
        console.log(userInfo)
        if (userInfo) {
            console.log('redirect is ' + redirect)
            navigate(redirect);
        }
    }, [userInfo, navigate, redirect])


    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            console.log(res)
            console.log('Redirectg ')
            console.log(redirect)
            navigate(redirect)
        } catch (err) {
            console.log(err)
            toast.error(err?.data?.message || err.error)
        }
    }
    return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-3' controlId='email'>
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-3' controlId='password'>
                    <Form.Label>Password </Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                    >

                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='mt-2' disabled={isLoading}>
                    Sign in
                </Button>
                {isLoading && <Loader />}
            </Form>
            <Row className='py-3'>
                <Col>New Customer ? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link></Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen