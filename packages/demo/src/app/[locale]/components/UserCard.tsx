'use client';

export type User = {
  id: number;
  name: string;
  email: string;
  age?: number;
};

type UserCardProps = {
  user: User;
  onSelect: (id: number) => void;
  isActive: boolean;
};

export const UserCard = ({ user, onSelect, isActive }: UserCardProps) => {
  const handleClick = () => {
    onSelect(user.id);
  };

  return (
    <div
      onClick={handleClick}
      className={`border p-4 rounded-lg cursor-pointer ${isActive ? 'bg-blue-50' : ''}`}
    >
      <h3 className="font-bold">{user.name}</h3>
      <p className="text-gray-600">{user.email}</p>
      <p>Возраст: {user.age ?? 'не указан'}</p>
    </div>
  );
};
