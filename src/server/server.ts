import 'dotenv/config';
import express, { type Express, type Request, type Response } from 'express';
import { createApi } from "unsplash-js";
import { WEB_BACKGROUND_IMAGE_COUNT, WEB_BACKGROUND_SIZE } from '../client/data/preview.ts';
// import fetch from 'node-fetch';
import cors from 'cors';
import type { ApiResponse, ResponseGetSearchUQ } from '../client/types/server.ts';
import { SECRET_KEY, users } from '../client/data/login.ts';
import { verifyPassword } from './login.ts';
import jwt from 'jsonwebtoken';


const app: Express = express();
app.set('query parser', 'extended');
app.use(cors()); 
app.use(express.json()); 

const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY; 
const serverApi = createApi({
  accessKey: UNSPLASH_KEY,

});
app.get('/', (res: Response) => {
  res.send('hello world');
});


app.get('/api/unsplash/search/photos', async(req: Request, res: Response<ApiResponse<ResponseGetSearchUQ>>) => {
  // const unsplashSearchParams = req.params[0]
  // Expected string, malicious if not string so treat as only string
  const unsplashData = typeof req.query.unsplash === 'object' &&
  req.query.unsplash !== null &&
  !Array.isArray(req.query.unsplash) ? req.query.unsplash : ''
  
  
  const qu = unsplashData ? String(unsplashData.s) : ''
  console.log(qu, unsplashData,req.query, req.query.unsplash, "hi1")
  const unsplashQuery = {query: qu, page: 1, per_page:WEB_BACKGROUND_IMAGE_COUNT, orientation: "squarish" as const}
  const feed = await serverApi.GET("/search/photos", {params : {query: unsplashQuery }})
  if (feed.error)
  {
    console.log(`error getting unsplash images, ${feed.error}`)
    console.log(feed.error, "hiii")
    return res.json({
      status: false,
      data: feed.error.errors})
  }
  else
  {
    const data = feed.data
    const results =data.results
    const urls : string[] = []
    for (const photo of results)
    {
      urls.push(photo.urls.raw + WEB_BACKGROUND_SIZE)
    }
    return res.json({
      status: true,
      data: urls})
  }
  
});
app.get('/account/user', async(req:Request, res: Response) =>
{
  const token: string = req.body
  try{
    const payload = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload
    const user = users.find(user => user.email === payload.email)
    if(!user)
    {
      return res.status(401).json({error: 'No user found with that email'})
    }
    res.json({email: user.email, 
      userPersonalization: user.userPersonalization})
    }
  catch(err)
    {
      if(err === 'TokenExpiredError')
      {
        return res.status(401).json({error: 'Expired token, login again'})
      }
      return res.status(400).json({error: 'Error verifying token'})
    }
} )
app.post('/account/login', async(req:Request, res: Response) =>
{
  const {email, password} = req.body
  const user = users.find((user) => user.email === email)
  console.log('user pasword', user?.password)

  if(!user)
  {
    return res.status(401).json({error: 'Invalid username'})
  }
  console.log('user pasword', user.password)

  const isVerified = await verifyPassword(password,user.password)
  // const randomVer = await verifyPassword('a','b')
  // console.log('verified password', isVerified, randomVer)
  if(!(isVerified))
  {
    return res.status(403).json({error: 'Invalid username/password'})
  }
  
  const token = jwt.sign(
    {email : email}, SECRET_KEY, {expiresIn: '1h'}
  )
  const relevantUserData = {email: user.email, userPersonalization: user.userPersonalization}
  // sessionMap.set()
  res.json({token: token, user: relevantUserData})
})


app.listen(3001);

