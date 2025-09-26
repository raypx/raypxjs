export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <div className="text-center">
          <h1 className="mb-2 font-bold text-2xl text-gray-900">Raypx API Server</h1>
          <p className="mb-6 text-gray-600">Welcome to the Raypx platform API</p>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Version:</span>
              <span className="text-gray-900">v1</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Environment:</span>
              <span className="text-gray-900">{process.env.NODE_ENV || "development"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Status:</span>
              <span className="text-green-600">Running</span>
            </div>
          </div>

          <div className="mt-6 border-gray-200 border-t pt-6">
            <h2 className="mb-3 font-semibold text-gray-900 text-lg">Quick Links</h2>
            <div className="space-y-2">
              <a
                className="block w-full rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                href="/api"
              >
                API Info
              </a>
              <a
                className="block w-full rounded bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
                href="/health"
              >
                Health Check
              </a>
              <a
                className="block w-full rounded bg-gray-600 px-4 py-2 text-white transition-colors hover:bg-gray-700"
                href="https://raypx.link/docs"
                rel="noopener noreferrer"
                target="_blank"
              >
                Documentation ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
