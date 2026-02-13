"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white border rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold mb-2">페이지 오류가 발생했습니다</h2>
        <p className="text-sm text-gray-600 mb-4">
          아래 메시지를 확인하고, 환경변수 설정 후 재배포가 필요할 수 있습니다.
        </p>
        <pre className="text-xs bg-gray-50 border rounded-xl p-3 overflow-auto whitespace-pre-wrap">
          {error.message}
        </pre>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-4 w-full bg-orange-600 text-white font-bold py-3 rounded-xl"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}

