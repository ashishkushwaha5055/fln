import { useAuthStore } from '@/stores/authStore';
import { Role } from '@fln/shared';

const ROLE_LABELS: Record<Role, string> = {
  [Role.SUPER_ADMIN]: 'Super Admin',
  [Role.STATE_ADMIN]: 'State Admin',
  [Role.DISTRICT_ADMIN]: 'District Admin',
  [Role.BLOCK_ADMIN]: 'Block Admin',
  [Role.PRINCIPAL]: 'Principal',
  [Role.TEACHER]: 'Teacher',
  [Role.VOLUNTEER]: 'Volunteer',
};

export default function DashboardPage() {
  const { user, logout } = useAuthStore();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div>
            <h1 className="text-xl font-bold text-brand-800">FLN-Assessment</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{ROLE_LABELS[user.role]}</p>
            </div>
            <button onClick={logout} className="btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card">
          <h2 className="text-2xl font-semibold mb-2">
            Welcome, {user.name}! 👋
          </h2>
          <p className="text-gray-600 mb-6">
            You're signed in as <strong>{ROLE_LABELS[user.role]}</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="card bg-brand-50 border-brand-200">
              <h3 className="font-semibold text-brand-900">🎯 Assessments</h3>
              <p className="text-sm text-gray-600 mt-1">
                Generate, scan & evaluate FLN papers
              </p>
            </div>
            <div className="card bg-brand-50 border-brand-200">
              <h3 className="font-semibold text-brand-900">👥 Students</h3>
              <p className="text-sm text-gray-600 mt-1">
                Manage profiles & view progress
              </p>
            </div>
            <div className="card bg-brand-50 border-brand-200">
              <h3 className="font-semibold text-brand-900">📊 Reports</h3>
              <p className="text-sm text-gray-600 mt-1">
                View class/school analytics
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800">
              🚧 <strong>v0.3.0 — Login + Dashboard ready.</strong> Each role will see role-specific
              features in future versions (v0.6+).
            </p>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-gray-700 mb-2">Your scope</h3>
            <pre className="bg-gray-50 border border-gray-200 rounded p-3 text-xs overflow-x-auto">
              {JSON.stringify(user.scope, null, 2)}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}