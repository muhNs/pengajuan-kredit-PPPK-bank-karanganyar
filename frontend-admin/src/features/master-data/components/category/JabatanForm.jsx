import React from 'react';
import CategoryMasterForm from './CategoryMasterForm';

export default function JabatanForm(props) {
    return <CategoryMasterForm {...props} nameLabel="Nama Jabatan" submitLabel="Jabatan" />;
}
