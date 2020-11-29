import React from 'react';
import PropTypes from 'prop-types';

export default function ValidationError(props) {
    if (props.message) {
        return (
            <p className="error">{props.message}</p>
        )
    }
    return <></>
}

ValidationError.propTypes = {
	message: PropTypes.string,
}