import React from 'react';
import CategoryMasterForm from './CategoryMasterForm';

export default function JenisKelaminForm(props) {
    return <CategoryMasterForm {...props} nameLabel="Nama Jenis Kelamin" submitLabel="Jenis Kelamin" />;
}
