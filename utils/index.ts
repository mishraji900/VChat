import axios from 'axios';
import jwt_decode from 'jwt-decode'

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetUser = async (response: any, addUser: any) => {
  var base64Url = response.credential.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var chars = atob(base64);
  var jsonPayload = decodeURIComponent(
    Array.from({ length: chars.length }, (_, i) => chars.charCodeAt(i))
      .map((charCode) => String.fromCharCode(charCode))
      .join('')
  );
  
  const { name, picture, sub } = JSON.parse(jsonPayload)
  
  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture,
  };
  
  addUser(user);

  await axios.post(`${BASE_URL}/api/auth`, user);
};
