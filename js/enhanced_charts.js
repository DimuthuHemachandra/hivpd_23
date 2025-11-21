// ===================================
// HIVPD_23 Research Project - Enhanced Interactive Charts
// ===================================

(function() {
  'use strict';

  // ===================================
  // Chart Configuration
  // ===================================

  const chartColors = {
    primary: '#0066cc',
    secondary: '#00a896',
    accent: '#f77f00',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    purple: '#8b5cf6',
    pink: '#ec4899',
    teal: '#14b8a6',
    gray: '#6b7280',
    hiv: '#ef4444',      // Red for HIV
    pd: '#8b5cf6',       // Purple for PD
    controls: '#10b981'  // Green for Controls
  };

  const chartPalette = [
    chartColors.primary,
    chartColors.secondary,
    chartColors.accent,
    chartColors.success,
    chartColors.info,
    chartColors.purple,
    chartColors.pink,
    chartColors.teal
  ];

  // Common chart options
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          padding: 15,
          font: {
            family: "'Inter', sans-serif",
            size: 12
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          family: "'Inter', sans-serif"
        },
        bodyFont: {
          size: 13,
          family: "'Inter', sans-serif"
        }
      }
    }
  };

  // ===================================
  // Chart Instances (global)
  // ===================================

  let diagnosisChart = null;
  let genderByDiagnosisChart = null;
  let ageByDiagnosisChart = null;
  let completionChart = null;
  let upcomingVisitsChart = null;
  let enhancedTimelineChart = null;

  // Store data globally for expandable sections
  let enhancedData = null;
  let timelineData = null;

  // ===================================
  // Load Data and Initialize Charts
  // ===================================

  async function loadDataAndInitCharts() {
    try {
      // Load enhanced demographics data
      const demoResponse = await fetch('data/enhanced_demographics.json');
      enhancedData = await demoResponse.json();

      // Load enhanced recruitment data
      const recruitResponse = await fetch('data/enhanced_recruitment.json');
      timelineData = await recruitResponse.json();

      // Initialize summary view charts
      initSummaryView();

      // Setup expandable sections
      setupExpandableSections();

      console.log('Enhanced charts initialized successfully');
    } catch (error) {
      console.error('Error loading enhanced chart data:', error);
      // Fallback to original data
      loadOriginalData();
    }
  }

  async function loadOriginalData() {
    try {
      const demoResponse = await fetch('data/demographics.json');
      const demoData = await demoResponse.json();
      const recruitResponse = await fetch('data/recruitment.json');
      const recruitData = await recruitResponse.json();

      // Initialize basic charts as fallback
      console.log('Loaded original data as fallback');
    } catch (error) {
      console.error('Error loading original data:', error);
    }
  }

  // ===================================
  // Summary View - At a Glance
  // ===================================

  function initSummaryView() {
    // Update summary cards
    updateSummaryCards();

    // Initialize diagnosis distribution chart
    initDiagnosisChart();

    // Initialize completion overview chart
    initCompletionOverviewChart();

    // Initialize upcoming visits chart
    initUpcomingVisitsOverviewChart();
  }

  function updateSummaryCards() {
    if (!enhancedData) return;

    // Update diagnosis counts
    const hivCount = document.getElementById('hivCount');
    const pdCount = document.getElementById('pdCount');
    const controlsCount = document.getElementById('controlsCount');

    if (hivCount) hivCount.textContent = enhancedData.diagnosisGroups.HIV.total;
    if (pdCount) pdCount.textContent = enhancedData.diagnosisGroups.PD.total;
    if (controlsCount) controlsCount.textContent = enhancedData.diagnosisGroups.Controls.total;

    // Update completion stats
    const completionRate = document.getElementById('completionRate');
    if (completionRate) {
      completionRate.textContent = `${enhancedData.overallCompletion.bothPercentage}%`;
    }
  }

  // ===================================
  // Diagnosis Groups Chart
  // ===================================

  function initDiagnosisChart() {
    const ctx = document.getElementById('diagnosisChart');
    if (!ctx || !enhancedData) return;

    const data = enhancedData.diagnosisGroups;
    const labels = ['HIV', 'PD', 'Controls'];
    const values = [data.HIV.total, data.PD.total, data.Controls.total];
    const percentages = [data.HIV.percentage, data.PD.percentage, data.Controls.percentage];

    if (diagnosisChart) {
      diagnosisChart.destroy();
    }

    diagnosisChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: 'Diagnosis Distribution',
          data: values,
          backgroundColor: [
            chartColors.hiv,
            chartColors.pd,
            chartColors.controls
          ],
          borderColor: '#ffffff',
          borderWidth: 3,
          hoverOffset: 15
        }]
      },
      options: {
        ...commonOptions,
        cutout: '60%',
        plugins: {
          ...commonOptions.plugins,
          tooltip: {
            ...commonOptions.plugins.tooltip,
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const count = context.parsed;
                const percentage = percentages[context.dataIndex].toFixed(1);
                return `${label}: ${count} participants (${percentage}%)`;
              }
            }
          }
        },
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const index = elements[0].index;
            const diagnosis = labels[index];
            expandDiagnosisSection(diagnosis);
          }
        }
      }
    });
  }

  // ===================================
  // Gender by Diagnosis Chart
  // ===================================

  function initGenderByDiagnosisChart(diagnosis) {
    const ctx = document.getElementById(`${diagnosis.toLowerCase()}GenderChart`);
    if (!ctx || !enhancedData) return;

    const data = enhancedData.diagnosisGroups[diagnosis].genderDistribution;
    const labels = Object.keys(data);
    const values = labels.map(key => data[key].count);
    const percentages = labels.map(key => data[key].percentage);

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Gender Distribution',
          data: values,
          backgroundColor: [
            chartColors.primary,
            chartColors.secondary,
            chartColors.accent
          ],
          borderRadius: 8,
          borderWidth: 2
        }]
      },
      options: {
        ...commonOptions,
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              precision: 0,
              font: { family: "'Inter', sans-serif" }
            }
          },
          y: {
            ticks: {
              font: { family: "'Inter', sans-serif" }
            }
          }
        },
        plugins: {
          ...commonOptions.plugins,
          legend: { display: false },
          tooltip: {
            ...commonOptions.plugins.tooltip,
            callbacks: {
              label: function(context) {
                const count = context.parsed.x;
                const percentage = percentages[context.dataIndex].toFixed(1);
                return `Count: ${count} (${percentage}%)`;
              }
            }
          }
        }
      }
    });

    return chart;
  }

  // ===================================
  // Age Distribution by Diagnosis
  // ===================================

  function initAgeByDiagnosisChart() {
    const ctx = document.getElementById('ageByDiagnosisChart');
    if (!ctx || !enhancedData) return;

    const ageRanges = ['18-30', '31-40', '41-50', '51-60', '60+'];
    const diagnoses = ['HIV', 'PD', 'Controls'];

    const datasets = diagnoses.map((diagnosis, index) => {
      const data = enhancedData.diagnosisGroups[diagnosis].ageGroups;
      const values = ageRanges.map(range => data[range] || 0);

      return {
        label: diagnosis,
        data: values,
        backgroundColor: [chartColors.hiv, chartColors.pd, chartColors.controls][index],
        borderColor: '#ffffff',
        borderWidth: 2,
        borderRadius: 6
      };
    });

    if (ageByDiagnosisChart) {
      ageByDiagnosisChart.destroy();
    }

    ageByDiagnosisChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ageRanges,
        datasets: datasets
      },
      options: {
        ...commonOptions,
        scales: {
          x: {
            ticks: { font: { family: "'Inter', sans-serif" } },
            grid: { display: false }
          },
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
              font: { family: "'Inter', sans-serif" }
            },
            grid: { color: 'rgba(0, 0, 0, 0.05)' }
          }
        },
        plugins: {
          ...commonOptions.plugins,
          legend: {
            ...commonOptions.plugins.legend,
            position: 'top'
          },
          tooltip: {
            ...commonOptions.plugins.tooltip,
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${context.parsed.y} participants`;
              }
            }
          }
        }
      }
    });
  }

  // ===================================
  // Completion Status Chart
  // ===================================

  function initCompletionOverviewChart() {
    const ctx = document.getElementById('completionChart');
    if (!ctx || !enhancedData) return;

    const completion = enhancedData.overallCompletion;

    if (completionChart) {
      completionChart.destroy();
    }

    completionChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Cognitive Testing', 'Scans', 'Both Complete', 'Pending'],
        datasets: [{
          label: 'Participants',
          data: [
            completion.cognitiveTestingComplete,
            completion.scansComplete,
            completion.bothComplete,
            completion.totalPending
          ],
          backgroundColor: [
            chartColors.success,
            chartColors.info,
            chartColors.purple,
            chartColors.warning
          ],
          borderRadius: 8,
          borderWidth: 2
        }]
      },
      options: {
        ...commonOptions,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
              font: { family: "'Inter', sans-serif" }
            },
            grid: { color: 'rgba(0, 0, 0, 0.05)' }
          },
          x: {
            ticks: { font: { family: "'Inter', sans-serif" } },
            grid: { display: false }
          }
        },
        plugins: {
          ...commonOptions.plugins,
          legend: { display: false },
          tooltip: {
            ...commonOptions.plugins.tooltip,
            callbacks: {
              label: function(context) {
                const total = enhancedData.totalParticipants;
                const value = context.parsed.y;
                const percentage = ((value / total) * 100).toFixed(1);
                return `Count: ${value} (${percentage}%)`;
              }
            }
          }
        },
        onClick: () => {
          expandCompletionSection();
        }
      }
    });
  }

  // ===================================
  // Upcoming Visits Chart
  // ===================================

  function initUpcomingVisitsOverviewChart() {
    const ctx = document.getElementById('upcomingVisitsChart');
    if (!ctx || !enhancedData) return;

    const visits = enhancedData.overallUpcomingVisits;

    if (upcomingVisitsChart) {
      upcomingVisitsChart.destroy();
    }

    upcomingVisitsChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Next Week', 'Next Month', 'Next Quarter'],
        datasets: [{
          label: 'Upcoming Visits',
          data: [visits.nextWeek, visits.nextMonth, visits.nextQuarter],
          backgroundColor: [
            chartColors.error,
            chartColors.warning,
            chartColors.info
          ],
          borderColor: '#ffffff',
          borderWidth: 3,
          hoverOffset: 10
        }]
      },
      options: {
        ...commonOptions,
        cutout: '50%',
        plugins: {
          ...commonOptions.plugins,
          tooltip: {
            ...commonOptions.plugins.tooltip,
            callbacks: {
              label: function(context) {
                return `${context.label}: ${context.parsed} visits`;
              }
            }
          }
        },
        onClick: () => {
          expandUpcomingVisitsSection();
        }
      }
    });
  }

  // ===================================
  // Enhanced Timeline Chart
  // ===================================

  function initEnhancedTimelineChart() {
    const ctx = document.getElementById('enhancedTimelineChart');
    if (!ctx || !timelineData) return;

    const labels = timelineData.timeline.map(item => item.month);
    const cumulativeValues = timelineData.timeline.map(item => item.cumulative);

    if (enhancedTimelineChart) {
      enhancedTimelineChart.destroy();
    }

    enhancedTimelineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Cumulative Total',
            data: cumulativeValues,
            backgroundColor: 'rgba(0, 102, 204, 0.1)',
            borderColor: chartColors.primary,
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBackgroundColor: chartColors.primary,
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2
          }
        ]
      },
      options: {
        ...commonOptions,
        interaction: {
          mode: 'index',
          intersect: false
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
              font: { family: "'Inter', sans-serif" }
            },
            grid: { color: 'rgba(0, 0, 0, 0.05)' }
          },
          x: {
            ticks: {
              font: { family: "'Inter', sans-serif" },
              maxRotation: 45,
              minRotation: 45
            },
            grid: { display: false }
          }
        },
        plugins: {
          ...commonOptions.plugins,
          legend: {
            ...commonOptions.plugins.legend,
            position: 'top'
          },
          tooltip: {
            ...commonOptions.plugins.tooltip,
            callbacks: {
              title: function(context) {
                return context[0].label;
              },
              afterTitle: function(context) {
                const index = context[0].dataIndex;
                const monthData = timelineData.timeline[index];
                return `\nNew Recruits: ${monthData.participants}`;
              },
              label: function(context) {
                const index = context.dataIndex;
                const monthData = timelineData.timeline[index];
                const lines = [
                  `Total: ${monthData.cumulative} participants`,
                  '',
                  'By Diagnosis:',
                  `  HIV: ${monthData.byDiagnosis.HIV}`,
                  `  PD: ${monthData.byDiagnosis.PD}`,
                  `  Controls: ${monthData.byDiagnosis.Controls}`,
                  '',
                  'Completed This Month:',
                  `  Cognitive Tests: ${monthData.cognitiveTestsCompleted}`,
                  `  Scans: ${monthData.scansCompleted}`
                ];
                return lines;
              }
            }
          }
        }
      }
    });
  }

  // ===================================
  // Expandable Sections
  // ===================================

  function setupExpandableSections() {
    // Setup diagnosis section expanders
    const diagnosisButtons = document.querySelectorAll('.diagnosis-expand-btn');
    diagnosisButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const diagnosis = this.dataset.diagnosis;
        expandDiagnosisSection(diagnosis);
      });
    });

    // Setup completion section expander
    const completionBtn = document.getElementById('expandCompletionBtn');
    if (completionBtn) {
      completionBtn.addEventListener('click', expandCompletionSection);
    }

    // Setup upcoming visits expander
    const visitsBtn = document.getElementById('expandVisitsBtn');
    if (visitsBtn) {
      visitsBtn.addEventListener('click', expandUpcomingVisitsSection);
    }
  }

  function expandDiagnosisSection(diagnosis) {
    const section = document.getElementById(`${diagnosis.toLowerCase()}Detail`);
    if (!section) return;

    // Toggle section visibility
    section.classList.toggle('expanded');

    // Initialize charts if expanding
    if (section.classList.contains('expanded')) {
      setTimeout(() => {
        initGenderByDiagnosisChart(diagnosis);
        populateDiagnosisDetails(diagnosis);
      }, 300);
    }
  }

  function populateDiagnosisDetails(diagnosis) {
    const data = enhancedData.diagnosisGroups[diagnosis];

    // Update completion stats
    const completionEl = document.getElementById(`${diagnosis.toLowerCase()}Completion`);
    if (completionEl) {
      completionEl.innerHTML = `
        <p><strong>Cognitive Testing:</strong> ${data.completionStatus.cognitiveTestingComplete} completed</p>
        <p><strong>Scans:</strong> ${data.completionStatus.scansComplete} completed</p>
        <p><strong>Both Complete:</strong> ${data.completionStatus.bothComplete}</p>
        <p><strong>Pending:</strong> ${data.completionStatus.pending}</p>
      `;
    }

    // Update upcoming visits
    const visitsEl = document.getElementById(`${diagnosis.toLowerCase()}Visits`);
    if (visitsEl) {
      visitsEl.innerHTML = `
        <p><strong>Next Week:</strong> ${data.upcomingVisits.nextWeek} visits</p>
        <p><strong>Next Month:</strong> ${data.upcomingVisits.nextMonth} visits</p>
        <p><strong>Next Quarter:</strong> ${data.upcomingVisits.nextQuarter} visits</p>
      `;
    }
  }

  function expandCompletionSection() {
    const section = document.getElementById('completionDetail');
    if (!section) return;

    section.classList.toggle('expanded');

    if (section.classList.contains('expanded')) {
      setTimeout(() => {
        initCompletionByDiagnosisChart();
      }, 300);
    }
  }

  function initCompletionByDiagnosisChart() {
    const ctx = document.getElementById('completionByDiagnosisChart');
    if (!ctx || !enhancedData) return;

    const diagnoses = ['HIV', 'PD', 'Controls'];
    const cognitiveData = diagnoses.map(d =>
      enhancedData.diagnosisGroups[d].completionStatus.cognitiveTestingComplete
    );
    const scansData = diagnoses.map(d =>
      enhancedData.diagnosisGroups[d].completionStatus.scansComplete
    );
    const bothData = diagnoses.map(d =>
      enhancedData.diagnosisGroups[d].completionStatus.bothComplete
    );

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: diagnoses,
        datasets: [
          {
            label: 'Cognitive Testing',
            data: cognitiveData,
            backgroundColor: chartColors.success,
            borderRadius: 6
          },
          {
            label: 'Scans',
            data: scansData,
            backgroundColor: chartColors.info,
            borderRadius: 6
          },
          {
            label: 'Both Complete',
            data: bothData,
            backgroundColor: chartColors.purple,
            borderRadius: 6
          }
        ]
      },
      options: {
        ...commonOptions,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { precision: 0 }
          }
        },
        plugins: {
          ...commonOptions.plugins,
          legend: { position: 'top' }
        }
      }
    });
  }

  function expandUpcomingVisitsSection() {
    const section = document.getElementById('upcomingVisitsDetail');
    if (!section) return;

    section.classList.toggle('expanded');

    if (section.classList.contains('expanded')) {
      setTimeout(() => {
        initUpcomingVisitsByDiagnosisChart();
      }, 300);
    }
  }

  function initUpcomingVisitsByDiagnosisChart() {
    const ctx = document.getElementById('upcomingVisitsByDiagnosisChart');
    if (!ctx || !enhancedData) return;

    const diagnoses = ['HIV', 'PD', 'Controls'];
    const nextWeekData = diagnoses.map(d =>
      enhancedData.diagnosisGroups[d].upcomingVisits.nextWeek
    );
    const nextMonthData = diagnoses.map(d =>
      enhancedData.diagnosisGroups[d].upcomingVisits.nextMonth
    );
    const nextQuarterData = diagnoses.map(d =>
      enhancedData.diagnosisGroups[d].upcomingVisits.nextQuarter
    );

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: diagnoses,
        datasets: [
          {
            label: 'Next Week',
            data: nextWeekData,
            backgroundColor: chartColors.error,
            borderRadius: 6
          },
          {
            label: 'Next Month',
            data: nextMonthData,
            backgroundColor: chartColors.warning,
            borderRadius: 6
          },
          {
            label: 'Next Quarter',
            data: nextQuarterData,
            backgroundColor: chartColors.info,
            borderRadius: 6
          }
        ]
      },
      options: {
        ...commonOptions,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { precision: 0 }
          }
        },
        plugins: {
          ...commonOptions.plugins,
          legend: { position: 'top' }
        }
      }
    });
  }

  // ===================================
  // Statistical Differences Display
  // ===================================

  function displayStatisticalDifferences() {
    const statsContainer = document.getElementById('statisticalDifferences');
    if (!statsContainer || !enhancedData) return;

    const stats = enhancedData.statisticalDifferences;

    statsContainer.innerHTML = `
      <div class="stat-difference ${stats.genderDistribution.significant ? 'significant' : ''}">
        <h4>Gender Distribution</h4>
        <p>${stats.genderDistribution.note}</p>
      </div>
      <div class="stat-difference ${stats.ageDistribution.significant ? 'significant' : ''}">
        <h4>Age Distribution</h4>
        <p>${stats.ageDistribution.note}</p>
      </div>
      <div class="stat-difference ${stats.completionRates.significant ? 'significant' : ''}">
        <h4>Completion Rates</h4>
        <p>${stats.completionRates.note}</p>
      </div>
    `;
  }

  // ===================================
  // Responsive Chart Resize
  // ===================================

  function handleChartResize() {
    const charts = [
      diagnosisChart,
      genderByDiagnosisChart,
      ageByDiagnosisChart,
      completionChart,
      upcomingVisitsChart,
      enhancedTimelineChart
    ];

    charts.forEach(chart => {
      if (chart) chart.resize();
    });
  }

  // ===================================
  // Update Charts on Theme Change
  // ===================================

  function updateChartsForTheme() {
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDarkMode ? '#f3f4f6' : '#1f2937';
    const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';

    const charts = [
      diagnosisChart,
      genderByDiagnosisChart,
      ageByDiagnosisChart,
      completionChart,
      upcomingVisitsChart,
      enhancedTimelineChart
    ];

    charts.forEach(chart => {
      if (chart) {
        if (chart.options.scales) {
          Object.keys(chart.options.scales).forEach(axis => {
            if (chart.options.scales[axis].ticks) {
              chart.options.scales[axis].ticks.color = textColor;
            }
            if (chart.options.scales[axis].grid) {
              chart.options.scales[axis].grid.color = gridColor;
            }
          });
        }

        if (chart.options.plugins && chart.options.plugins.legend) {
          chart.options.plugins.legend.labels.color = textColor;
        }

        chart.update();
      }
    });
  }

  // ===================================
  // Initialize Charts on Load
  // ===================================

  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        loadDataAndInitCharts();
        displayStatisticalDifferences();
        initEnhancedTimelineChart();
        initAgeByDiagnosisChart();
      });
    } else {
      loadDataAndInitCharts();
      displayStatisticalDifferences();
      initEnhancedTimelineChart();
      initAgeByDiagnosisChart();
    }

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleChartResize, 250);
    }, { passive: true });

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          updateChartsForTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
  }

  // Start initialization
  init();

  // ===================================
  // Export for external use
  // ===================================

  window.EnhancedChartManager = {
    refresh: loadDataAndInitCharts,
    updateTheme: updateChartsForTheme,
    resize: handleChartResize,
    expandDiagnosis: expandDiagnosisSection,
    expandCompletion: expandCompletionSection,
    expandVisits: expandUpcomingVisitsSection
  };

})();
