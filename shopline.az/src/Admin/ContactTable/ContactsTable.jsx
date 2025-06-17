import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ConfirmModal from "../ConfirmModal";

function ContactsTable() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5005/contacts")
      .then((res) => res.json())
      .then((data) => {
        setContacts(data);
        setLoading(false);
        toast.success("Əlaqə mesajları uğurla yükləndi");
      })
      .catch((err) => {
        console.error("Əlaqə mesajlarını gətirərkən xəta:", err);
        toast.error("Əlaqə mesajları yüklənərkən xəta baş verdi");
        setLoading(false);
      });
  }, []);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    fetch(`http://localhost:5005/contacts/${deleteId}`, {
      method: "DELETE",
    })
      .then(() => {
        setContacts((prev) => prev.filter((contact) => contact.id !== deleteId));
        toast.success("Əlaqə mesajı uğurla silindi");
      })
      .catch((err) => {
        console.error("Silinərkən xəta:", err);
        toast.error("Əlaqə mesajı silinərkən xəta baş verdi");
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

  const filteredContacts = contacts.filter((contact) => {
    const term = searchTerm.toLowerCase();
    return (
      contact.fullName?.toLowerCase().includes(term) ||
      contact.email?.toLowerCase().includes(term) ||
      contact.subject?.toLowerCase().includes(term) ||
      contact.id?.toString().includes(term)
    );
  });

  if (loading) return <p>Yüklənir...</p>;
  if (filteredContacts.length === 0) return <p>Axtarış üzrə heç bir əlaqə mesajı tapılmadı.</p>;

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Ad, Email, Mövzu və ya ID üzrə axtar"
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
              <th className="px-4 py-2">Ad Soyad</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Mövzu</th>
              <th className="px-4 py-2">Mesaj</th>
              <th className="px-4 py-2">Əməliyyat</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 dark:text-gray-300">
            {filteredContacts.map((contact) => (
              <tr
                key={contact.id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-2">{contact.id}</td>
                <td className="px-4 py-2">{contact.fullName}</td>
                <td className="px-4 py-2">{contact.email}</td>
                <td className="px-4 py-2">{contact.subject}</td>
                <td className="px-4 py-2 max-w-xs truncate">{contact.message}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDeleteClick(contact.id)}
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
        message="Əlaqə mesajını silmək istədiyinizə əminsiniz?"
      />
    </div>
  );
}

export default ContactsTable;