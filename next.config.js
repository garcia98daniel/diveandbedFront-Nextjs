/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['dnb-images-bucket.s3.us-east-2.amazonaws.com', 'dnb-images-bucket-prod.s3.us-east-2.amazonaws.com', 'react.semantic-ui.com'],
  },
}

module.exports = nextConfig
