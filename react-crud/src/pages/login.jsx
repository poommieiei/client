import axios from 'axios';
import { useState } from 'react';

function Login() {

    const [summend, setSummend] = useState({
        isFetching: false,
    });

    const submitForm = async () => {
        try {
            const clientEmail = document.getElementById('clientEmail').value;
            const clientName = document.getElementById('clientName').value;

            console.log(clientEmail, clientName);

            if (clientEmail == '' || clientName == '') {
                alert('Please fill in the form');
                return;
            }
            const data = {
                clientEmail: clientEmail,
                clientName: clientName
            }

            setSummend({ isFetching: true});
            const response = await axios.post('/api-clients', data);
            
            setSummend({ isFetching: false});

            



        }
        catch (error) {
            console.log(error.response.data.error);
            alert('Error' + error.response.data.error);
        }
    }


    return (
        <>
            <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">clientEmail</label>
                    <input type="email" class="form-control" id="clientEmail" aria-describedby="emailHelp" placeholder="clientEmail" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">clientName</label>
                    <input type="text" class="form-control" id="clientName" placeholder="clientName" />
                </div>

                {summend.isFetching ? (
                    <div class="spinner-border text-secondary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    <div type="submit" class="btn btn-primary" onClick={submitForm}>Submit</div>
                )}

            </form>
        </>
    )
}

export default Login;