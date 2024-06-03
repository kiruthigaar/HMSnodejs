import express from 'express'

import {Admin, RefreshToken} from './adminModel.js'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import {newAccessToken} from './authenticatoin.js'

const AdminRouter = express.Router()

AdminRouter.get('/generate/key/', (request, response) => {
    const key = crypto.randomBytes(64).toString('hex')
    response.json(key)
})

AdminRouter.get('/', async (request, response) => {
    const admin = await Admin.find({})
    response.json(admin)
})

AdminRouter.post('/', async (request, response) => {
    await Admin(request.body).save()
    response.send("posted")
})

AdminRouter.post("/validate/", async (request, response) => {
    const {user_name, password} = request.body

    console.log(user_name, password)

    const adminCheck = await Admin.find({})

    const admin_data = adminCheck.find(admin => admin.user_name === user_name)

    console.log(admin_data)

    if(admin_data === undefined ) response.json({
        status: false,
        message: "Invalid Username"
    })

    else{
         if(admin_data.password === password){

            const user = {
                name : user_name,
            }

            const access_token = newAccessToken(user)
            const refresh_token = jwt.sign(user , process.env.REFRESH_TOKEN_KEY)

            const new_refresh_token = new RefreshToken(
                {
                    refresh_token: refresh_token
                }
            )

            await new_refresh_token.save()

            response.json({
                status: true,
                message: "Valid User",
                access_token : access_token,
                refresh_token : refresh_token,
                admin_data : admin_data
            })

         }
         else response.json({
            status: false,
            message: "Invalid Password"
        })
    }
})

AdminRouter.post("/token/", async (request, response) => {
    const refresh_token = request.body.refresh_token

    if(refresh_token === null){
        return response.status(401).json("no token found")
    }

    const all_refresh_token = await RefreshToken.find({refresh_token: refresh_token})

    if(all_refresh_token.length === 0){
        return response.status(403).json("invalid token")
    }

    jwt.verify(refresh_token, process.env.REFRESH_TOKEN_KEY, (error, user) => {
        if(error) {
            return response.status(403).json("Token Verification Failed")
        }

        const access_token = newAccessToken({name: user.name})

        console.log("inside token");
        response.json({
            access_token: access_token
        })
    })

})

AdminRouter.post('/logout/' , async (request , response) =>{

    const refresh_token = request.body.refresh_token

    const all_refresh_tokens = await RefreshToken.find({})

    let selected_token = all_refresh_tokens.find(token => token.refresh_token === refresh_token)

    let a = await RefreshToken.findByIdAndDelete(selected_token._id)
    
    console.log(a);
    
    response.status(200).json("Refresh Token Deleted")

})


export default AdminRouter;