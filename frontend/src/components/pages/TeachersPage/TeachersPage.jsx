import React, { useEffect, useState } from 'react';
import { getTeachers, createTeacher } from '../../../services/api/teachers';
import styles from './TeachersPage.module.css';

const TeachersPage = () => {
  return (
    <div className={styles.container}>
      <h1>Teachers Management</h1>
      <p>This page will contain teacher management functionality.</p>
    </div>
  );
};

export default TeachersPage; 