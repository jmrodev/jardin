import React, { useEffect, useState } from 'react';
import { getParents, deleteParent } from '../../../services/api/parents';
import EntityGridTemplate from '../../templates/EntityGridTemplate';
import { useTranslation } from 'react-i18next';

const ParentsPage = () => {
  const [parents, setParents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    getParents().then(setParents);
  }, []);

  const handleEdit = (parent) => {
    // Aquí lógica para abrir modal de edición
    alert(t('edit') + ': ' + parent.name);
  };

  const handleDelete = async (parent) => {
    try {
      await deleteParent(parent.id);
      setParents(parents.filter(p => p.id !== parent.id));
    } catch (error) {
      alert(t('deleteError'));
    }
  };

  return (
    <EntityGridTemplate
      title={t('parentsManagement')}
      entities={parents}
      fields={[
        { key: 'name', label: t('name') },
        { key: 'birthDate', label: t('birthDate'), isDate: true }
      ]}
      onAdd={() => setShowForm((v) => !v)}
      renderForm={showForm ? <div>{t('parentFormPlaceholder')}</div> : null}
      entityLabel={t('parentDetails')}
      actions={[
        {
          label: t('edit'),
          icon: 'edit',
          onClick: handleEdit
        },
        {
          label: t('delete'),
          icon: 'delete',
          color: 'danger',
          onClick: handleDelete
        }
      ]}
    />
  );
};

export default ParentsPage; 