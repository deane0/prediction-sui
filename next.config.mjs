/** @type {import("next").NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push('utf-8-validate', 'bufferutil', 'encoding')
    return config
  },
}

export default nextConfig
