import React, { useEffect, useState } from 'react';
import { getParents } from '../../../services/api/parents';
import EntityGridTemplate from '../../templates/EntityGridTemplate';
import { useTranslation } from 'react-i18next';

const ParentsPage = () => {
  const [parents, setParents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    getParents().then(setParents);
  }, []);

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
    />
  );
};

export default ParentsPage; 