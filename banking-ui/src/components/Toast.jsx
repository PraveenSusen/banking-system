export default function Toast({ message, type }) {
  if (!message) return null;

  const baseStyle =
    "fixed top-6 right-6 px-6 py-3 rounded-lg shadow-lg text-white";

  const color =
    type === "success"
      ? "bg-green-600"
      : "bg-red-600";

  return (
    <div className={`${baseStyle} ${color}`}>
      {message}
    </div>
  );
}