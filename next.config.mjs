/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND}/api/:path*`
        // destination: 
      },
    ]
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'paint-by-numbers-image-data.s3.eu-north-1.amazonaws.com',
      }
    ]
  }
}

export default nextConfig;
