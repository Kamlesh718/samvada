export default function ChatHome() {
  return (
    <div className="flex items-center justify-center h-[90vh] text-center px-4">
      <div>
        <h2 className="text-3xl font-bold mb-4 text-gray-400">
          Welcome to Samvāda 💬
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Select a user to start chatting.
        </p>
        <div className="mt-6 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 p-4 rounded-md text-sm">
          <strong className="font-semibold text-gray-700 dark:text-gray-200">
            Note:
          </strong>{" "}
          Messages will be automatically deleted after 24 hours to ensure
          privacy and confidentiality.
        </div>
      </div>
    </div>
  );
}
