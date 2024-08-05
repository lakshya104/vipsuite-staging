import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { SignUpRequestBody, SignUpResponse } from '../../../interfaces/signup';
// import { SignUpRequestBody, SignUpResponse } from '@/interfaces/signup';

const THIRD_PARTY_SIGNUP_URL = 'https://vip.anktech.in/wordpress/wp-json/wp/v2/signup';

export default async function handler(req: NextApiRequest, res: NextApiResponse<SignUpResponse>) {
  if (req.method === 'POST') {
    const {
      first_name,
      last_name,
      email,
      password,
      secondary_email,
      phone,
      user_type,
      instagram_handle,
      tiktok_handle,
    } = req.body as SignUpRequestBody;

    // Basic validation
    if (!first_name || !last_name || !email || !password || !phone || !user_type) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {
      // Call the third-party signup API
      const response = await axios.post(THIRD_PARTY_SIGNUP_URL, {
        first_name,
        last_name,
        email,
        password,
        secondary_email,
        phone,
        user_type,
        instagram_handle,
        tiktok_handle,
      });
      console.log('response==================', response);

      if (response.status === 201) {
        return res.status(201).json({ success: true, message: 'User created successfully', data: response.data });
      } else {
        return res
          .status(response.status)
          .json({ success: false, message: 'Failed to create user', data: response.data });
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Internal server error', data: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
  }
}
