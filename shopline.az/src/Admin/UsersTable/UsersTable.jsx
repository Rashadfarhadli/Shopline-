import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ConfirmModal from "../ConfirmModal";

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5005/users")
      .then((res) => res.json())
      .then((data) => {
        const modifiedUsers = data.map((user) => ({
          ...user,
          fakePassword: Math.random().toString(36).slice(2, 10),
        }));
        setUsers(modifiedUsers);
        setLoading(false);
        toast.success("İstifadəçilər uğurla yükləndi");
      })
      .catch((err) => {
        console.error("Userləri gətirərkən xəta:", err);
        toast.error("İstifadəçilər yüklənərkən xəta baş verdi");
        setLoading(false);
      });
  }, []);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    fetch(`http://localhost:5005/users/${deleteId}`, {
      method: "DELETE",
    })
      .then(() => {
        setUsers((prev) => prev.filter((user) => user.id !== deleteId));
        toast.success("İstifadəçi uğurla silindi");
      })
      .catch((err) => {
        console.error("Silinərkən xəta:", err);
        toast.error("İstifadəçi silinərkən xəta baş verdi");
      })
      .finally(() => {
        setConfirmOpen(false);
        setDeleteId(null);
      });
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setDeleteId(null);
  };

  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.email.toLowerCase().includes(term) ||
      user.id.toString().includes(term)
    );
  });

  if (loading) return <p>Yüklənir...</p>;
  if (filteredUsers.length === 0) return <p>Axtarış üzrə heç bir istifadəçi tapılmadı.</p>;

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="ID və ya Email üzrə axtar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Ad</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Şifrə (Fake)</th>
              <th className="px-4 py-2">Əməliyyat</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 dark:text-gray-300">
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 font-mono">{user.fakePassword}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDeleteClick(user.id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={confirmOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        message="İstifadəçini silmək istədiyinizə əminsiniz?"
      />
    </div>
  );
}

export default UsersTable;