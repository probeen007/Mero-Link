export default function SectionBox({ children, className = "" }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
