import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [submited, setSubmited] = useState({ isFetching: false, status: false, message: 'isError' });
  const navigate = useNavigate();


  const submitLogin = async () => {
    try {
      setSubmited({ isFetching: true });
      const clientName = document.getElementById('clientName').value;
      const clientEmail = document.getElementById('clientEmail').value;




      const data = {
        clientName: clientName,
        clientEmail: clientEmail
      }

      const response = await axios.post('/api-clients', data);

      if (response.status !== 201) {
        throw new Error(response.data.error);
      }

      sessionStorage.setItem('accessToken', response.data.accessToken);
      navigate('/');

    }
    catch (error) {
      console.error(error.response.data.error);
      setSubmited({ isFetching: false, status: true, message: error.response.data.error });

    }

  }

  return (
    <div>
      <h1>Login</h1>
      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Name</label>
          <input type="text" class="form-control" id="clientName" aria-describedby="emailHelp" placeholder="Username" />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Email</label>
          <input type="email" class="form-control" id="clientEmail" placeholder="@email" />
        </div>
        {submited.isFetching ? (
          <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div type="submit" class="btn btn-primary" onClick={submitLogin}>
            Submit
          </div>
        )}

        {submited.status && (
          <div class="alert alert-danger" role="alert">
            {submited.message}
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;