import React, { useEffect, useState } from 'react';
import { getTeachers } from '../../../services/api/teachers';
import EntityGridTemplate from '../../templates/EntityGridTemplate';
import { useTranslation } from 'react-i18next';

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    getTeachers().then(setTeachers);
  }, []);

  return (
    <EntityGridTemplate
      title={t('teachersManagement')}
      entities={teachers}
      fields={[
        { key: 'name', label: t('name') },
        { key: 'birthDate', label: t('birthDate'), isDate: true }
      ]}
      onAdd={() => setShowForm((v) => !v)}
      renderForm={showForm ? <div>{t('teacherFormPlaceholder')}</div> : null}
      entityLabel={t('teacherDetails')}
    />
  );
};

export default TeachersPage; 