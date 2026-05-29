/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Don't reuse the client Router Cache for dynamic pages — every navigation
    // refetches. Without this, returning to the mechanic/admin dashboard after
    // logging a scan shows stale "recent scans" / "scans today" for up to 30s.
    staleTimes: { dynamic: 0 },
  },
};

export default nextConfig;
