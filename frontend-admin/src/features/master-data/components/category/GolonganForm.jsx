import React from 'react';
import CategoryMasterForm from './CategoryMasterForm';

export default function GolonganForm(props) {
    return <CategoryMasterForm {...props} nameLabel="Nama Golongan" submitLabel="Golongan" />;
}
