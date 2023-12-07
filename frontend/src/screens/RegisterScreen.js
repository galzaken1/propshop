import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Loader from '../components/UI/Loader'
import { useLoginMutation, useRegisterMutation } from '../slices/usersApiSlice'
import { BASE_URL } from '../constants'
import authSlice from '../slices/authSlice'

import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify';
const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();
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
        if (password !== confirmPassword) {
            toast.error('Passwords dont match');
            return;
        }
        try {
            const res = await register({ name, email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect)
        } catch (err) {
            console.log(err)
            toast.error(err?.data?.message || err.error)
        }
    }
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            <Form onSubmit={submitHandler}>


                <Form.Group className='my-3' controlId='name'>
                    <Form.Label>name Adress</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}

                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-3' controlId='naemailme'>
                    <Form.Label>Email</Form.Label>
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
                <Form.Group className='my-3' controlId='confirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='enter password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}

                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='mt-2' disabled={isLoading}>
                    Sign Up
                </Button>
                {isLoading && <Loader />}
            </Form>
            <Row className='py-3'>
                <Col>Already a customer? ? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link></Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen

