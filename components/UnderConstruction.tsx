'use client';

export default function UnderConstruction({ message }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none" style={{ background: 'rgba(0,0,0,0.0)' }}>
      <div className="pointer-events-auto bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl shadow-2xl transform -rotate-2 border-4 border-yellow-600">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🚧</span>
          <div>
            <p className="font-bold text-xl">Under Construction</p>
            <p className="text-sm text-gray-700">{message || 'This page is being built. Check back soon!'}</p>
          </div>
          <span className="text-3xl">🚧</span>
        </div>
      </div>
    </div>
  );
}
