import React from 'react';
import { useTranslation } from 'react-i18next';
import ActionButton from '../atoms/ActionButton';

export default function StatisticsActions({ 
  onExport, 
  onTogglePredictions, 
  exporting, 
  showPredictions 
}) {
  const { t } = useTranslation();

  return (
    <div className="statistics-actions">
      <ActionButton
        icon="Download"
        label={exporting ? t('statistics.exporting') : t('statistics.exportReport')}
        onClick={onExport}
        disabled={exporting}
        loading={exporting}
        variant="export"
      />
      
      <ActionButton
        icon="TrendingUp"
        label={showPredictions ? t('statistics.hidePredictions') : t('statistics.showPredictions')}
        onClick={onTogglePredictions}
        variant="prediction"
      />
    </div>
  );
} 