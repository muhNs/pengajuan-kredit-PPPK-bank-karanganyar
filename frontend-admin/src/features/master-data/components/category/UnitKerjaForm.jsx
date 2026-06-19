import React from 'react';
import CategoryMasterForm from './CategoryMasterForm';

export default function UnitKerjaForm(props) {
    return <CategoryMasterForm {...props} nameLabel="Nama Unit Kerja" submitLabel="Unit Kerja" />;
}
