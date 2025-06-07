import React,{useState , useEffect} from 'react'
import axios from 'axios';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useNavigate,useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:3000/savebook/${id}`)
    .then((res) => {
      setAuthor(res.data.author);
      setTitle(res.data.title);
      setPublishYear(res.data.publishYear);
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
      alert('An error happened . Please Check console')
      console.log(err);
    })
  },[])
  const handleEditbook = () =>{
   const data = {
    title,
    author,
    publishYear,
   };
   setLoading(true);
   axios.put(`http://localhost:3000/savebook/${id}`, data)
   .then(() => {
    setLoading(false);
    enqueueSnackbar('Book updated successfully', { variant: 'success' });
    navigate('/');
   })
   .catch((err) => {
    setLoading(false);
    // alert('an error happened . Please Check Console');
    enqueueSnackbar('error',{variant:'error'});
    console.error(err);
   })
  };
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
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
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditbook}>Save </button>
      </div>
      </div>
  )
}

export default EditBook