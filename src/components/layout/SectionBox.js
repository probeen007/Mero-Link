export default function SectionBox({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-xl border border-blue-100 shadow-sm p-3 sm:p-4 md:p-5 ${className}`}>
      {children}
    </div>
  );
}
