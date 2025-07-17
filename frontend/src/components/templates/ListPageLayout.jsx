import React from 'react';
import PropTypes from 'prop-types';
import '@/styles/templates/list-page-layout.css';

const ListPageLayout = ({ filters, children }) => {
  return (
    <div className="list-page-layout">
      <aside className="list-page-layout__filters">
        {filters}
      </aside>
      <main className="list-page-layout__content">
        {children}
      </main>
    </div>
  );
};

ListPageLayout.propTypes = {
  filters: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

export default ListPageLayout; 