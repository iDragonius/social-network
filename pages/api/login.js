import connectDB from '../../middleware/mongodb';
import bcrypt from 'bcrypt';
import User from '../../models/user';
import Token from '../../models/token';
import jwt from 'jsonwebtoken'
import { setCookies } from 'cookies-next';
import UserInfo  from '../../models/userInfo'

const login = async (req,res)=> {
    if(req.method = 'POST'){
        const {email, password} = req.body;
        if(!email){
            throw new Error('Почта не указана')
        }
        if(!password){
            throw new Error('Введите пароль')
        }
        let data = await User.findOne({email}) //? await User.findOne({email}) : await UserInfo.findOne({nickname:email})
        if(!data){
            data = await UserInfo.findOne({nickname:email})
            if(data){
                data = await User.findOne({_id:data.user})
            } else {
                res.status(400).json({message:'error'})
            }
        }        
        const isPasswordsEquals = await bcrypt.compare(password, data.password)
        if(!isPasswordsEquals){
            throw new Error('Пароль неверный')
        }

        const userDto = {
            email:data.email,
            id:data._id,
            isActivated:data.isActivated,
            createdAt:data.createdAt
        }
        const tokenModel = await Token.findOne({user:userDto.id})
        const accessToken = jwt.sign(userDto, process.env.JWT_ACCESS_SECRET, {expiresIn: '15d'})
        const refreshToken = jwt.sign(userDto, process.env.JWT_REFRESH_SECRET, {expiresIn: '60d'})
        const tokens = {
        accessToken,
        refreshToken
        }
        let userToken = {}
        if(!tokenModel){
            userToken = await Token.create({user: userDto.id, refreshToken})
        } else{
            tokenModel.refreshToken = refreshToken
            await tokenModel.save()
            userToken = tokenModel
        }
        const userInfos = await UserInfo.findOne({user:userDto.id})
        setCookies('refreshToken', tokens.refreshToken, {req,res,maxAge: 60*24*60*60*100, httpOnly: true})

        res.json({...tokens,userInfo:userDto, userAbout:userInfos})
    } else {
        res.status(500).json({error:'Не подходящий метод'})
    }
}

export default connectDB(login)