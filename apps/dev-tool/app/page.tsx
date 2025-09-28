import { StatusCard } from "@/components/status-card";
import { ToolNavigation } from "@/components/tool-navigation";

export default function DevToolPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="font-bold text-3xl text-gray-900">Raypx Dev Tool</h1>
              <p className="mt-1 text-gray-500 text-sm">
                Development environment monitoring and management
              </p>
            </div>
            <div className="text-gray-500 text-sm">Port: 3010</div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-1">
              <ToolNavigation />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                <div>
                  <h2 className="mb-4 font-medium text-gray-900 text-lg">Service Status</h2>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <StatusCard
                      description="PostgreSQL connection"
                      name="Database"
                      status="checking"
                    />
                    <StatusCard description="Cache service" name="Redis" status="checking" />
                    <StatusCard description="Email service" name="Email" status="checking" />
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 font-medium text-gray-900 text-lg">Quick Actions</h2>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                      <h3 className="font-medium text-gray-900 text-sm">Environment Variables</h3>
                      <p className="mt-1 text-gray-500 text-sm">
                        Manage and validate environment configuration
                      </p>
                      <button
                        className="mt-3 text-blue-600 text-sm hover:text-blue-500"
                        type="button"
                      >
                        View →
                      </button>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                      <h3 className="font-medium text-gray-900 text-sm">UI Components</h3>
                      <p className="mt-1 text-gray-500 text-sm">
                        Preview and test UI component library
                      </p>
                      <button
                        className="mt-3 text-blue-600 text-sm hover:text-blue-500"
                        type="button"
                      >
                        Browse →
                      </button>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                      <h3 className="font-medium text-gray-900 text-sm">API Testing</h3>
                      <p className="mt-1 text-gray-500 text-sm">Test API endpoints and services</p>
                      <button
                        className="mt-3 text-blue-600 text-sm hover:text-blue-500"
                        type="button"
                      >
                        Test →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
