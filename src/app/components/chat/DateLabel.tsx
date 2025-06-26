export default function DateLabel({ label }: { label: string }) {
  return (
    <div className="text-center text-xs text-gray-500 dark:text-gray-300 my-4">
      <span className="px-4 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
        {label}
      </span>
    </div>
  );
}
