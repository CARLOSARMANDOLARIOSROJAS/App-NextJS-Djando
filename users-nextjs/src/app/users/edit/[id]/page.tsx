'use client';
import { EditForm } from '@/components/EditForm';
import { ProtectedRoute } from '@/components/ProtectedRoute';

const EditUserPage = () => {
  return (
    <ProtectedRoute>
      <EditForm />
    </ProtectedRoute>
  );
};

export default EditUserPage;
