import express from 'express';

import {book} from "../models/bookModel.js";

const router = express.Router();

// route to get the data
router.get('/',async (req,res) => {
    try{
        const Book = await book.find({});
        return res.status(200).json({
              count: Book.length,
              data: Book
        });

    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
    
});

// route to get the data of one book by id
router.get('/:id',async (req,res) => {
    try{

         const{id} = req.params;        
        const Book = await book.findById(id);
        return res.status(200).json(Book);

    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
    
});

//route for update
router.put('/:id', async (req,res) =>{
   try{
    if(!req.body.title ||
        !req.body.author ||
        !req.body.publishYear){
            return res.status(400).send({message: "Please fill all the fields"});
        }

        const {id} = req.params;
        const result = await book.findByIdAndUpdate(id,req.body);
        if(!result){
            return res.status(404).send({message: "Book not found"});
        }

        return res.status(200).send({message:'book updated successfully'});

   }
   catch(error){
    console.log(error.message);
    res.status(500).send({message:error.message});
   }
});

//route for save a new book
router.post('/',async (req,res)=>{
    try{
        if(!req.body.title ||
            !req.body.author ||
            !req.body.publishYear

        ){
            return res.status(400).send({
                message:"Please fill all the fields : title,author,publishYear",
            });
        }
        const newBook = {
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear,
        };

     const Book = await book.create(newBook);
     return res.status(201).send(Book);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

// route for delete

router.delete('/:id' , async (req,res)=>{
    try{
        const {id} = req.params;
        const result = await book.findByIdAndDelete(id);

        if(!result){
            return res.status(404).json({message:'book not found'});
        }
        return res.status(200).send({message:'book deleted successfully'});

    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});

export default router;