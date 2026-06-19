import React from 'react';
import CategoryMasterForm from './CategoryMasterForm';

export default function SumberDanaForm(props) {
    return <CategoryMasterForm {...props} nameLabel="Nama Sumber Dana" submitLabel="Sumber Dana" />;
}
