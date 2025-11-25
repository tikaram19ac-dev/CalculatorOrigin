import { Header } from '@/components';

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white sm:text-6xl">
            Welcome to <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Calculator.origin</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
            Your all-in-one solution for calculations - from general to finance and health
          </p>
        </div>
      </main>
    </div>
  );
}
