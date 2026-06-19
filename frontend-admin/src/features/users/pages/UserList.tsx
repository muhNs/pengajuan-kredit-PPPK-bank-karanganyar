import { useState } from 'react';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import { useUsers } from '../hooks/useUsers';
import type { User, UserFormData } from '../types/users.types';

export default function UsersList() {
  const { users, isLoading, isSubmitting, createUser, updateUser, deleteUser } = useUsers();
  
  const [view, setView] = useState<'table' | 'form'>('table');
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState<UserFormData>({
    username: '', // <-- Ubah name ke username
    email: '',
    password: '',
    role: 'ADMIN',
  });

  const handleAddUser = () => {
    setEditingId(null);
    setFormData({ username: '', email: '', password: '', role: 'ADMIN' });
    setView('form');
  };

  const handleEditUser = (user: User) => {
    setEditingId(user.id);
    setFormData({ 
      username: user.username, // <-- Ubah name ke username
      email: user.email, 
      password: '',
      role: user.role 
    });
    setView('form');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let isSuccess = false;
    
    if (editingId) {
      isSuccess = await updateUser(editingId, formData);
    } else {
      isSuccess = await createUser(formData);
    }

    if (isSuccess) setView('table');
  };

  if (isLoading && users.length === 0) {
    return <div className="p-6 text-center text-gray-500">Memuat data user...</div>;
  }

  return (
    <div className="p-4 md:p-6 bg-[#f4f7fb] min-h-screen">
      {view === 'table' ? (
        <UserTable 
          users={users} 
          onAdd={handleAddUser} 
          onEdit={handleEditUser} 
          onDelete={deleteUser}
        />
      ) : (
        <div className="flex items-center justify-center pt-8">
          <UserForm
            isEditing={!!editingId}
            isLoading={isSubmitting} 
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onBack={() => setView('table')}
          />
        </div>
      )}
    </div>
  );
}