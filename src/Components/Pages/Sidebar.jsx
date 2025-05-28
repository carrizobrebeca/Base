export default function Sidebar({ position = 'left', children }) {
  const borderClass = position === 'left' ? 'border-r' : 'border-l';
  return (
    <aside className={`hidden lg:flex w-64 flex-col bg-gray-200 p-4 ${borderClass}`}>
      {children}
    </aside>
  );
}
