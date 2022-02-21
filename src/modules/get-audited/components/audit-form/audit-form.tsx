/* eslint-disable @typescript-eslint/no-unused-vars */
// Dependencies
import { Alert, Button, Form, Input, Switch } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { IoAlertCircleSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { RequestAuditContext } from '../../../../core/routes/providers/request-audit.provider';
import AddressInputComponent from '../../../components/address-input/address-input';
import SearchAdressInput from '../../../components/search-address/search-address';
import { Container } from './audit-form.style';


const AuditForm: React.FC = () => {
    const { toChecksumAddress } = require('ethereum-checksum-address');

    useEffect(() => {


    }, []);

    const navigate = useNavigate();

    const [auditForm] = useForm();
    const { formDataState, cartData, productCart, pricesState } = useContext<any>(RequestAuditContext) as any;

    const { prices } = pricesState;

    const [products] = productCart;
    const [formData, setFormData] = formDataState;

    const checkValidation = (_validToken?) => {
        const { telegram, smartContract } = auditForm.getFieldsValue();
        if (_validToken) {
            setDisableSubmit(!telegram || !_validToken);
        } else {
            setDisableSubmit(!telegram || !validToken);


        }
    }

    const [disableSubmit, setDisableSubmit] = useState<boolean>(true);

    const [payLater, setPayLater] = useState<boolean>(false);
    const [getDiscount, setGetDiscount] = useState<boolean>(true);

    const [validToken, setValidToken] = useState<boolean>(false);

    const [smartContractAddress, setSmartContractAddress] = useState<string>('');

    const {
        totalPrice,
    } = cartData;

    const formChange = (form) => {
        setFormData(auditForm.getFieldsValue());
        checkValidation();
        setPayLater(auditForm.getFieldValue('payLater'))
        setGetDiscount(auditForm.getFieldValue('getDiscount'))
    }


    const submit = () => {
        const values = auditForm.getFieldsValue();
        if (!disableSubmit) {
            setDisableSubmit(true)
            try {
                const payload = {
                    email: values.email,
                    adLap: "2 weeks",
                    totalPrice: `${totalPrice} BNB`,
                    contractAddress: toChecksumAddress(smartContractAddress),
                    telegram: `https://t.me/${values.telegram}`,
                    website: values.website,
                    contactPersonTelegram: `https://t.me/${values.telegram}`,
                    paymentTXHash: values.txHash
                }
                if (products.audit) {
                    payload['auditPrice'] = `${products.deadline ? products.deadline : prices['audit']} BNB`
                }

                if (products.ama) {
                    payload['AMAPrice'] = `${prices['ama']} BNB`

                }

                if (products.kyc) {
                    payload['KYCPrice'] = `${prices['kyc']} BNB`

                }

                if (products.ad) {
                    payload['adPrice'] = `${prices['ad']} BNB`

                }
                if (products.audit && products.deadline) {
                    if (products.deadline === 3) {
                        payload['auditDeliveryTime'] = `24 Hours`;
                    }
                    if (products.deadline === 2.5) {
                        payload['auditDeliveryTime'] = `2 Days`;
                    }
                    if (products.deadline === 2) {
                        payload['auditDeliveryTime'] = `3 Days`;
                    }
                    if (products.deadline === 1.5) {
                        payload['auditDeliveryTime'] = `4 Days`;

                    }
                }
                axios.post('https://nhlm8489e3.execute-api.us-east-2.amazonaws.com/prod/services',
                    payload
                ).then(() => {
                    Swal.fire({
                        title: 'Thank you',
                        text: 'Request Received Correctly, an agent will contact you shortly',
                        icon: 'success',
                        timer: 4000,
                        didClose: () => {
                            navigate('../')
                        }
                    })
                }).catch(e => {
                    Swal.fire({
                        title: 'Oops!',
                        text: 'Something went wrong!',
                        icon: 'error',
                        confirmButtonText: 'Try Again',
                    })
                })
            } catch (err) {
                Swal.fire({
                    title: 'Oops!',
                    text: 'Something went wrong!',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                })
            }
        }
    }

    const checkValidToken = (isValid) => {
        setValidToken(isValid);
        checkValidation(isValid);
    }

    const updateSmartContract = (e) => {
        setSmartContractAddress(e);
    }

    // eslint-disable-next-line no-control-regex
    const emailpattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    return <Container>
        <Form onChange={formChange} form={auditForm} preserve={false} >
            <div className="inline">
                <Form.Item label={'Your Email'} extra="*Your invoice will be sent here." name={'email'} rules={[{ pattern: emailpattern, message: 'Please enter a valid email' }]}  >
                    <Input placeholder='jon@gmail.com'></Input>
                </Form.Item>
                <Form.Item label={'Your Telegram'} name={'telegram'} rules={[{ required: true }]}>
                    <Input placeholder='@jon_crypto'></Input>
                </Form.Item>
            </div>
            <Form.Item label={'Smart Contract'} name={'smartContract'} rules={[{ required: true }]} >
                <AddressInputComponent valid={checkValidToken} valueChange={updateSmartContract}></AddressInputComponent>
            </Form.Item>
            <Form.Item label={`Project's Website`} name={'website'} >
                <Input placeholder='https://spywolf.network/'></Input>
            </Form.Item>


            {totalPrice > 0 &&
                <Alert style={{
                    borderStyle: "dashed",
                    borderColor: '#00ff73 ',
                    border: '1px dashed #00ff73 ',
                    backgroundColor: '#ddffe0 ',
                    borderRadius: '.475rem',
                    marginBottom: '20px',
                    padding: '20px 10px'
                }} message={
                    <div style={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                        <div className="icon">
                            <IoAlertCircleSharp style={{ fill: '#00c5706c', margin: '20px' }} fontSize={'2.75rem '}></IoAlertCircleSharp>
                        </div>
                        <div className="text-container">
                            <h1 style={{ color: '#181c32', fontSize: '1.25rem', fontWeight: '600' }}>Please send {totalPrice} BNB to:</h1>
                            <p style={{ margin: 0, color: '#5e6278', fontSize: '1.075rem', whiteSpace: 'break-spaces' }}>0x845A458Ff034F46afD6beDD72730b7B88DD32b56</p>
                        </div>
                    </div>
                } type="warning" />
            }
            {totalPrice > 0 &&
                <Form.Item label={'Transaction Hash(txHash)'} name={'txHash'}  >
                    <Input placeholder='0xC2D0f6b7513994A1Ba86CEf3AAc181a371A4CA0c'></Input>
                </Form.Item>
            }
            <span>Once you submit your information, a team member will contact you to answer any questions you may have, finalize the payment and get started!
            </span>

        </Form>
        <div className="action" style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <Button disabled={disableSubmit} onClick={submit} style={{ color: '#152B36', fontWeight: '500', fontSize: '20px', padding: 'calc(.825rem + 1px) calc(1.75rem + 1px)' }} type="primary">BOOK NOW</Button>

        </div>
    </Container >;
};

export default AuditForm;

