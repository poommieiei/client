import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
function Home() {


    const [Books, setBooks] = useState({
        isLoading: true,
        books: [],
    });

    const fetchBooks = async () => {
        try {
            const response = await axios.get('/books');
            setBooks({
                isLoading: false,
                books: response.data,
            });
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);



    const [isFetching, setIsFetching] = useState({ isFetching: false, message: '' });

    const SubmitEvent = async () => {
        try {
            const bookId = document.getElementById('bookId').value;
            const customerName = document.getElementById('customerName').value;

            if (bookId === '' || customerName === '') {
                alert('Please fill in all fields');
                return;
            }

            const data = {
                bookId,
                customerName,
            }

            setIsFetching({ isFetching: true });
            const response = await axios.post('/orders', data, {
                headers: {
                    Authorization: sessionStorage.getItem('accessToken')
                }
            });

            setIsFetching({ isFetching: false });
            alert('Order has been created. can check in My Order');
        }
        catch (error) {
            alert(error);
            setIsFetching({ isFetching: false });
        }
    }


    return (
        <>

            <div className="d-flex justify-content-between">
                <Link to={"/login"} className="btn btn-danger">
                    logout
                </Link>
                <Link to={"/order"} className="btn btn-primary">
                    My Order
                </Link>
            </div>


            {Books.isLoading ? (
                <div className='text-center'>
                    <div class="spinner-border text-secondary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="px-5">
                    <form className="px-5">
                        <div className="mb-3">
                            <label htmlFor="book" className="form-label">Book</label>
                            <select className="form-control" id="bookId" name="bookId">
                                <option value="" disabled selected> --Select a book--</option>
                                {Books.books.map((book) => (
                                    <option key={book.id} value={book.id}>
                                        {book.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="customerName" className="form-label">Customer Name</label>
                            <input type="text" className="form-control" id="customerName" name="customerName" />
                        </div>
                        <div className="text text-end">
                            {isFetching.isFetching ? (
                                <div class="spinner-border text-secondary" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            ) : (
                                <div className="btn btn-success" onClick={() => SubmitEvent()}>Submit</div>
                            )}

                        </div>
                    </form>
                </div>
            )}

        </>
    )
}

export default Home;