// Dependencies
import React, { useEffect } from 'react';
import { Container } from './switch.style';

const Switch: React.FC = (props) => {
    useEffect(() => { }, []);

    return <Container>
        <div className="form-check form-check-solid form-switch fv-row">
            <input className="form-check-input w-45px h-30px" type="checkbox" id="allowmarketing" />
            <label className="form-check-label" ></label>
        </div>
    </Container>;
};

export default Switch;
