import React,{useState} from 'react'
import axios from 'axios';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handlesavebook = () =>{
   const data = {
    title,
    author,
    publishYear,
   };
   setLoading(true);
   axios.post('http://localhost:3000/savebook', data)
   .then(() => {
    setLoading(false);
    enqueueSnackbar('Book Created Successfully', { variant: 'success' });
    navigate('/');
   })
   .catch((err) => {
    setLoading(false);
    // alert('an error happened . Please Check Console');
    enqueueSnackbar('Error', { variant: 'error' });
    console.error(err);
   })
  };
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ?<Spinner />: ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-grey-500'>Title</label>
          <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full py-2 px-4 border-2 border-grey-500'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-grey-500'>Author</label>
          <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className='w-full py-2 px-4 border-2 border-grey-500'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-grey-500'>Publish Year</label>
          <input
          type="number"
          value={publishYear}
          onChange={(e) => setPublishYear(e.target.value)}
          className='w-full py-2 px-4 border-2 border-grey-500'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handlesavebook}>Save </button>
      </div>
      </div>
  )
}

export default CreateBooks