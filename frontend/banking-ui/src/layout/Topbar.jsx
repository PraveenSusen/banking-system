export default function Topbar() {

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-8">

      <h2 className="text-lg font-semibold text-slate-700">
        Banking Dashboard
      </h2>

      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
      >
        Logout
      </button>

    </div>
  );
}