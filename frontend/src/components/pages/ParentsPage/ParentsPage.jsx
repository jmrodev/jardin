import React, { useEffect, useState } from 'react';
import { getParents, deleteParent } from '../../../services/api/parents';
import EntityGridTemplate from '../../templates/EntityGridTemplate';
import { useTranslation } from 'react-i18next';
import DetailModal from '../../atoms/DetailModal';
import ParentForm from './ParentForm';
import { updateParent } from '../../../services/api/parents';

const ParentsPage = () => {
  const [parents, setParents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    getParents().then(setParents);
  }, []);

  const handleEdit = (parent) => {
    setEditData(parent);
    setEditModalOpen(true);
  };

  const handleEditSave = async (parentData) => {
    try {
      await updateParent(parentData);
      setEditModalOpen(false);
      setEditData(null);
      getParents().then(setParents);
      alert(t('parentUpdated'));
    } catch (error) {
      alert(t('editParentError'));
    }
  };

  const handleEditCancel = () => {
    setEditModalOpen(false);
    setEditData(null);
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
      renderForm={showForm ? <ParentForm onSubmit={() => {}} onCancel={() => setShowForm(false)} /> : null}
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
    >
      <DetailModal open={editModalOpen} onClose={handleEditCancel}>
        <ParentForm initialData={editData} onSubmit={handleEditSave} onCancel={handleEditCancel} />
      </DetailModal>
    </EntityGridTemplate>
  );
};

export default ParentsPage; 