import React, { useState } from "react";
import PropTypes, { string } from 'prop-types'
import axios from 'axios'
import { setUserSession } from '../../utils/Common'


function LogIn(props) {
    const username = useFormInput('')
    const password = useFormInput('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleLogin = () => {
        setError(null);
        setLoading(true);
        axios.put('http://localhost:1323/login', { username: username.value, password: password.value })
            .then(response => {
                setLoading(false);
                alert(response)
                console.log(response.data)
                setUserSession(response.data.token, response.data.user);
                props.history.push('/positions');
            })
            .catch(error => {
                setLoading(false);
                if (error.response.status === 401) setError(error.response.data.message);
                else setError("Something went wrong. Please try again later.");
            });
    }

    return (
        <div>
            Login <br /><br />
            <div>
                Username<br />
                <input type="text" {...username} autoComplete="new-password" />
            </div>
            <div style={{ marginTop: 10 }}>
                Password <br />
                <input type="password" {...password} autoComplete="new-password" />
                {error && <><small style={{ color: 'red' }}>{error}</small><br /></>} <br />
            </div>
            <input type="button" value={loading ? 'Loading...' : 'login'} onClick={handleLogin} disabled={loading} /><br />
        </div>
    )
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
}



export default LogIn