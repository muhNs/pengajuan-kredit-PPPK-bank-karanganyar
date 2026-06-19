import React from 'react';
import CategoryMasterForm from './CategoryMasterForm';

export default function StatusPernikahanForm(props) {
    return <CategoryMasterForm {...props} nameLabel="Nama Status Pernikahan" submitLabel="Status Pernikahan" />;
}
