// import express, { type Express, type Request, type Response } from 'express';
// type ResponseUnsplashQuery = {
//     res: {
//         r: Response,
//         query: string
//     }
// }
export type ResponseGetSearchUQ = string[]


export interface ApiResponse<T> {
  status: boolean;
  data?: T;
  error?: string;
}