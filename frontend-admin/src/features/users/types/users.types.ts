export type Role = 'ADMIN' | 'CS';

export interface User {
  id: number;
  username: string; // <-- Ubah dari name ke username
  email: string;
  role: Role;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserFormData {
  username: string; // <-- Ubah dari name ke username
  email: string;
  password?: string;
  role: Role;
}

export interface UserFormProps {
  isEditing: boolean;
  isLoading: boolean;
  formData: UserFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export interface UserTableProps {
  users: User[];
  isLoading?: boolean;
  onAdd: () => void;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}