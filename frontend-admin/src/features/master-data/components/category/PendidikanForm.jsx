import React from 'react';
import CategoryMasterForm from './CategoryMasterForm';

export default function PendidikanForm(props) {
    return <CategoryMasterForm {...props} nameLabel="Nama Pendidikan" submitLabel="Pendidikan" />;
}
