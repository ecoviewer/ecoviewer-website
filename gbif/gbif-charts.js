// ============================================================
// EcoViewer — GBIF Charts
// Real counts from GBIF_v7_fixed.fgb
// Colours from GEA official EFG/Biome palette CSVs
// ============================================================

Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.color = '#4a5c48';

// ── DATA — real counts from pipeline, grouped by biome ───────
// Biome-level matches (no specific EFG) are shown as their own segment

const BIOMES = [
  {
    code: 'T1', name: 'Tropical-subtropical forests', biomeColor: '#008452',
    segments: [
      { code: 'T1',   name: 'Tropical-subtropical forests (biome)',           color: '#008452', count: 15885 },
      { code: 'T1.1', name: 'Tropical/Subtropical lowland rainforests',       color: '#32A06B', count: 11021 },
      { code: 'T1.2', name: 'Tropical/Subtropical dry forests and thickets',  color: '#52BC85', count: 41418 },
      { code: 'T1.3', name: 'Tropical/Subtropical montane rainforests',       color: '#6FD9A1', count: 9149  },
      { code: 'T1.4', name: 'Tropical heath forests',                         color: '#8DF7BD', count: 9     },
    ]
  },
  {
    code: 'T2', name: 'Temperate-boreal forests and woodlands', biomeColor: '#007767',
    segments: [
      { code: 'T2',   name: 'Temperate-boreal forests and woodlands (biome)',           color: '#007767', count: 17339 },
      { code: 'T2.1', name: 'Boreal and temperate high montane forests and woodlands',  color: '#006051', count: 75967 },
      { code: 'T2.2', name: 'Deciduous temperate forests',                              color: '#329483', count: 303255},
      { code: 'T2.3', name: 'Oceanic cool temperate rainforests',                       color: '#54B2A0', count: 6369  },
      { code: 'T2.4', name: 'Warm temperate laurophyll forests',                        color: '#73D1BE', count: 10872 },
      { code: 'T2.5', name: 'Temperate pyric humid forests',                            color: '#92F0DD', count: 2151  },
      { code: 'T2.6', name: 'Temperate pyric sclerophyll forests and woodlands',        color: '#BBF0E5', count: 5476  },
    ]
  },
  {
    code: 'T3', name: 'Shrublands and shrubby woodlands', biomeColor: '#00686F',
    segments: [
      { code: 'T3.2', name: 'Seasonally dry temperate heath and shrublands', color: '#57A7AE', count: 1610  },
      { code: 'T3.3', name: 'Cool temperate heathlands',                     color: '#78C8CF', count: 744   },
      { code: 'T3.4', name: 'Young rocky pavements, lava flows and screes',  color: '#9AEAF1', count: 22780 },
    ]
  },
  {
    code: 'T4', name: 'Savannas and grasslands', biomeColor: '#FFC01C',
    segments: [
      { code: 'T4',   name: 'Savannas and grasslands (biome)',               color: '#FFC01C', count: 11132 },
      { code: 'T4.1', name: 'Trophic savannas',                              color: '#FFD21C', count: 38    },
      { code: 'T4.2', name: 'Pyric tussock savannas',                        color: '#FFA134', count: 7279  },
      { code: 'T4.4', name: 'Temperate woodlands',                           color: '#FF6B00', count: 9539  },
      { code: 'T4.5', name: 'Temperate subhumid grasslands',                 color: '#D36E00', count: 6081  },
    ]
  },
  {
    code: 'T5', name: 'Deserts and semi-deserts', biomeColor: '#DFB664',
    segments: [
      { code: 'T5',   name: 'Deserts and semi-deserts (biome)',              color: '#DFB664', count: 30    },
      { code: 'T5.1', name: 'Semi-desert steppe',                            color: '#FFD279', count: 1752  },
      { code: 'T5.2', name: 'Succulent or Thorny deserts and semi-deserts',  color: '#EEC471', count: 33275 },
      { code: 'T5.3', name: 'Sclerophyll hot deserts and semi-deserts',      color: '#B38E3E', count: 124   },
      { code: 'T5.4', name: 'Cool deserts and semi-deserts',                 color: '#886716', count: 8     },
      { code: 'T5.5', name: 'Hyper-arid deserts',                            color: '#5E4300', count: 421   },
    ]
  },
  {
    code: 'T6', name: 'Polar/alpine (cryogenic)', biomeColor: '#D7D7D7',
    segments: [
      { code: 'T6',   name: 'Polar/alpine (cryogenic) (biome)',               color: '#D7D7D7', count: 251   },
      { code: 'T6.2', name: 'Polar/alpine cliffs, screes and lava flows',     color: '#C7C7C7', count: 27    },
      { code: 'T6.3', name: 'Polar tundra and deserts',                       color: '#B8B8B8', count: 7672  },
      { code: 'T6.4', name: 'Temperate alpine grasslands and shrublands',     color: '#A8A8A8', count: 36193 },
      { code: 'T6.5', name: 'Tropical alpine grasslands and herbfields',      color: '#949494', count: 695   },
    ]
  },
  {
    code: 'T7', name: 'Intensive land-use', biomeColor: '#EA1394',
    segments: [
      { code: 'T7.1', name: 'Annual croplands',                              color: '#FF14A1', count: 14301 },
      { code: 'T7.3', name: 'Plantations',                                   color: '#AA005F', count: 83544 },
      { code: 'T7.4', name: 'Urban and industrial ecosystems',               color: '#8B0047', count: 250441},
      { code: 'T7.5', name: 'Derived semi-natural pastures and old fields',  color: '#6C0030', count: 18736 },
    ]
  },
  {
    code: 'TF1', name: 'Palustrine wetlands', biomeColor: '#629A8E',
    segments: [
      { code: 'TF1',  name: 'Palustrine wetlands (biome)',                   color: '#629A8E', count: 18291 },
      { code: 'TF1.1',name: 'Tropical flooded forests and peat forests',     color: '#73B898', count: 2545  },
      { code: 'TF1.3',name: 'Permanent marshes',                             color: '#9FFFD3', count: 1880  },
      { code: 'TF1.4',name: 'Seasonal floodplain marshes',                   color: '#93D699', count: 475   },
      { code: 'TF1.5',name: 'Episodic arid floodplains',                     color: '#AFD6B3', count: 909   },
      { code: 'TF1.6',name: 'Boreal, temperate and montane peat bogs',       color: '#C1F195', count: 60327 },
      { code: 'TF1.7',name: 'Boreal and temperate fens',                     color: '#DFF1CF', count: 151605},
    ]
  },
  {
    code: 'MFT1', name: 'Brackish tidal', biomeColor: '#D1888E',
    segments: [
      { code: 'MFT1.2', name: 'Intertidal forests and shrublands (mangroves)', color: '#89474E', count: 6598  },
      { code: 'MFT1.3',  name: 'Coastal saltmarshes and reedbeds',             color: '#672931', count: 9019  },
    ]
  },
  {
    code: 'MT2', name: 'Supralittoral coastal', biomeColor: '#8E89DA',
    segments: [
      { code: 'MT2.1',  name: 'Coastal shrublands and grasslands',            color: '#726BDA', count: 12568 },
    ]
  },
  {
    code: 'F2', name: 'Lakes', biomeColor: '#1AC5D9',
    segments: [
      { code: 'F2.8', name: 'Artesian springs and oases',                    color: '#007A8A', count: 363   },
      { code: 'F2.9', name: 'Geothermal pools and wetlands',                 color: '#005C6B', count: 32    },
    ]
  },
  {
    code: 'F3', name: 'Artificial wetlands', biomeColor: '#6BCE81',
    segments: [
      { code: 'F3.3', name: 'Rice paddies',                                  color: '#90DAA0', count: 205   },
    ]
  },
];

// ── STACKED BAR CHART ─────────────────────────────────────────
const barCtx = document.getElementById('efgBarChart');
if (barCtx) {
  // Collect all unique segment codes across all biomes (in order)
  const allSegments = [];
  const seenCodes = new Set();
  BIOMES.forEach(b => b.segments.forEach(s => {
    if (!seenCodes.has(s.code)) { seenCodes.add(s.code); allSegments.push(s); }
  }));

  // x-axis: one bar per biome
  const biomeLabels = BIOMES.map(b => b.code);

  // One dataset per segment code
  const datasets = allSegments.map(seg => ({
    label: `${seg.code} — ${seg.name}`,
    backgroundColor: seg.color,
    borderColor: '#ffffff',
    borderWidth: 0.5,
    data: BIOMES.map(b => {
      const match = b.segments.find(s => s.code === seg.code);
      return match ? match.count : 0;
    }),
  }));

  new Chart(barCtx, {
    type: 'bar',
    data: { labels: biomeLabels, datasets },
    options: {
      responsive: true,
      animation: { duration: 900, easing: 'easeInOutQuart' },
      scales: {
        x: {
          stacked: true,
          grid: { display: false },
          ticks: { font: { size: 12, weight: '500' }, color: '#1a2219' },
          border: { color: 'rgba(0,0,0,0.07)' },
        },
        y: {
          stacked: true,
          beginAtZero: true,
          grid: { color: 'rgba(0,0,0,0.04)' },
          border: { dash: [4,4], color: 'transparent' },
          ticks: {
            font: { size: 11 },
            color: '#8a9e88',
            callback: v => v >= 1000000 ? (v/1000000).toFixed(0)+'M' : v >= 1000 ? (v/1000).toFixed(0)+'K' : v
          }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          filter: item => item.parsed.y > 0,
          callbacks: {
            label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString()} records`
          },
          backgroundColor: '#1a2219',
          titleColor: '#fff',
          bodyColor: 'rgba(255,255,255,0.82)',
          padding: 10,
          cornerRadius: 8,
          boxPadding: 4,
        }
      }
    }
  });

  // ── Custom grouped legend ──
  const legendEl = document.getElementById('efgLegend');
  if (legendEl) {
    BIOMES.forEach(biome => {
      const group = document.createElement('div');
      group.className = 'legend-biome-group';

      const header = document.createElement('div');
      header.className = 'legend-biome-header';
      header.innerHTML = `<span class="legend-biome-swatch" style="background:${biome.biomeColor}"></span><span class="legend-biome-name">${biome.code} — ${biome.name}</span>`;
      group.appendChild(header);

      const list = document.createElement('div');
      list.className = 'legend-efg-list';
      biome.segments.forEach(seg => {
        const item = document.createElement('div');
        item.className = 'legend-efg-item';
        item.innerHTML = `<span class="legend-efg-swatch" style="background:${seg.color}"></span><span class="legend-efg-code">${seg.code}</span><span class="legend-efg-name">${seg.name} — ${seg.count.toLocaleString()}</span>`;
        list.appendChild(item);
      });
      group.appendChild(list);
      legendEl.appendChild(group);
    });
  }
}
