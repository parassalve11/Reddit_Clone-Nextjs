/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          { 
            hostname: 'lh3.googleusercontent.com ',
          },
          { 
            hostname: 'avatar.vercel.sh',
          },
          { 
            hostname: 'utfs.io',
            port:''
          },
        ],
      },
};

export default nextConfig;
