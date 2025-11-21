// ===================================
// HIVPD_23 Research Project - Charts
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
    gray: '#6b7280'
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
        },
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            } else if (context.parsed !== null) {
              label += context.parsed;
            }
            if (context.dataset.percentage) {
              label += ` (${context.dataset.percentage[context.dataIndex]}%)`;
            }
            return label;
          }
        }
      }
    }
  };

  // ===================================
  // Chart Instances (global)
  // ===================================

  let ageChart = null;
  let genderChart = null;
  let ethnicityChart = null;
  let timelineChart = null;

  // ===================================
  // Load Data and Initialize Charts
  // ===================================

  async function loadDataAndInitCharts() {
    try {
      // Load demographics data
      const demoResponse = await fetch('data/demographics.json');
      const demoData = await demoResponse.json();

      // Load recruitment data
      const recruitResponse = await fetch('data/recruitment.json');
      const recruitData = await recruitResponse.json();

      // Initialize all charts
      initAgeChart(demoData.ageGroups);
      initGenderChart(demoData.genderDistribution);
      initEthnicityChart(demoData.ethnicityDistribution);
      initTimelineChart(recruitData.timeline);

      console.log('Charts initialized successfully');
    } catch (error) {
      console.error('Error loading chart data:', error);
    }
  }

  // ===================================
  // Age Distribution Chart (Bar)
  // ===================================

  function initAgeChart(data) {
    const ctx = document.getElementById('ageChart');
    if (!ctx) return;

    const labels = data.map(item => item.range);
    const values = data.map(item => item.count);
    const percentages = data.map(item => item.percentage.toFixed(1));

    if (ageChart) {
      ageChart.destroy();
    }

    ageChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Participants',
          data: values,
          backgroundColor: createGradient(ctx, chartColors.primary, chartColors.secondary),
          borderColor: chartColors.primary,
          borderWidth: 2,
          borderRadius: 8,
          percentage: percentages
        }]
      },
      options: {
        ...commonOptions,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
              font: {
                family: "'Inter', sans-serif"
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            ticks: {
              font: {
                family: "'Inter', sans-serif"
              }
            },
            grid: {
              display: false
            }
          }
        },
        plugins: {
          ...commonOptions.plugins,
          legend: {
            display: false
          },
          tooltip: {
            ...commonOptions.plugins.tooltip,
            callbacks: {
              label: function(context) {
                const count = context.parsed.y;
                const percentage = percentages[context.dataIndex];
                return `Participants: ${count} (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  }

  // ===================================
  // Gender Distribution Chart (Doughnut)
  // ===================================

  function initGenderChart(data) {
    const ctx = document.getElementById('genderChart');
    if (!ctx) return;

    const labels = data.map(item => item.category);
    const values = data.map(item => item.count);
    const percentages = data.map(item => item.percentage.toFixed(1));

    if (genderChart) {
      genderChart.destroy();
    }

    genderChart = new Chart(ctx, {
      type: 'doughnut',
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
          borderColor: '#ffffff',
          borderWidth: 3,
          hoverOffset: 10,
          percentage: percentages
        }]
      },
      options: {
        ...commonOptions,
        cutout: '65%',
        plugins: {
          ...commonOptions.plugins,
          tooltip: {
            ...commonOptions.plugins.tooltip,
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const count = context.parsed;
                const percentage = percentages[context.dataIndex];
                return `${label}: ${count} (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  }

  // ===================================
  // Ethnicity Distribution Chart (Pie)
  // ===================================

  function initEthnicityChart(data) {
    const ctx = document.getElementById('ethnicityChart');
    if (!ctx) return;

    const labels = data.map(item => item.category);
    const values = data.map(item => item.count);
    const percentages = data.map(item => item.percentage.toFixed(1));

    if (ethnicityChart) {
      ethnicityChart.destroy();
    }

    ethnicityChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Ethnicity Distribution',
          data: values,
          backgroundColor: [
            chartColors.primary,
            chartColors.secondary,
            chartColors.accent,
            chartColors.success,
            chartColors.purple
          ],
          borderColor: '#ffffff',
          borderWidth: 3,
          hoverOffset: 10,
          percentage: percentages
        }]
      },
      options: {
        ...commonOptions,
        plugins: {
          ...commonOptions.plugins,
          tooltip: {
            ...commonOptions.plugins.tooltip,
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const count = context.parsed;
                const percentage = percentages[context.dataIndex];
                return `${label}: ${count} (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  }

  // ===================================
  // Recruitment Timeline Chart (Line)
  // ===================================

  function initTimelineChart(data) {
    const ctx = document.getElementById('timelineChart');
    if (!ctx) return;

    const labels = data.map(item => item.month);
    const monthlyValues = data.map(item => item.participants);
    const cumulativeValues = data.map(item => item.cumulative);

    if (timelineChart) {
      timelineChart.destroy();
    }

    timelineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Monthly Recruitment',
            data: monthlyValues,
            backgroundColor: 'rgba(0, 102, 204, 0.1)',
            borderColor: chartColors.primary,
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: chartColors.primary,
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2
          },
          {
            label: 'Cumulative Total',
            data: cumulativeValues,
            backgroundColor: 'rgba(0, 168, 150, 0.1)',
            borderColor: chartColors.secondary,
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: chartColors.secondary,
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
              font: {
                family: "'Inter', sans-serif"
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            ticks: {
              font: {
                family: "'Inter', sans-serif"
              },
              maxRotation: 45,
              minRotation: 45
            },
            grid: {
              display: false
            }
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
                const label = context.dataset.label || '';
                const value = context.parsed.y;
                return `${label}: ${value} participants`;
              }
            }
          }
        }
      }
    });
  }

  // ===================================
  // Helper: Create Gradient
  // ===================================

  function createGradient(ctx, color1, color2) {
    const canvas = ctx.canvas;
    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
  }

  // ===================================
  // Responsive Chart Resize
  // ===================================

  function handleChartResize() {
    if (ageChart) ageChart.resize();
    if (genderChart) genderChart.resize();
    if (ethnicityChart) ethnicityChart.resize();
    if (timelineChart) timelineChart.resize();
  }

  // ===================================
  // Update Charts on Theme Change
  // ===================================

  function updateChartsForTheme() {
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDarkMode ? '#f3f4f6' : '#1f2937';
    const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';

    const charts = [ageChart, genderChart, ethnicityChart, timelineChart];

    charts.forEach(chart => {
      if (chart) {
        // Update scales color
        if (chart.options.scales) {
          if (chart.options.scales.x) {
            chart.options.scales.x.ticks.color = textColor;
            if (chart.options.scales.x.grid) {
              chart.options.scales.x.grid.color = gridColor;
            }
          }
          if (chart.options.scales.y) {
            chart.options.scales.y.ticks.color = textColor;
            chart.options.scales.y.grid.color = gridColor;
          }
        }

        // Update legend color
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
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        loadDataAndInitCharts();
      });
    } else {
      loadDataAndInitCharts();
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
  // Export for external use (optional)
  // ===================================

  window.ChartManager = {
    refresh: loadDataAndInitCharts,
    updateTheme: updateChartsForTheme,
    resize: handleChartResize
  };

})();
