import React, { useState } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useNavigate,useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
const [loading, setLoading] = useState(false);
const navigate = useNavigate();
const { id } = useParams();
const { enqueueSnackbar } = useSnackbar();
const handleDeleteBook = () => {
  setLoading(true);
  axios.delete(`http://localhost:3000/savebook/${id}`)
  .then(()=>{
    setLoading(false);
    enqueueSnackbar('Book deleted successfully', { variant: 'success' });
    navigate('/');
  })
  .catch((error) => {
    setLoading(false);
    // alert(`an error occured , check console`)
    enqueueSnackbar('error',{variant:'error'})
    console.error(error);
  })

};



  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl my-4'>Are you sure you want to delete this book?</h3>
        <button className='p-4 bg-red-600 hover:bg-red-700 text-white font-bold m-8 w-[300px] '
        onClick={handleDeleteBook}>Delete Book</button>
      </div>
    </div>
  )
}

export default DeleteBook