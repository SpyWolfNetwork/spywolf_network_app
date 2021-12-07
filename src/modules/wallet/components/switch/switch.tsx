// Dependencies
import React, { useEffect } from 'react';
import { Container } from './switch.style';

const Switch: React.FC = (props) => {
    useEffect(() => { }, []);

    return <Container>
        <div className="row mb-0" >
            <label className="col-lg-8 col-form-label fw-bold fs-6">Switch to BUSD?</label>
            <div className="col-lg-4 d-flex align-items-center">
                <div className="form-check form-check-solid form-switch fv-row">
                    <input className="form-check-input w-45px h-30px" type="checkbox" id="allowmarketing" />
                    <label className="form-check-label" ></label>
                </div>
            </div>
        </div>
    </Container>;
};

export default Switch
;
