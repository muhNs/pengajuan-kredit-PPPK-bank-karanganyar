import React from 'react';
import CategoryMasterForm from './CategoryMasterForm';

export default function InstansiForm(props) {
    return <CategoryMasterForm {...props} nameLabel="Nama Instansi" submitLabel="Instansi" />;
}
