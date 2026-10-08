import axios from 'axios';
import type { ApiResponse, ResponseGetSearchUQ } from '../client/types/server.ts';


export const apiClient = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
})

export const apiErrorMessage= 'error in unsplash api'
export async function fetchPhotos(params : string) : Promise<ResponseGetSearchUQ> {
    const response = await apiClient.get<ApiResponse<ResponseGetSearchUQ>>(`/api/unsplash/search/photos/`,
      {params: {
        unsplash: {
            s: params,
            page: 1
          }
  }}
     )
    if(!response.status || !response.data){
        return [apiErrorMessage]
    }
    return response.data.data ? response.data.data : [] 
}
    