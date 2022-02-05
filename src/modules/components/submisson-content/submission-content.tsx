/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Dependencies
import { Button, DatePicker, Form, Input, Select, Switch } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import axios from 'axios';
import { format } from 'date-fns';
import React, { KeyboardEventHandler, useContext, useEffect, useState } from 'react';
import { FaGhost } from 'react-icons/fa';
import { GiTwoCoins } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ApplicationContext } from '../../../core/routes/providers/application.provider';
import { AddressCheckResponseModel } from '../../home/models/address-check.model';
import { Container } from './submission-content.style';

const SubmissionContent: React.FC<{ submitProp?: boolean }> = (props) => {
    const { ctxModal, ctxDisabled } = useContext(ApplicationContext) as any;

    const [visibleModal, setVisibleModal] = ctxModal;
    const [buttonDisabled, setButtonDisabled] = ctxDisabled;

    const [formOption, setFormOption] = useState();
    const [isPresale, setIsPresale] = useState<boolean>(false);
    const [tokenForm] = Form.useForm();
    const [scamForm] = Form.useForm();



    const [addresValidation, setAddressValidation] = useState<{ err: number, message: string, active: boolean, button?: any }>()
    const [softcapValidation, setSoftcapValidation] = useState<{ err: number, message: string, active: boolean, button?: any }>()
    const [hardcapValidation, setHardcapValidation] = useState<{ err: number, message: string, active: boolean, button?: any }>()
    const [addressLoading, setAddressLoading] = useState<boolean>(false);
    const { toChecksumAddress } = require('ethereum-checksum-address');

    const checkValidation = () => {
        const { address, presale, name, symbol, telegram, hardcap, softcap, presalelink, releaseDate } = tokenForm.getFieldsValue();
        if (presale) {
            const formIsInvalid = !!address && !!name && !!symbol && !!telegram && !!hardcap && !!softcap && !!presalelink && !!releaseDate;
            setButtonDisabled(!formIsInvalid || addresValidation?.active || hardcapValidation?.active || softcapValidation?.active)

        } else {
            const formIsInvalid = !!address && !!name && !!symbol && !!telegram && !!releaseDate;
            setButtonDisabled(!formIsInvalid || addresValidation?.active || hardcapValidation?.active || softcapValidation?.active)
        }
    }

    const checkValidationScam = () => {
        const { address, presale, name, symbol, telegram, hardcap, softcap, presalelink } = scamForm.getFieldsValue();
        if (presale) {
            const formIsInvalid = !!address && !!name && !!symbol && !!telegram && !!hardcap && !!softcap && !!presalelink;
            setButtonDisabled(!formIsInvalid || addresValidation?.active || hardcapValidation?.active || softcapValidation?.active)

        } else {
            const formIsInvalid = !!address && !!name && !!symbol && !!telegram;
            setButtonDisabled(!formIsInvalid || addresValidation?.active || hardcapValidation?.active || softcapValidation?.active)
        }
    }

    const handleSoftcapChange = (e) => {
        const inputFormRef = tokenForm.getFieldInstance('softcap');
        if (inputFormRef && inputFormRef.state && inputFormRef.state.value && inputFormRef.state.value.includes('-')) {
            setSoftcapValidation({
                active: true,
                message: 'Softcap should be a positive number',
                err: 1
            })
        } else {
            setSoftcapValidation({
                active: false,
                message: 'Softcap should be a positive number',
                err: 1
            })
        }

    }
    const handleHardcapChange = (e) => {
        const inputFormRefsfot = tokenForm.getFieldInstance('softcap');
        const inputFormRef = tokenForm.getFieldInstance('hardcap');
        if (inputFormRef && inputFormRef.state && inputFormRef.state.value && inputFormRef.state.value.includes('-')) {
            setHardcapValidation({
                active: true,
                message: 'Hardcap should be a positive number',
                err: 2
            })
        } else {
            setHardcapValidation({
                active: false,
                message: 'Softcap should be a positive number',
                err: 1
            })
        }
        if (inputFormRefsfot && inputFormRef && inputFormRefsfot.state && inputFormRefsfot.state && inputFormRefsfot.state.value && inputFormRef.state && inputFormRef.state && inputFormRef.state.value && inputFormRef.state.value && (inputFormRefsfot.state.value > inputFormRef.state.value)) {
            setHardcapValidation({
                active: true,
                message: 'Hardcap should be higher than softcap',
                err: 1
            })
        } else {
            setHardcapValidation({
                active: false,
                message: 'Softcap should be a positive number',
                err: 1
            })
        }
    }

    useEffect(() => {
        if (formOption === 'token') {
            checkValidation();
        } else {
            checkValidationScam();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formOption, addresValidation])

    const handleDatePickerChange = () => {
        if (formOption === 'token') {
            checkValidation();
        } else {
            checkValidationScam();
        }
    }


    const formChange = (form) => {
        setIsPresale(tokenForm.getFieldValue('presale'));
        if (formOption === 'token') {
            checkValidation();
        } else {
            checkValidationScam();
        }



    }


    const changeFormOption = (option) => {
        setFormOption(option)


    }

    const navigate = useNavigate();

    const submit = () => {
        if (formOption === 'token') {
            const formdata = tokenForm.getFieldsValue();
            let submitObj = {
                httpMethod: "POST",
                resourcePath: "/tokens_info/{category}/{value}",
                isScam: false,
                item: {
                    telegram: formdata.telegram ? `https://t.me/${formdata.telegram}` : '',
                    website: formdata.website ? formdata.website : '',
                    symbol: formdata.symbol ? `$${formdata.symbol}` : '',
                    status: formdata.releaseDate._d > new Date() ? 'NOT LAUNCHED' : 'LAUNCHED',
                    address: formdata.address ? toChecksumAddress(formdata.address) : '',
                    logo: formdata.logo ? formdata.logo : '',
                    name: formdata.name ? formdata.name : '',
                    votes: 0,
                    twitter: formdata.twitter ? 'https://twitter.com/' + formdata.twitter : '',
                    releaseDate: formdata.releaseDate ? format(formdata.releaseDate._d, 'yyy-MM-dd') : '',
                    isFairlaunch: formdata.presale ? false : true,
                    description: formdata.description ? formdata.description : ''
                }
            }

            if (formdata.presale) {
                submitObj.item['presaleInfo'] = {
                    presaleLink: formdata.presalelink,
                    presaleDate: format(formdata.presaledate._d, 'yyy-MM-dd'),
                    softcap: formdata.softcap ? formdata.softcap : '',
                    isWhiteListed: formdata.isWhiteListed,
                    hardcap: formdata.hardcap ? formdata.hardcap : ''
                }
            }
            tokenForm.validateFields().then(
                res => {

                    axios.post('https://nhlm8489e3.execute-api.us-east-2.amazonaws.com/prod/tokens_info/submit', submitObj).then(
                        res => {
                            Swal.fire({
                                title: 'Thank you for submiting a token  ',
                                text: 'our team will review the request, once done you will see it on the platform,  now you will be redirected to the main page',
                                icon: 'success',
                                timer: 5000,
                                didClose: () => {
                                    setVisibleModal(false)

                                }
                            })
                        }
                    ).catch(
                        res => {
                            Swal.fire({
                                title: 'Oops!',
                                text: 'something went wrong!',
                                icon: 'error',
                                confirmButtonText: 'Try Again',
                                willClose: () => {
                                    setVisibleModal(false)
                                }
                            })
                        }
                    )
                }
            )

        } else {
            const formdata = scamForm.getFieldsValue();
            const submitObj = {
                httpMethod: "POST",
                resourcePath: "/tokens_info/{category}/{value}",
                isScam: true,
                item: {
                    telegram: formdata.telegram ? `https://t.me/${formdata.telegram}` : '',
                    website: formdata.website ? formdata.website : '',
                    scamReasonTooltip: formdata.description ? formdata.description : '',
                    symbol: formdata.symbol ? `$${formdata.symbol}` : '',
                    status: formdata.releaseDate ? formdata.releaseDate > new Date() ? 'NOT LAUNCHED' : 'LAUNCHED' : 'LAUNCHED',
                    address: formdata.address ? toChecksumAddress(formdata.address) : '',
                    logo: formdata.logo ? formdata.logo : '',
                    name: formdata.name ? formdata.name : '',
                    twitter: formdata.twitter ? 'https://twitter.com/' + formdata.twitter : '',
                    description: formdata.description ? formdata.description : '',
                    scamDate: formdata.scamDate ? format(formdata.scamDate._d, 'yyy-MM-dd') : '',
                    scamReason: [
                        formdata.scamreason
                    ],
                }
            }
            tokenForm.validateFields().then(
                res => {
                    axios.post('https://nhlm8489e3.execute-api.us-east-2.amazonaws.com/prod/tokens_info/submit', submitObj).then(
                        res => {
                            if (res.data.content) {
                                Swal.fire({
                                    title: 'Thank you for submiting a scam  ',
                                    text: 'our team will review the request, once done you will see it on the platform,  now you will be redirected to the main page',
                                    icon: 'success',
                                    timer: 5000,
                                    didClose: () => {
                                        navigate('/')
                                        setVisibleModal(false)
                                    }
                                })
                            } else {
                                Swal.fire({
                                    title: 'Wait',
                                    text: ' This token has already been submitted, it may be pending for approval',
                                    icon: 'success',
                                    timer: 5000,
                                    didClose: () => {
                                        setVisibleModal(false)
                                        setButtonDisabled(true)
                                    }
                                })

                            }
                        }
                    ).catch(
                        res => {
                            Swal.fire({
                                title: 'Oops!',
                                text: 'something went wrong!',
                                icon: 'error',
                                confirmButtonText: 'Try Again',
                                willClose: () => {
                                    setVisibleModal(false)
                                }
                            })
                        }
                    )
                }
            )
        }
    }

    let twitterRef;
    let telegramRef;

    useEffect(() => {

        if (props.submitProp) {
            submit();
        }
    }, [props.submitProp]);



    const validadeAddress = (address: string) => {
        return axios.get(`https://nhlm8489e3.execute-api.us-east-2.amazonaws.com/prod/tokenorwalletinfo/${address}`)

    }

    const handleSearchEnter: KeyboardEventHandler<HTMLInputElement> | undefined = (event) => {
        if (addresValidation?.active === true) {
            setAddressValidation({
                err: 0,
                message: '',
                active: false
            })
        }

        if (event.code === 'Enter') {
            setAddressLoading(true);
            let addr = '';
            try {
                if (!event.currentTarget.value || event.currentTarget.value === undefined) {
                    throw new Error('Empty Address');
                }
                addr = toChecksumAddress(event.currentTarget.value);
                if (addr === '') {
                    throw new Error('Please make sure to input a correct token Address')
                }
            } catch (err) {
                const e: Error = err as Error;
                setAddressValidation({
                    err: 0,
                    message: e.message,
                    active: true
                })
                setAddressLoading(false);

            }

            try {
                if (addr !== undefined && addr !== '') {
                    axios.get(`https://nhlm8489e3.execute-api.us-east-2.amazonaws.com/prod/tokens_info/submit/${addr}`).then(
                        res => {
                            if (!res.data.content) {
                                setAddressValidation({
                                    err: 0,
                                    message: 'This token has already been submitted, it may be pending for approval',
                                    active: true
                                })
                                setAddressLoading(false);
                            } else {
                                validadeAddress(addr).then(
                                    ({ data }) => {
                                        if (data.smartContractInfo && data.smartContractInfo.currency.symbol) {
                                            tokenForm.setFieldsValue({
                                                ...tokenForm.getFieldsValue(), symbol: data.smartContractInfo.currency.symbol
                                            })
                                        }
                                        setAddressLoading(false);
                                        const addressCheckResponse: AddressCheckResponseModel | null = data.smartContractInfo;
                                        if (addressCheckResponse == null) {
                                            throw new Error('Please make sure to input a correct token Address');
                                        }
                                        if (addressCheckResponse.contractType.toLocaleLowerCase() === 'token') {
                                        } else {
                                            throw new Error('Please make sure to input a correct token Address');

                                        }
                                    }
                                ).catch(e => {
                                    setAddressValidation({
                                        err: 0,
                                        message: 'Please make sure to input a correct token Address',
                                        active: true
                                    })
                                    setAddressLoading(false);
                                })
                            }
                        }
                    ).catch(e => {
                        setAddressValidation({
                            err: 0,
                            message: 'Please make sure to input a correct token Address',
                            active: true
                        })
                        setAddressLoading(false);
                    })
                } else {
                    throw new Error('Please make sure to input a correct token Address');

                }
            } catch (err) {
                const e = err as Error;
                setAddressValidation({
                    err: 0,
                    message: e.message,
                    active: true
                })
                setAddressLoading(false);

            }
        }

    };

    const searchTokenOrtokenOnPaste = (event) => {
        const value = event.clipboardData?.getData('Text');
        setAddressLoading(true);
        let addr = '';
        try {
            if (!value || value === undefined) {
                throw new Error('Empty Address');
            }
            addr = toChecksumAddress(value);
            if (addr === '') {
                throw new Error('Please make sure to input a correct token Address')
            }
        } catch (err) {
            const e: Error = err as Error;
            setAddressValidation({
                err: 0,
                message: e.message,
                active: true
            })
            setAddressLoading(false);

        }


        try {
            if (addr !== undefined && addr !== '') {
                axios.get(`https://nhlm8489e3.execute-api.us-east-2.amazonaws.com/prod/tokens_info/submit/${addr}`).then(
                    res => {
                        if (res.data.content) {
                            setAddressValidation({
                                err: 0,
                                message: 'This token has already been submitted, it may be pending for approval',
                                active: true
                            })
                            setAddressLoading(false);
                        } else {
                            validadeAddress(addr).then(
                                ({ data }) => {
                                    if (data.smartContractInfo && data.smartContractInfo.currency.symbol) {
                                        tokenForm.setFieldsValue({
                                            ...tokenForm.getFieldsValue(), symbol: data.smartContractInfo.currency.symbol
                                        })
                                    }
                                    const addressCheckResponse: AddressCheckResponseModel | null = data.smartContractInfo;
                                    if (addressCheckResponse == null) {
                                        setAddressLoading(false);
                                        throw new Error('Please make sure to input a correct token Address');
                                    }
                                    if (addressCheckResponse.contractType.toLocaleLowerCase() !== 'token') {
                                        throw new Error('Please make sure to input a correct token Address');

                                    }
                                }
                            ).catch(
                                e => {
                                    setAddressValidation({
                                        err: 0,
                                        message: 'Please make sure to input a correct token Address! ',
                                        active: true
                                    })
                                    setAddressLoading(false);
                                }
                            )
                        }
                    },
                ).catch(e => {
                    setAddressValidation({
                        err: 0,
                        message: 'Please make sure to input a correct token Address! ',
                        active: true
                    })
                    setAddressLoading(false);
                })
            } else {
                throw new Error('Please make sure to input a correct token Address');

            }
        } catch (err) {
            const e = err as Error;
            setAddressValidation({
                err: 0,
                message: e.message,
                active: true
            })
            setAddressLoading(false);

        }

    }

    const validateInput = (e) => {
        try {
            toChecksumAddress(e.currentTarget.value)
        } catch (e) {
            setAddressValidation({
                err: 0,
                message: 'Input a valid address',
                active: true
            })
        }
        // buttonDisabled()
    }

    return <Container>
        <Button className={`submit-section-toggle submit-token ${formOption === 'token' ? 'active' : ''}`} onClick={() => { changeFormOption('token') }}>
            <div className="submit-section-wrapper">
                <div className="icon svg-icon svg-icon-3hx">
                    <GiTwoCoins></GiTwoCoins>
                </div>
                <div className="text-wrapper">
                    <h2 className='fs-3 fw-bolder text-gray-900 mb-2 d-block'>I want to submit a token</h2>
                    <span className='fw-bold fs-4 text-muted'>
                        Make sure to fill all required fields
                    </span>
                </div>
            </div>
        </Button>
        <Button className={`submit-section-toggle submit-scam ${formOption === 'scam' ? 'active' : ''}`} onClick={() => { changeFormOption('scam') }}>
            <div className="submit-section-wrapper">
                <span className="icon svg-icon svg-icon-3hx">
                    <FaGhost ></FaGhost>
                </span>
                <div className="text-wrapper">
                    <h2 className='fs-3 fw-bolder text-gray-900 mb-2 d-block'>I want to submit a scam</h2>
                    <span className='fw-bold fs-4 text-muted'>
                        Make sure to fill all required fields

                    </span>
                </div>
            </div>
        </Button>
        {
            formOption && formOption === 'token' &&
            <div className="form-token">
                <Form onChange={formChange} form={tokenForm} preserve={false}>
                    <Form.Item style={{ margin: '0 !important' }} name="address" label="Contract Address" rules={[{ required: true }]}>
                        <Input
                            placeholder="Input token Address"
                            onPaste={searchTokenOrtokenOnPaste}
                            onKeyDown={handleSearchEnter}
                            onInput={validateInput}
                            onBlur={validateInput}
                        />

                    </Form.Item>
                    {
                        addresValidation &&
                        <span className='address-validation-error'>
                            {addresValidation.message}
                        </span>
                    }
                    <div className="row-group">
                        <Form.Item name="name" label="Token Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="symbol" label="Symbol/Ticker" rules={[{ required: true }]}>
                            <Input disabled={true} addonBefore="$" />
                        </Form.Item>
                    </div>
                    <Form.Item name="description" label="Token Description" rules={[{ required: false }]}>
                        <TextArea />
                    </Form.Item>
                    <Form.Item name="logo" label="Logo URL (200px by 200px)" rules={[{ required: false }]}>
                        <Input placeholder="Logo should be a link" />
                    </Form.Item>
                    <Form.Item name="website" label="Website" rules={[{ required: false }]}>
                        <Input />
                    </Form.Item>
                    <div className="row-group">
                        <Form.Item name="twitter" label="Twitter Handle" rules={[{ required: false }]}>
                            <Input onClick={() => { }} ref={twitterRef} addonBefore="https://twiter.com/" placeholder='Handle' />
                        </Form.Item>
                        <Form.Item name="telegram" label="Telegram Handle" rules={[{ required: true }]}>
                            <Input ref={telegramRef} addonBefore="https://t.me/" placeholder='Handle' />
                        </Form.Item>
                    </div>

                    <Form.Item name="releaseDate" label="Release Date" rules={[{ required: true }]}>
                        <DatePicker
                            onChange={handleDatePickerChange}
                            suffixIcon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path opacity="0.3" d="M21 22H3C2.4 22 2 21.6 2 21V5C2 4.4 2.4 4 3 4H21C21.6 4 22 4.4 22 5V21C22 21.6 21.6 22 21 22Z" fill="black"></path>
                                    <path d="M6 6C5.4 6 5 5.6 5 5V3C5 2.4 5.4 2 6 2C6.6 2 7 2.4 7 3V5C7 5.6 6.6 6 6 6ZM11 5V3C11 2.4 10.6 2 10 2C9.4 2 9 2.4 9 3V5C9 5.6 9.4 6 10 6C10.6 6 11 5.6 11 5ZM15 5V3C15 2.4 14.6 2 14 2C13.4 2 13 2.4 13 3V5C13 5.6 13.4 6 14 6C14.6 6 15 5.6 15 5ZM19 5V3C19 2.4 18.6 2 18 2C17.4 2 17 2.4 17 3V5C17 5.6 17.4 6 18 6C18.6 6 19 5.6 19 5Z" fill="black"></path>
                                    <path d="M8.8 13.1C9.2 13.1 9.5 13 9.7 12.8C9.9 12.6 10.1 12.3 10.1 11.9C10.1 11.6 10 11.3 9.8 11.1C9.6 10.9 9.3 10.8 9 10.8C8.8 10.8 8.59999 10.8 8.39999 10.9C8.19999 11 8.1 11.1 8 11.2C7.9 11.3 7.8 11.4 7.7 11.6C7.6 11.8 7.5 11.9 7.5 12.1C7.5 12.2 7.4 12.2 7.3 12.3C7.2 12.4 7.09999 12.4 6.89999 12.4C6.69999 12.4 6.6 12.3 6.5 12.2C6.4 12.1 6.3 11.9 6.3 11.7C6.3 11.5 6.4 11.3 6.5 11.1C6.6 10.9 6.8 10.7 7 10.5C7.2 10.3 7.49999 10.1 7.89999 10C8.29999 9.90003 8.60001 9.80003 9.10001 9.80003C9.50001 9.80003 9.80001 9.90003 10.1 10C10.4 10.1 10.7 10.3 10.9 10.4C11.1 10.5 11.3 10.8 11.4 11.1C11.5 11.4 11.6 11.6 11.6 11.9C11.6 12.3 11.5 12.6 11.3 12.9C11.1 13.2 10.9 13.5 10.6 13.7C10.9 13.9 11.2 14.1 11.4 14.3C11.6 14.5 11.8 14.7 11.9 15C12 15.3 12.1 15.5 12.1 15.8C12.1 16.2 12 16.5 11.9 16.8C11.8 17.1 11.5 17.4 11.3 17.7C11.1 18 10.7 18.2 10.3 18.3C9.9 18.4 9.5 18.5 9 18.5C8.5 18.5 8.1 18.4 7.7 18.2C7.3 18 7 17.8 6.8 17.6C6.6 17.4 6.4 17.1 6.3 16.8C6.2 16.5 6.10001 16.3 6.10001 16.1C6.10001 15.9 6.2 15.7 6.3 15.6C6.4 15.5 6.6 15.4 6.8 15.4C6.9 15.4 7.00001 15.4 7.10001 15.5C7.20001 15.6 7.3 15.6 7.3 15.7C7.5 16.2 7.7 16.6 8 16.9C8.3 17.2 8.6 17.3 9 17.3C9.2 17.3 9.5 17.2 9.7 17.1C9.9 17 10.1 16.8 10.3 16.6C10.5 16.4 10.5 16.1 10.5 15.8C10.5 15.3 10.4 15 10.1 14.7C9.80001 14.4 9.50001 14.3 9.10001 14.3C9.00001 14.3 8.9 14.3 8.7 14.3C8.5 14.3 8.39999 14.3 8.39999 14.3C8.19999 14.3 7.99999 14.2 7.89999 14.1C7.79999 14 7.7 13.8 7.7 13.7C7.7 13.5 7.79999 13.4 7.89999 13.2C7.99999 13 8.2 13 8.5 13H8.8V13.1ZM15.3 17.5V12.2C14.3 13 13.6 13.3 13.3 13.3C13.1 13.3 13 13.2 12.9 13.1C12.8 13 12.7 12.8 12.7 12.6C12.7 12.4 12.8 12.3 12.9 12.2C13 12.1 13.2 12 13.6 11.8C14.1 11.6 14.5 11.3 14.7 11.1C14.9 10.9 15.2 10.6 15.5 10.3C15.8 10 15.9 9.80003 15.9 9.70003C15.9 9.60003 16.1 9.60004 16.3 9.60004C16.5 9.60004 16.7 9.70003 16.8 9.80003C16.9 9.90003 17 10.2 17 10.5V17.2C17 18 16.7 18.4 16.2 18.4C16 18.4 15.8 18.3 15.6 18.2C15.4 18.1 15.3 17.8 15.3 17.5Z" fill="black"></path>
                                </svg>
                            } />
                    </Form.Item>
                    <div className="row-group inline">
                        <Form.Item valuePropName="checked" name="presale" label="Is there a presale?" rules={[{ required: false }]}>
                            <Switch onChange={(checked, evt) => {
                                setIsPresale(checked);
                                checkValidation();
                            }} />
                        </Form.Item>
                        {
                            isPresale &&
                            <Form.Item valuePropName="checked" name="isWhiteListed" label="Is there a whitelist?" rules={[{ required: false }]}>
                                <Switch />

                            </Form.Item>
                        }
                    </div>
                    {
                        isPresale &&
                        <div className="">
                            <Form.Item name="presaledate" label="Presale Date?" rules={[{ required: true }]}>
                                <DatePicker suffixIcon={
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path opacity="0.3" d="M21 22H3C2.4 22 2 21.6 2 21V5C2 4.4 2.4 4 3 4H21C21.6 4 22 4.4 22 5V21C22 21.6 21.6 22 21 22Z" fill="black"></path>
                                        <path d="M6 6C5.4 6 5 5.6 5 5V3C5 2.4 5.4 2 6 2C6.6 2 7 2.4 7 3V5C7 5.6 6.6 6 6 6ZM11 5V3C11 2.4 10.6 2 10 2C9.4 2 9 2.4 9 3V5C9 5.6 9.4 6 10 6C10.6 6 11 5.6 11 5ZM15 5V3C15 2.4 14.6 2 14 2C13.4 2 13 2.4 13 3V5C13 5.6 13.4 6 14 6C14.6 6 15 5.6 15 5ZM19 5V3C19 2.4 18.6 2 18 2C17.4 2 17 2.4 17 3V5C17 5.6 17.4 6 18 6C18.6 6 19 5.6 19 5Z" fill="black"></path>
                                        <path d="M8.8 13.1C9.2 13.1 9.5 13 9.7 12.8C9.9 12.6 10.1 12.3 10.1 11.9C10.1 11.6 10 11.3 9.8 11.1C9.6 10.9 9.3 10.8 9 10.8C8.8 10.8 8.59999 10.8 8.39999 10.9C8.19999 11 8.1 11.1 8 11.2C7.9 11.3 7.8 11.4 7.7 11.6C7.6 11.8 7.5 11.9 7.5 12.1C7.5 12.2 7.4 12.2 7.3 12.3C7.2 12.4 7.09999 12.4 6.89999 12.4C6.69999 12.4 6.6 12.3 6.5 12.2C6.4 12.1 6.3 11.9 6.3 11.7C6.3 11.5 6.4 11.3 6.5 11.1C6.6 10.9 6.8 10.7 7 10.5C7.2 10.3 7.49999 10.1 7.89999 10C8.29999 9.90003 8.60001 9.80003 9.10001 9.80003C9.50001 9.80003 9.80001 9.90003 10.1 10C10.4 10.1 10.7 10.3 10.9 10.4C11.1 10.5 11.3 10.8 11.4 11.1C11.5 11.4 11.6 11.6 11.6 11.9C11.6 12.3 11.5 12.6 11.3 12.9C11.1 13.2 10.9 13.5 10.6 13.7C10.9 13.9 11.2 14.1 11.4 14.3C11.6 14.5 11.8 14.7 11.9 15C12 15.3 12.1 15.5 12.1 15.8C12.1 16.2 12 16.5 11.9 16.8C11.8 17.1 11.5 17.4 11.3 17.7C11.1 18 10.7 18.2 10.3 18.3C9.9 18.4 9.5 18.5 9 18.5C8.5 18.5 8.1 18.4 7.7 18.2C7.3 18 7 17.8 6.8 17.6C6.6 17.4 6.4 17.1 6.3 16.8C6.2 16.5 6.10001 16.3 6.10001 16.1C6.10001 15.9 6.2 15.7 6.3 15.6C6.4 15.5 6.6 15.4 6.8 15.4C6.9 15.4 7.00001 15.4 7.10001 15.5C7.20001 15.6 7.3 15.6 7.3 15.7C7.5 16.2 7.7 16.6 8 16.9C8.3 17.2 8.6 17.3 9 17.3C9.2 17.3 9.5 17.2 9.7 17.1C9.9 17 10.1 16.8 10.3 16.6C10.5 16.4 10.5 16.1 10.5 15.8C10.5 15.3 10.4 15 10.1 14.7C9.80001 14.4 9.50001 14.3 9.10001 14.3C9.00001 14.3 8.9 14.3 8.7 14.3C8.5 14.3 8.39999 14.3 8.39999 14.3C8.19999 14.3 7.99999 14.2 7.89999 14.1C7.79999 14 7.7 13.8 7.7 13.7C7.7 13.5 7.79999 13.4 7.89999 13.2C7.99999 13 8.2 13 8.5 13H8.8V13.1ZM15.3 17.5V12.2C14.3 13 13.6 13.3 13.3 13.3C13.1 13.3 13 13.2 12.9 13.1C12.8 13 12.7 12.8 12.7 12.6C12.7 12.4 12.8 12.3 12.9 12.2C13 12.1 13.2 12 13.6 11.8C14.1 11.6 14.5 11.3 14.7 11.1C14.9 10.9 15.2 10.6 15.5 10.3C15.8 10 15.9 9.80003 15.9 9.70003C15.9 9.60003 16.1 9.60004 16.3 9.60004C16.5 9.60004 16.7 9.70003 16.8 9.80003C16.9 9.90003 17 10.2 17 10.5V17.2C17 18 16.7 18.4 16.2 18.4C16 18.4 15.8 18.3 15.6 18.2C15.4 18.1 15.3 17.8 15.3 17.5Z" fill="black"></path>
                                    </svg>
                                } />
                            </Form.Item>
                            <Form.Item name="presalelink" label="Presale Link" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <div className="row-group">
                                <Form.Item name="softcap" label="Softcap" rules={[{ required: true }]}>
                                    <Input pattern="[0-9]{10}" addonBefore="BNB" min="0" type="number" />
                                </Form.Item>

                                <Form.Item name="hardcap" label="Hardcap" rules={[{ required: true }]}>
                                    <Input pattern="[0-9]{10}" addonBefore="BNB" min="0" type="number" />
                                </Form.Item>
                            </div>
                            {
                                softcapValidation?.active &&
                                <span className='address-validation-error'>
                                    {softcapValidation?.message}
                                </span>
                            }
                            {
                                hardcapValidation?.active &&
                                <span className='address-validation-error'>
                                    {hardcapValidation?.message}
                                </span>
                            }
                        </div>
                    }
                </Form>
            </div>
        }
        {
            formOption && formOption === 'scam' &&
            <div className="form-token">
                <Form onChange={formChange} form={scamForm} preserve={false}>
                    <Form.Item name="address" label="Contact Address" rules={[{ required: true }]}>
                        <Input
                            onPaste={searchTokenOrtokenOnPaste}
                            onKeyDown={handleSearchEnter}
                            onInput={validateInput}
                        />
                    </Form.Item>
                    {
                        addresValidation &&
                        <span className='address-validation-error'>
                            {addresValidation.message}
                        </span>
                    }
                    <div className="row-group">
                        <Form.Item name="name" label="Token Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="symbol" label="Symbol/Ticker" rules={[{ required: true }]}>
                            <Input addonBefore="$" />
                        </Form.Item>
                    </div>
                    <Form.Item name="scamreason" label="Scam Reason" rules={[{ required: false }]}>
                        <Select>
                            <option value="Honeypot">Honeypot</option>
                            <option value="Rugpull">Rugpull</option>
                            <option value="Abandoned Project">Abandoned Project</option>
                            <option value="Slow Rug">Slow Rug</option>
                            <option value="Mint Function">Mint Function</option>
                            <option value="Fake Ownership Renounce">Fake Ownership Renounce</option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="description" label="Scam Description" rules={[{ required: false }]}>
                        <TextArea />
                    </Form.Item>
                    <Form.Item name="logo" label="Logo URL (200px by 200px)" rules={[{ required: false }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="website" label="Website" rules={[{ required: false }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="scamDate" label="Scam Date" rules={[{ required: false }]}>
                        <DatePicker suffixIcon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path opacity="0.3" d="M21 22H3C2.4 22 2 21.6 2 21V5C2 4.4 2.4 4 3 4H21C21.6 4 22 4.4 22 5V21C22 21.6 21.6 22 21 22Z" fill="black"></path>
                                <path d="M6 6C5.4 6 5 5.6 5 5V3C5 2.4 5.4 2 6 2C6.6 2 7 2.4 7 3V5C7 5.6 6.6 6 6 6ZM11 5V3C11 2.4 10.6 2 10 2C9.4 2 9 2.4 9 3V5C9 5.6 9.4 6 10 6C10.6 6 11 5.6 11 5ZM15 5V3C15 2.4 14.6 2 14 2C13.4 2 13 2.4 13 3V5C13 5.6 13.4 6 14 6C14.6 6 15 5.6 15 5ZM19 5V3C19 2.4 18.6 2 18 2C17.4 2 17 2.4 17 3V5C17 5.6 17.4 6 18 6C18.6 6 19 5.6 19 5Z" fill="black"></path>
                                <path d="M8.8 13.1C9.2 13.1 9.5 13 9.7 12.8C9.9 12.6 10.1 12.3 10.1 11.9C10.1 11.6 10 11.3 9.8 11.1C9.6 10.9 9.3 10.8 9 10.8C8.8 10.8 8.59999 10.8 8.39999 10.9C8.19999 11 8.1 11.1 8 11.2C7.9 11.3 7.8 11.4 7.7 11.6C7.6 11.8 7.5 11.9 7.5 12.1C7.5 12.2 7.4 12.2 7.3 12.3C7.2 12.4 7.09999 12.4 6.89999 12.4C6.69999 12.4 6.6 12.3 6.5 12.2C6.4 12.1 6.3 11.9 6.3 11.7C6.3 11.5 6.4 11.3 6.5 11.1C6.6 10.9 6.8 10.7 7 10.5C7.2 10.3 7.49999 10.1 7.89999 10C8.29999 9.90003 8.60001 9.80003 9.10001 9.80003C9.50001 9.80003 9.80001 9.90003 10.1 10C10.4 10.1 10.7 10.3 10.9 10.4C11.1 10.5 11.3 10.8 11.4 11.1C11.5 11.4 11.6 11.6 11.6 11.9C11.6 12.3 11.5 12.6 11.3 12.9C11.1 13.2 10.9 13.5 10.6 13.7C10.9 13.9 11.2 14.1 11.4 14.3C11.6 14.5 11.8 14.7 11.9 15C12 15.3 12.1 15.5 12.1 15.8C12.1 16.2 12 16.5 11.9 16.8C11.8 17.1 11.5 17.4 11.3 17.7C11.1 18 10.7 18.2 10.3 18.3C9.9 18.4 9.5 18.5 9 18.5C8.5 18.5 8.1 18.4 7.7 18.2C7.3 18 7 17.8 6.8 17.6C6.6 17.4 6.4 17.1 6.3 16.8C6.2 16.5 6.10001 16.3 6.10001 16.1C6.10001 15.9 6.2 15.7 6.3 15.6C6.4 15.5 6.6 15.4 6.8 15.4C6.9 15.4 7.00001 15.4 7.10001 15.5C7.20001 15.6 7.3 15.6 7.3 15.7C7.5 16.2 7.7 16.6 8 16.9C8.3 17.2 8.6 17.3 9 17.3C9.2 17.3 9.5 17.2 9.7 17.1C9.9 17 10.1 16.8 10.3 16.6C10.5 16.4 10.5 16.1 10.5 15.8C10.5 15.3 10.4 15 10.1 14.7C9.80001 14.4 9.50001 14.3 9.10001 14.3C9.00001 14.3 8.9 14.3 8.7 14.3C8.5 14.3 8.39999 14.3 8.39999 14.3C8.19999 14.3 7.99999 14.2 7.89999 14.1C7.79999 14 7.7 13.8 7.7 13.7C7.7 13.5 7.79999 13.4 7.89999 13.2C7.99999 13 8.2 13 8.5 13H8.8V13.1ZM15.3 17.5V12.2C14.3 13 13.6 13.3 13.3 13.3C13.1 13.3 13 13.2 12.9 13.1C12.8 13 12.7 12.8 12.7 12.6C12.7 12.4 12.8 12.3 12.9 12.2C13 12.1 13.2 12 13.6 11.8C14.1 11.6 14.5 11.3 14.7 11.1C14.9 10.9 15.2 10.6 15.5 10.3C15.8 10 15.9 9.80003 15.9 9.70003C15.9 9.60003 16.1 9.60004 16.3 9.60004C16.5 9.60004 16.7 9.70003 16.8 9.80003C16.9 9.90003 17 10.2 17 10.5V17.2C17 18 16.7 18.4 16.2 18.4C16 18.4 15.8 18.3 15.6 18.2C15.4 18.1 15.3 17.8 15.3 17.5Z" fill="black"></path>
                            </svg>
                        } />
                    </Form.Item>
                    <div className="row-group">
                        <Form.Item name="twitter" label="Twitter Handle" rules={[{ required: false }]}>
                            <Input addonBefore="https://twiter.com/" placeholder='Handle' />
                        </Form.Item>
                        <Form.Item name="telegram" label="Telegram Handle" rules={[{ required: true }]}>
                            <Input addonBefore="https://t.me.com/" placeholder='Handle' />
                        </Form.Item>
                    </div>
                </Form>
            </div>
        }

    </Container >;
};

export default SubmissionContent;

