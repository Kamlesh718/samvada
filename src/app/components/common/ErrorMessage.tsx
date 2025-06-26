import React from "react";

interface ErrorMessageProps {
  error: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error) return null;

  return (
    <span className="text-red-600 bg-red-100 border border-red-300 p-2 rounded mt-2 flex justify-center items-center">
      {error}
    </span>
  );
};

export default ErrorMessage;
