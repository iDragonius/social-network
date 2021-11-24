import connectDB from "../../middleware/mongodb";
import UserInfo from "../../models/userInfo";
import Token from "../../models/token";
import Post from "../../models/post";
import jwt from 'jsonwebtoken'

const postCreating = async (req,res) =>{
    if(req.method ==="POST"){
        const {refreshToken} = req.cookies
        if (!refreshToken) {
            return res.status(400).json({message:'1'})
        }
        const tokenFromDb = await Token.findOne({refreshToken:refreshToken})
        if(!tokenFromDb){
            return  res.status(400).json({message:'2'})
        }
        const validateToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
        if(!validateToken){
           return res.status(400).json({message:'3'})
        }
        const{nickname, content, createdAt,createdId} = req.body
        const UserInfos = await UserInfo.findOne({nickname:nickname});
        
        if(!UserInfos){
            return res.status(400).json({message:'error'})
        }
        const post = await Post.create({user:UserInfos.user, nickname:nickname, content:content, createdAt:createdAt, createdId:createdId})
        res.json({post})
    } 
}   


export default connectDB(postCreating)