import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generateStatisticsReport = async (stats, period, year) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  
  let yPosition = margin;

  // Título del reporte
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Reporte de Estadísticas', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 20;

  // Información del período
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text(`Período: ${period.charAt(0).toUpperCase() + period.slice(1)}`, margin, yPosition);
  yPosition += 10;
  doc.text(`Año: ${year}`, margin, yPosition);
  yPosition += 10;
  doc.text(`Fecha de generación: ${new Date().toLocaleDateString('es-ES')}`, margin, yPosition);
  yPosition += 20;

  // Estadísticas generales
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Estadísticas Generales', margin, yPosition);
  yPosition += 15;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Total de Estudiantes: ${stats.totalStudents || 0}`, margin, yPosition);
  yPosition += 8;
  doc.text(`Total de Maestros: ${stats.totalTeachers || 0}`, margin, yPosition);
  yPosition += 8;
  doc.text(`Total de Padres: ${stats.totalParents || 0}`, margin, yPosition);
  yPosition += 8;
  doc.text(`Tasa de Asistencia: ${stats.attendanceRate || 0}%`, margin, yPosition);
  yPosition += 20;

  // Análisis
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Análisis', margin, yPosition);
  yPosition += 15;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  // Tendencia de asistencia
  const attendanceTrend = getAttendanceTrendText(stats.attendanceRate);
  const trendLines = doc.splitTextToSize(attendanceTrend, contentWidth);
  doc.text(trendLines, margin, yPosition);
  yPosition += (trendLines.length * 5) + 10;

  // Rendimiento
  const performanceText = getPerformanceText(stats);
  const performanceLines = doc.splitTextToSize(performanceText, contentWidth);
  doc.text(performanceLines, margin, yPosition);
  yPosition += (performanceLines.length * 5) + 10;

  // Demografía
  const demographicsText = getDemographicsText(stats);
  const demographicsLines = doc.splitTextToSize(demographicsText, contentWidth);
  doc.text(demographicsLines, margin, yPosition);
  yPosition += (demographicsLines.length * 5) + 10;

  // Recomendaciones
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Recomendaciones', margin, yPosition);
  yPosition += 15;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const recommendations = getRecommendations(stats);
  const recommendationLines = doc.splitTextToSize(recommendations, contentWidth);
  doc.text(recommendationLines, margin, yPosition);

  // Guardar el PDF
  const fileName = `estadisticas_${period}_${year}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};

const getAttendanceTrendText = (attendanceRate) => {
  if (attendanceRate >= 90) {
    return 'Tendencia de Asistencia: Excelente. El jardín mantiene altos estándares de asistencia.';
  } else if (attendanceRate >= 80) {
    return 'Tendencia de Asistencia: Buena. Hay espacio para mejorar la asistencia.';
  } else if (attendanceRate >= 70) {
    return 'Tendencia de Asistencia: Promedio. Se recomienda implementar estrategias de mejora.';
  } else {
    return 'Tendencia de Asistencia: Necesita mejorar. Revisar políticas y comunicación con padres.';
  }
};

const getPerformanceText = (stats) => {
  const totalPeople = (stats.totalStudents || 0) + (stats.totalTeachers || 0) + (stats.totalParents || 0);
  const studentRatio = totalPeople > 0 ? Math.round(((stats.totalStudents || 0) / totalPeople) * 100) : 0;
  const teacherRatio = totalPeople > 0 ? Math.round(((stats.totalTeachers || 0) / totalPeople) * 100) : 0;
  
  return `Rendimiento General: Los estudiantes representan el ${studentRatio}% de la comunidad educativa. Los maestros representan el ${teacherRatio}%. La tasa de asistencia actual es del ${stats.attendanceRate || 0}%.`;
};

const getDemographicsText = (stats) => {
  const students = stats.totalStudents || 0;
  const teachers = stats.totalTeachers || 0;
  const parents = stats.totalParents || 0;
  
  const teacherStudentRatio = students > 0 ? (teachers / students).toFixed(1) : 0;
  const parentStudentRatio = students > 0 ? (parents / students).toFixed(1) : 0;
  
  return `Demografía: Ratio maestro-estudiante: ${teacherStudentRatio}:1. Ratio padre-estudiante: ${parentStudentRatio}:1. Total de estudiantes matriculados: ${students}.`;
};

const getRecommendations = (stats) => {
  const recommendations = [];
  
  if ((stats.attendanceRate || 0) < 85) {
    recommendations.push('Implementar estrategias para mejorar la asistencia');
  }
  
  if ((stats.totalTeachers || 0) / (stats.totalStudents || 1) < 0.3) {
    recommendations.push('Considerar contratar más maestros para mejorar la atención individualizada');
  }
  
  if ((stats.totalParents || 0) / (stats.totalStudents || 1) < 1.5) {
    recommendations.push('Fomentar mayor participación de los padres en actividades escolares');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('El jardín está funcionando excelentemente. Mantener las buenas prácticas actuales.');
  }
  
  return recommendations.join('. ');
};

export const generateChartImage = async (chartRef) => {
  if (!chartRef.current) return null;
  
  try {
    const canvas = await html2canvas(chartRef.current, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true
    });
    
    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error generating chart image:', error);
    return null;
  }
}; 