/** @type {import('next').NextConfig} */
const nextConfig = {
  // Both checks are on. They were suppressed to unblock a deploy, and with them
  // off the build passed while tsc reported five real errors, one of which fed
  // the wrong shape to a chart and rendered it empty. A suppressed error looks
  // exactly like no error.
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
