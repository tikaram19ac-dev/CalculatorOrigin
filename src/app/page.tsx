import { Header, ScientificCalculator } from "@/components";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <Header />
      <main className="mx-auto max-w-[90vw] px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Calculator Section */}
          <div className="flex-1">
            <ScientificCalculator />
          </div>

          {/* Sidebar */}
          <>
            {/* Quick Links */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Calculator Categories
              </h3>
              <div className="space-y-3">
                <a
                  href="#"
                  className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  📱 Basic Calculator
                </a>
                <a
                  href="#"
                  className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  🔬 Scientific Calculator
                </a>
                <a
                  href="#"
                  className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  💰 Financial Calculator
                </a>
                <a
                  href="#"
                  className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  🏥 Health Calculator
                </a>
                <a
                  href="#"
                  className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  📐 Math Calculator
                </a>
                <a
                  href="#"
                  className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  🔄 Unit Converter
                </a>
              </div>
            </div>
            <div className="w-full lg:w-80 space-y-6 self-stretch flex flex-col">
              {/* Search Bar */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Search Calculators
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for calculators..."
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  />
                  <svg
                    className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Google Ads Section */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl flex-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Sponsored
                </h3>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Advertisement
                  </div>
                  <div className="h-32 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      Google Ad Space
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>

        {/* <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white sm:text-6xl">
            Welcome to{" "}
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Calculator.origin
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
            Your all-in-one solution for calculations - from general to finance
            and health
          </p>
        </div> */}
      </main>
    </div>
  );
}
