import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponce } from '../utils/ApiResponce.js'

const registorUser = asyncHandler( async (req, res)=> {
    // get user details from frontend
    // validation - not empty
    // check if user already exist: username, email
    //  check for images , check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field fro esponce
    // check for user creation 
    // return res



    const {fullName, email, username, password} = req.body
    console.log("email:",email);

    if (
        [fullName, email, username,password].some((filed)=> filed?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = User.findOne({
        $or: [{ username}, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with or username already exist")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalath = req.files?.coverImage[0]?.path;
    

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required")
    }

    const avatar =  await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalath)

    if (!avatar) {
        throw new ApiError(400, "Avatar is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (createdUser) {
        throw new ApiError(500, "Something went wrong while registering user")
    }

    return res.status(201).json(
        new ApiResponce(200, createdUser, "User registered successfully")
    )

} )

export {registorUser}