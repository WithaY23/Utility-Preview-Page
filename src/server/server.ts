import 'dotenv/config';
import express, { type Express, type Request, type Response } from 'express';
import { createApi } from "unsplash-js";
import { WEB_BACKGROUND_IMAGE_COUNT, WEB_BACKGROUND_SIZE } from '../data/preview.ts';
// import fetch from 'node-fetch';
import cors from 'cors';
import type { ApiResponse, ResponseGetSearchUQ } from '../types/server.ts';


const app: Express = express();
app.set('query parser', 'extended');
app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON bodies

const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY; // never in frontend code
const serverApi = createApi({
  accessKey: UNSPLASH_KEY,
  //...other fetch options
});
app.get('/', (req: Request, res: Response) => {
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

app.listen(3001);

