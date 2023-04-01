import Fruit from '../models/Fruit.js';
import Review from '../models/Review.js';

export const createReview = async (req, res)=>{

    const fruitId = req.params.fruitId
    const newReview = new Review({...req.body})


    try {
        const savedReview = await newReview.save()
       // after creating a new review  now update the reviews array of the fruit
        await Fruit.findByIdAndUpdate(fruitId,{
            $push: {reviews: savedReview._id}
        })
        res.status(200).json({success:true, message:"Review submitted",data:savedReview})
        
    } catch (error) {
        res.status(500).json({success:false, message:"failed to sunmit"})
        
    }
}