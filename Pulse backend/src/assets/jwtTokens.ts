import jwt from 'jsonwebtoken';




export const generateToken = (ID: string, username: string): string => {
  const secretToken = process.env.JWT_SECRET_TOKEN;
  if (!secretToken) {
    throw new Error('JWT_SECRET_TOKEN is not defined in environment variables');
  }
  const token = jwt.sign(
    {
      userId: ID,
      username: username,
    },
    secretToken
  );
  return token;
};



