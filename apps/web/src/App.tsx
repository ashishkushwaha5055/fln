// v0.1.1 - Minimal placeholder. Real Login + Dashboard come in v0.3.0.
import { SHARED_PACKAGE_VERSION } from '@fln/shared';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-brand-800 mb-2">FLN-Assessment</h1>
        <p className="text-gray-600 mb-6">
          Foundational Literacy &amp; Numeracy Platform
        </p>
        <div className="bg-green-50 border border-green-200 rounded p-3 mb-4">
          <p className="text-sm text-green-800">
            ✅ v{SHARED_PACKAGE_VERSION} — Monorepo Skeleton ready
          </p>
        </div>
        <div className="text-left text-sm text-gray-700 space-y-1">
          <p>📦 Monorepo: apps/web + apps/api + packages/shared</p>
          <p>🎨 Frontend: React + Vite + TS + Tailwind</p>
          <p>🔌 Backend: Node + Express + TS</p>
          <p className="text-xs text-gray-500 pt-2">
            Next: v0.2.0 — Backend Foundation + Auth
          </p>
        </div>
      </div>
    </div>
  );
}