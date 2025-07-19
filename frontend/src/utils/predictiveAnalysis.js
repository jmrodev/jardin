// Sistema de análisis predictivo para estadísticas
export class PredictiveAnalysis {
  constructor() {
    this.historicalData = [];
    this.predictionModels = {
      attendance: 'linear',
      enrollment: 'seasonal',
      staff: 'stable'
    };
  }

  // Agregar datos históricos
  addHistoricalData(data) {
    this.historicalData.push({
      ...data,
      timestamp: new Date().getTime()
    });
  }

  // Predecir asistencia futura
  predictAttendance(periods = 4) {
    if (this.historicalData.length < 3) {
      return this.generateDefaultPrediction(periods, 'attendance');
    }

    const attendanceData = this.historicalData
      .map(d => d.attendanceRate)
      .filter(rate => rate !== null && rate !== undefined);

    if (attendanceData.length < 3) {
      return this.generateDefaultPrediction(periods, 'attendance');
    }

    // Análisis de tendencia lineal simple
    const trend = this.calculateLinearTrend(attendanceData);
    const predictions = [];

    for (let i = 1; i <= periods; i++) {
      const predictedValue = Math.max(0, Math.min(100, 
        attendanceData[attendanceData.length - 1] + (trend * i)
      ));
      
      predictions.push({
        period: i,
        predicted: Math.round(predictedValue),
        confidence: this.calculateConfidence(attendanceData, trend),
        trend: trend > 0 ? 'increasing' : trend < 0 ? 'decreasing' : 'stable'
      });
    }

    return {
      type: 'attendance',
      predictions,
      trend: trend > 0 ? 'increasing' : trend < 0 ? 'decreasing' : 'stable',
      confidence: this.calculateConfidence(attendanceData, trend),
      recommendation: this.getAttendanceRecommendation(trend, predictions[0]?.predicted)
    };
  }

  // Predecir matrícula futura
  predictEnrollment(periods = 4) {
    if (this.historicalData.length < 3) {
      return this.generateDefaultPrediction(periods, 'enrollment');
    }

    const enrollmentData = this.historicalData
      .map(d => d.totalStudents)
      .filter(count => count !== null && count !== undefined);

    if (enrollmentData.length < 3) {
      return this.generateDefaultPrediction(periods, 'enrollment');
    }

    // Análisis estacional para matrícula
    const trend = this.calculateSeasonalTrend(enrollmentData);
    const predictions = [];

    for (let i = 1; i <= periods; i++) {
      const baseValue = enrollmentData[enrollmentData.length - 1];
      const seasonalFactor = this.getSeasonalFactor(i);
      const predictedValue = Math.max(0, 
        baseValue + (trend * i) + (seasonalFactor * baseValue * 0.1)
      );
      
      predictions.push({
        period: i,
        predicted: Math.round(predictedValue),
        confidence: this.calculateConfidence(enrollmentData, trend),
        trend: trend > 0 ? 'increasing' : trend < 0 ? 'decreasing' : 'stable'
      });
    }

    return {
      type: 'enrollment',
      predictions,
      trend: trend > 0 ? 'increasing' : trend < 0 ? 'decreasing' : 'stable',
      confidence: this.calculateConfidence(enrollmentData, trend),
      recommendation: this.getEnrollmentRecommendation(trend, predictions[0]?.predicted)
    };
  }

  // Predecir necesidades de personal
  predictStaffing(periods = 4) {
    const attendancePrediction = this.predictAttendance(periods);
    const enrollmentPrediction = this.predictEnrollment(periods);

    const staffingPredictions = [];

    for (let i = 0; i < periods; i++) {
      const predictedStudents = enrollmentPrediction.predictions[i]?.predicted || 30;
      const predictedAttendance = attendancePrediction.predictions[i]?.predicted || 80;
      
      // Calcular maestros necesarios basado en ratio recomendado
      const recommendedRatio = 0.3; // 1 maestro por cada 3.3 estudiantes
      const neededTeachers = Math.ceil(predictedStudents * recommendedRatio);
      
      // Ajustar basado en asistencia
      const adjustedTeachers = Math.ceil(neededTeachers * (predictedAttendance / 100));

      staffingPredictions.push({
        period: i + 1,
        predictedStudents,
        predictedAttendance,
        neededTeachers: adjustedTeachers,
        currentTeachers: 9, // Valor actual
        deficit: Math.max(0, adjustedTeachers - 9),
        surplus: Math.max(0, 9 - adjustedTeachers)
      });
    }

    return {
      type: 'staffing',
      predictions: staffingPredictions,
      recommendation: this.getStaffingRecommendation(staffingPredictions[0])
    };
  }

  // Calcular tendencia lineal
  calculateLinearTrend(data) {
    const n = data.length;
    const sumX = (n * (n + 1)) / 2;
    const sumY = data.reduce((sum, val) => sum + val, 0);
    const sumXY = data.reduce((sum, val, index) => sum + (val * (index + 1)), 0);
    const sumX2 = (n * (n + 1) * (2 * n + 1)) / 6;

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    return slope;
  }

  // Calcular tendencia estacional
  calculateSeasonalTrend(data) {
    // Simplificado: usar tendencia lineal con factor estacional
    return this.calculateLinearTrend(data) * 0.5;
  }

  // Calcular factor estacional
  getSeasonalFactor(period) {
    // Simular patrones estacionales (ej: más matrículas en enero)
    const seasonalPatterns = [0.1, -0.05, -0.1, 0.05, 0.15, 0.1, -0.05, -0.1, 0.05, 0.1, -0.05, -0.1];
    return seasonalPatterns[(period - 1) % 12];
  }

  // Calcular nivel de confianza
  calculateConfidence(data, trend) {
    const variance = this.calculateVariance(data);
    const confidence = Math.max(0.3, Math.min(0.95, 1 - (variance / 100)));
    return Math.round(confidence * 100);
  }

  // Calcular varianza
  calculateVariance(data) {
    const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
    const squaredDiffs = data.map(val => Math.pow(val - mean, 2));
    return squaredDiffs.reduce((sum, val) => sum + val, 0) / data.length;
  }

  // Generar predicción por defecto
  generateDefaultPrediction(periods, type) {
    const predictions = [];
    const baseValue = type === 'attendance' ? 80 : 30;

    for (let i = 1; i <= periods; i++) {
      predictions.push({
        period: i,
        predicted: baseValue,
        confidence: 50,
        trend: 'stable'
      });
    }

    return {
      type,
      predictions,
      trend: 'stable',
      confidence: 50,
      recommendation: 'Datos insuficientes para predicción precisa'
    };
  }

  // Recomendaciones basadas en predicciones
  getAttendanceRecommendation(trend, predictedValue) {
    if (trend > 0 && predictedValue >= 85) {
      return 'Excelente tendencia. Mantener las buenas prácticas actuales.';
    } else if (trend > 0 && predictedValue < 85) {
      return 'Tendencia positiva pero necesita mejorar. Implementar estrategias adicionales.';
    } else if (trend < 0) {
      return 'Tendencia negativa detectada. Revisar políticas y tomar medidas correctivas.';
    } else {
      return 'Tendencia estable. Considerar mejoras para optimizar la asistencia.';
    }
  }

  getEnrollmentRecommendation(trend, predictedValue) {
    if (trend > 0 && predictedValue > 30) {
      return 'Crecimiento esperado en matrícula. Preparar recursos adicionales.';
    } else if (trend < 0) {
      return 'Disminución esperada en matrícula. Revisar estrategias de retención.';
    } else {
      return 'Matrícula estable. Mantener estrategias de marketing y retención.';
    }
  }

  getStaffingRecommendation(prediction) {
    if (prediction.deficit > 0) {
      return `Se necesitarán ${prediction.deficit} maestros adicionales en el próximo período.`;
    } else if (prediction.surplus > 0) {
      return `Habrá ${prediction.surplus} maestros en exceso. Considerar redistribución.`;
    } else {
      return 'La plantilla actual es adecuada para las necesidades proyectadas.';
    }
  }

  // Análisis de riesgo
  analyzeRisk(predictions) {
    const risks = [];

    // Riesgo de baja asistencia
    if (predictions.attendance?.predictions[0]?.predicted < 75) {
      risks.push({
        type: 'attendance',
        level: 'high',
        description: 'Riesgo de asistencia crítica en el próximo período',
        impact: 'Afecta la calidad educativa y financiera',
        mitigation: 'Implementar programas de mejora de asistencia'
      });
    }

    // Riesgo de sobrepoblación
    if (predictions.enrollment?.predictions[0]?.predicted > 35) {
      risks.push({
        type: 'capacity',
        level: 'medium',
        description: 'Riesgo de sobrepoblación en aulas',
        impact: 'Puede afectar la calidad de la atención',
        mitigation: 'Evaluar necesidad de expansión o más personal'
      });
    }

    // Riesgo de escasez de personal
    if (predictions.staffing?.predictions[0]?.deficit > 2) {
      risks.push({
        type: 'staffing',
        level: 'high',
        description: 'Riesgo de escasez crítica de personal',
        impact: 'Afecta la calidad educativa',
        mitigation: 'Iniciar proceso de contratación inmediatamente'
      });
    }

    return risks;
  }

  // Generar reporte predictivo completo
  generatePredictiveReport(periods = 4) {
    const attendancePrediction = this.predictAttendance(periods);
    const enrollmentPrediction = this.predictEnrollment(periods);
    const staffingPrediction = this.predictStaffing(periods);
    const risks = this.analyzeRisk({
      attendance: attendancePrediction,
      enrollment: enrollmentPrediction,
      staffing: staffingPrediction
    });

    return {
      period: periods,
      generatedAt: new Date().toISOString(),
      predictions: {
        attendance: attendancePrediction,
        enrollment: enrollmentPrediction,
        staffing: staffingPrediction
      },
      risks,
      summary: {
        overallTrend: this.getOverallTrend([attendancePrediction, enrollmentPrediction]),
        criticalIssues: risks.filter(r => r.level === 'high').length,
        recommendations: this.generateOverallRecommendations(attendancePrediction, enrollmentPrediction, staffingPrediction)
      }
    };
  }

  getOverallTrend(predictions) {
    const trends = predictions.map(p => p.trend);
    const increasing = trends.filter(t => t === 'increasing').length;
    const decreasing = trends.filter(t => t === 'decreasing').length;

    if (increasing > decreasing) return 'positive';
    if (decreasing > increasing) return 'negative';
    return 'stable';
  }

  generateOverallRecommendations(attendance, enrollment, staffing) {
    const recommendations = [];

    if (attendance.trend === 'decreasing') {
      recommendations.push('Priorizar estrategias de mejora de asistencia');
    }

    if (enrollment.trend === 'increasing') {
      recommendations.push('Preparar infraestructura para crecimiento de matrícula');
    }

    if (staffing.predictions[0]?.deficit > 0) {
      recommendations.push('Iniciar proceso de contratación de personal');
    }

    if (recommendations.length === 0) {
      recommendations.push('Mantener las buenas prácticas actuales');
    }

    return recommendations;
  }
}

// Instancia global del análisis predictivo
export const predictiveAnalysis = new PredictiveAnalysis(); 