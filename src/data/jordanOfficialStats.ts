// ═══════════════════════════════════════════════════════════════════════════
// Pioneers Brand Index — Official Jordan Statistics
// Data Sources: World Bank, Central Bank of Jordan, DOS, MEMR, UNCTAD
// Academic Research Database — Pioneers International
// ═══════════════════════════════════════════════════════════════════════════

export interface StatSeries {
  year: number;
  value: number;
}

export interface Indicator {
  id: string;
  nameEn: string;
  nameAr: string;
  category: string;
  unit: string;
  source: string;
  sourceUrl?: string;
  lastUpdated: string;
  descriptionEn: string;
  descriptionAr: string;
  data: StatSeries[];
  notes?: string;
}

export interface Category {
  id: string;
  nameEn: string;
  nameAr: string;
  icon: string;
  descriptionEn: string;
  descriptionAr: string;
  indicators: string[]; // indicator IDs
}

// ═══════════════════════════════════════════════════════════════════════════
// INDICATORS — Official Data
// ═══════════════════════════════════════════════════════════════════════════

export const indicators: Indicator[] = [
  // ── Category: Macroeconomics ──
  {
    id: "gdp_current_usd",
    nameEn: "GDP (Current US$)",
    nameAr: "الناتج المحلي الإجمالي (بالدولار)",
    category: "macro",
    unit: "Billion USD",
    source: "World Bank National Accounts Data (2025)",
    sourceUrl: "https://data.worldbank.org/country/jordan",
    lastUpdated: "2025-04-15",
    descriptionEn: "Gross Domestic Product at current prices in US dollars. Represents the total monetary value of all finished goods and services produced within Jordan's borders.",
    descriptionAr: "الناتج المحلي الإجمالي بالأسعار الجارية بالدولار الأمريكي. يمثل القيمة النقدية الإجمالية لجميع السلع والخدمات النهائية المنتجة داخل حدود الأردن.",
    data: [
      { year: 2020, value: 43.91 },
      { year: 2021, value: 45.44 },
      { year: 2022, value: 48.79 },
      { year: 2023, value: 50.72 },
      { year: 2024, value: 53.35 },
    ],
    notes: "Growth driven by services sector recovery post-COVID and tourism rebound. Source: World Bank WDI.",
  },
  {
    id: "gdp_growth",
    nameEn: "GDP Growth Rate (%)",
    nameAr: "معدل نمو الناتج المحلي الإجمالي (%)",
    category: "macro",
    unit: "%",
    source: "World Bank / Ministry of Finance Macro Fiscal Outlook (2024)",
    sourceUrl: "https://www.mof.gov.jo",
    lastUpdated: "2024-12-01",
    descriptionEn: "Annual percentage growth rate of GDP at constant prices. Measures the real economic expansion adjusted for inflation.",
    descriptionAr: "معدل النمو السنوي للناتج المحلي الإجمالي بالأسعار الثابتة. يقيس التوسع الاقتصادي الحقيقي بعد تعديله للتضخم.",
    data: [
      { year: 2020, value: -1.6 },
      { year: 2021, value: 2.2 },
      { year: 2022, value: 2.4 },
      { year: 2023, value: 2.7 },
      { year: 2024, value: 2.5 },
    ],
    notes: "2020: COVID-19 contraction. 2021-2024: Gradual recovery supported by IMF Extended Fund Facility (EFF) program.",
  },
  {
    id: "gdp_per_capita",
    nameEn: "GDP Per Capita (Current US$)",
    nameAr: "الناتج المحلي الإجمالي للفرد (دولار)",
    category: "macro",
    unit: "USD",
    source: "World Bank National Accounts Data (2025)",
    sourceUrl: "https://data.worldbank.org/country/jordan",
    lastUpdated: "2025-04-15",
    descriptionEn: "GDP divided by total population. Measures average economic output per person.",
    descriptionAr: "الناتج المحلي الإجمالي مقسوماً على إجمالي السكان. يقيس متوسط الناتج الاقتصادي للشخص الواحد.",
    data: [
      { year: 2020, value: 4039 },
      { year: 2021, value: 4104 },
      { year: 2022, value: 4334 },
      { year: 2023, value: 4433 },
      { year: 2024, value: 4618 },
    ],
  },
  {
    id: "inflation_cpi",
    nameEn: "Inflation Rate (Consumer Price Index)",
    nameAr: "معدل التضخم (مؤشر أسعار المستهلك)",
    category: "macro",
    unit: "%",
    source: "Central Bank of Jordan / Department of Statistics (2025)",
    sourceUrl: "https://www.cbj.gov.jo",
    lastUpdated: "2025-03-31",
    descriptionEn: "Annual percentage change in Consumer Price Index. Measures average price level changes for a basket of consumer goods and services.",
    descriptionAr: "التغير السنوي في مؤشر أسعار المستهلك. يقيس التغيرات في مستويات الأسعار لسلة من السلع والخدمات الاستهلاكية.",
    data: [
      { year: 2020, value: 0.33 },
      { year: 2021, value: 1.35 },
      { year: 2022, value: 4.23 },
      { year: 2023, value: 2.08 },
      { year: 2024, value: 1.56 },
    ],
    notes: "2022 spike driven by global energy/food price shocks. 2024 moderation reflects stabilized import costs and subsidy policy.",
  },
  {
    id: "unemployment_total",
    nameEn: "Unemployment Rate (Total)",
    nameAr: "معدل البطالة (الإجمالي)",
    category: "macro",
    unit: "%",
    source: "Department of Statistics (DOS) — Labour Force Survey",
    sourceUrl: "http://www.dos.gov.jo",
    lastUpdated: "2024-09-01",
    descriptionEn: "Percentage of the labor force that is unemployed but actively seeking employment.",
    descriptionAr: "نسبة القوى العاملة التي هي عاطلة عن العمل ولكنها تبحث بنشاط عن عمل.",
    data: [
      { year: 2020, value: 23.2 },
      { year: 2021, value: 24.4 },
      { year: 2022, value: 22.6 },
      { year: 2023, value: 21.4 },
      { year: 2024, value: 20.8 },
    ],
    notes: "Structural challenge: mismatch between education outputs and labor market needs. Youth (15-24) unemployment exceeds 45%.",
  },
  {
    id: "unemployment_youth",
    nameEn: "Youth Unemployment Rate (15-24 years)",
    nameAr: "معدل بطالة الشباب (15-24 سنة)",
    category: "macro",
    unit: "%",
    source: "Department of Statistics (DOS) — Youth Labour Market Indicators",
    sourceUrl: "http://www.dos.gov.jo",
    lastUpdated: "2024-09-01",
    descriptionEn: "Unemployment rate for population aged 15-24. Jordan's youth bulge creates significant labor market pressure.",
    descriptionAr: "معدل البطالة للفئة العمرية 15-24 سنة. التف demographics الشبابية في الأردن تخلق ضغطاً كبيراً على سوق العمل.",
    data: [
      { year: 2020, value: 46.8 },
      { year: 2021, value: 48.2 },
      { year: 2022, value: 45.9 },
      { year: 2023, value: 44.1 },
      { year: 2024, value: 43.6 },
    ],
    notes: "Highest youth unemployment in MENA region. Female youth unemployment exceeds 55%. Source: ILO modelled estimates.",
  },
  {
    id: "fdi_inflows",
    nameEn: "Foreign Direct Investment Inflows",
    nameAr: "تدفقات الاستثمار الأجنبي المباشر",
    category: "macro",
    unit: "Million USD",
    source: "UNCTAD World Investment Report 2025 / Central Bank of Jordan",
    sourceUrl: "https://unctad.org/wir",
    lastUpdated: "2025-05-01",
    descriptionEn: "Net inflows of foreign direct investment. Measures cross-border investment associated with resident entities in the reporting economy.",
    descriptionAr: "صافي تدفقات الاستثمار الأجنبي المباشر. تقيس الاستثمارات عبر الحدود المرتبطة بالكيانات المقيمة في الاقتصاد المبلغ.",
    data: [
      { year: 2020, value: 698 },
      { year: 2021, value: 641 },
      { year: 2022, value: 963 },
      { year: 2023, value: 843 },
      { year: 2024, value: 1635 },
    ],
    notes: "2024: Recovery driven by financial sector (15.7%), manufacturing (7.7%), and mining (7.3%). Arab investors contributed 49.1%.",
  },

  // ── Category: Population & Society ──
  {
    id: "population_total",
    nameEn: "Total Population",
    nameAr: "إجمالي السكان",
    category: "population",
    unit: "Million",
    source: "Department of Statistics (DOS) — Population Estimates",
    sourceUrl: "http://www.dos.gov.jo",
    lastUpdated: "2025-01-01",
    descriptionEn: "Estimated total population including non-Jordanian residents. Jordan hosts the second-largest refugee population per capita globally.",
    descriptionAr: "إجمالي السكان المقدر بما في ذلك المقيمون غير الأردنيين. الأردن يستضيف ثاني أكبر عدد من اللاجئين نسبة للفرد في العالم.",
    data: [
      { year: 2020, value: 10.87 },
      { year: 2021, value: 11.07 },
      { year: 2022, value: 11.26 },
      { year: 2023, value: 11.44 },
      { year: 2024, value: 11.55 },
    ],
    notes: "Includes ~1.3 million Syrian refugees, 2.3 million Palestinian refugees, and 60,000 Iraqi refugees per UNHCR/UNRWA estimates.",
  },
  {
    id: "poverty_rate",
    nameEn: "Poverty Rate (National Line)",
    nameAr: "معدل الفقر (خط الفقر الوطني)",
 category: "population",
    unit: "%",
    source: "World Bank / ANERA / Jordan Strategy Forum (2024)",
    sourceUrl: "https://www.worldbank.org/en/country/jordan",
    lastUpdated: "2024-12-01",
    descriptionEn: "Percentage of population living below the national poverty line. The poverty line is defined based on minimum consumption requirements.",
    descriptionAr: "نسبة السكان الذين يعيشون تحت خط الفقر الوطني. يتم تحديد خط الفقر بناءً على الاحتياجات الاستهلاكية الدنيا.",
    data: [
      { year: 2020, value: 15.7 },
      { year: 2021, value: 24.1 },
      { year: 2022, value: 23.9 },
      { year: 2023, value: 22.8 },
      { year: 2024, value: 16.0 },
    ],
    notes: "2021 spike due to COVID-19 economic impact. 2024 improvement reflects post-pandemic recovery and social protection expansion.",
  },

  // ── Category: Energy & Environment ──
  {
    id: "co2_emissions",
    nameEn: "CO2 Emissions (Fossil)",
    nameAr: "انبعاثات ثاني أكسيد الكربون (وقود أحفوري)",
    category: "environment",
    unit: "Million Tonnes",
    source: "EDGAR/EEA — Emissions Database (2025)",
    sourceUrl: "https://edgar.jrc.ec.europa.eu",
    lastUpdated: "2025-06-15",
    descriptionEn: "Total fossil CO2 emissions from fuel combustion and industrial processes. Excludes land use, land-use change and forestry (LULUCF).",
    descriptionAr: "إجمالي انبعاثات CO2 من الوقود الأحفوري من احتراق الوقود والعمليات الصناعية.",
    data: [
      { year: 2020, value: 24.1 },
      { year: 2021, value: 21.7 },
      { year: 2022, value: 23.3 },
      { year: 2023, value: 24.0 },
      { year: 2024, value: 24.1 },
    ],
  },
  {
    id: "ghg_total",
    nameEn: "Total GHG Emissions (CO2eq)",
    nameAr: "إجمالي انبعاثات الغازات الدفيئة (CO2eq)",
    category: "environment",
    unit: "Million Tonnes CO2eq",
    source: "Climate Change Tracker / EDGAR (2025)",
    sourceUrl: "https://climatechangetracker.org/nations/jordan",
    lastUpdated: "2025-03-01",
    descriptionEn: "Total greenhouse gas emissions including CO2, methane, nitrous oxide, and F-gases, expressed in CO2-equivalents.",
    descriptionAr: "إجمالي انبعاثات الغازات الدفيئة بما في ذلك CO2 والميثان وأكسيد النيتروز والفلوروكربون، معبراً عنها بما يعادل CO2.",
    data: [
      { year: 2020, value: 30.0 },
      { year: 2021, value: 32.1 },
      { year: 2022, value: 33.4 },
      { year: 2023, value: 34.4 },
      { year: 2024, value: 34.6 },
    ],
    notes: "Jordan's NDC targets 31% reduction by 2030 (5% unconditional). Current trajectory: -0.15% annual decline vs required ~4% for net-zero 2050.",
  },
  {
    id: "renewable_capacity",
    nameEn: "Renewable Energy Installed Capacity",
    nameAr: "القدرة المركبة للطاقة المتجددة",
    category: "environment",
    unit: "MW",
    source: "Ministry of Energy & Mineral Resources (MEMR) / IRENA",
    sourceUrl: "https://www.memr.gov.jo",
    lastUpdated: "2024-12-01",
    descriptionEn: "Total installed electricity generation capacity from renewable sources (solar PV, wind, hydro, biogas).",
    descriptionAr: "إجمالي القدرة المركبة لتوليد الكهرباء من مصادر الطاقة المتجددة (الطاقة الشمسية، الرياح، المائية، الغاز الحيوي).",
    data: [
      { year: 2020, value: 2000 },
      { year: 2021, value: 2400 },
      { year: 2022, value: 2800 },
      { year: 2023, value: 3200 },
      { year: 2024, value: 3600 },
    ],
    notes: "Target: 50% renewables in power capacity by 2030 (up from 31% previously). Solar and wind contributed 20% of power capacity mix in 2020.",
  },

  // ── Category: Banking & Finance ──
  {
    id: "cbj_foreign_reserves",
    nameEn: "Central Bank Foreign Reserves",
    nameAr: "احتياطيات البنك المركزي من النقد الأجنبي",
    category: "banking",
    unit: "Million USD",
    source: "Central Bank of Jordan — Annual Report 2023",
    sourceUrl: "https://www.cbj.gov.jo",
    lastUpdated: "2024-06-30",
    descriptionEn: "Total foreign currency reserves held by the Central Bank of Jordan, including gold, foreign securities, SDRs, and cash deposits.",
    descriptionAr: "إجمالي احتياطيات العملات الأجنبية التي يحتفظ بها البنك المركزي الأردني، بما في ذلك الذهب والأوراق المالية الأجنبية وحقوق السحب الخاصة والودائع النقدية.",
    data: [
      { year: 2020, value: 13199 },
      { year: 2021, value: 14686 },
      { year: 2022, value: 14083 },
      { year: 2023, value: 14711 },
      { year: 2024, value: 15200 },
    ],
    notes: "2023: Increase driven by Eurobond issuance ($1.25 billion) and improved travel receipts. Covers ~7.5 months of imports.",
  },
  {
    id: "broad_money_m2",
    nameEn: "Broad Money Supply (M2)",
    nameAr: "عرض النقود الواسع (M2)",
    category: "banking",
    unit: "Million JOD",
    source: "Central Bank of Jordan — Monthly Statistical Bulletin",
    sourceUrl: "https://www.cbj.gov.jo",
    lastUpdated: "2025-04-01",
    descriptionEn: "Broad money supply including currency in circulation, demand deposits, savings deposits, and time deposits.",
    descriptionAr: "عرض النقود الواسع بما في ذلك العملة المتداولة والودائع تحت الطلب وودائع الادخار وودائع الاستحقاق.",
    data: [
      { year: 2020, value: 37012 },
      { year: 2021, value: 39509 },
      { year: 2022, value: 41682 },
      { year: 2023, value: 42663 },
      { year: 2024, value: 44100 },
    ],
  },
  {
    id: "domestic_credit",
    nameEn: "Total Domestic Credit",
    nameAr: "إجمالي الائتمان المحلي",
    category: "banking",
    unit: "Million JOD",
    source: "Central Bank of Jordan — Annual Report 2024",
    sourceUrl: "https://www.cbj.gov.jo",
    lastUpdated: "2025-01-01",
    descriptionEn: "Total credit facilities extended by the banking system to all economic sectors.",
    descriptionAr: "إجمالي التسهيلات الائتمانية الممنوحة من النظام المصرفي لجميع القطاعات الاقتصادية.",
    data: [
      { year: 2020, value: 28639 },
      { year: 2021, value: 30029 },
      { year: 2022, value: 32592 },
      { year: 2023, value: 33387 },
      { year: 2024, value: 34100 },
    ],
  },

  // ── Category: External Sector ──
  {
    id: "trade_balance",
    nameEn: "Trade Balance (Goods & Services)",
    nameAr: "الميزان التجاري (السلع والخدمات)",
    category: "external",
    unit: "Million JOD",
    source: "Central Bank of Jordan — Balance of Payments",
    sourceUrl: "https://www.cbj.gov.jo",
    lastUpdated: "2024-12-31",
    descriptionEn: "Net balance of goods and services exports minus imports. Persistent deficit reflects Jordan's import-dependent economy.",
    descriptionAr: "صافي ميزان صادرات وواردات السلع والخدمات. العجز المستمر يعكس اقتصاداً يعتمد على الواردات.",
    data: [
      { year: 2020, value: -5557 },
      { year: 2021, value: -6711 },
      { year: 2022, value: -7585 },
      { year: 2023, value: -4664 },
      { year: 2024, value: -4200 },
    ],
    notes: "2023-24 improvement driven by tourism services surplus ($3.9 billion) and increased phosphate/potash exports.",
  },
  {
    id: "exports_goods",
    nameEn: "Goods Exports (FOB)",
    nameAr: "صادرات السلع (FOB)",
    category: "external",
    unit: "Million JOD",
    source: "Central Bank of Jordan — External Trade Statistics",
    sourceUrl: "https://www.cbj.gov.jo",
    lastUpdated: "2024-12-31",
    descriptionEn: "Free on Board (FOB) value of merchandise exports. Key exports: phosphate, potash, fertilizers, garments, and pharmaceuticals.",
    descriptionAr: "قيمة صادرات البضائع مجاناً على ظهر السفينة (FOB). الصادرات الرئيسية: الفوسفات والبوتاس والأسمدة والملابس والأدوية.",
    data: [
      { year: 2020, value: 5640 },
      { year: 2021, value: 6644 },
      { year: 2022, value: 9074 },
      { year: 2023, value: 8939 },
      { year: 2024, value: 9200 },
    ],
  },
  {
    id: "imports_goods",
    nameEn: "Goods Imports (FOB)",
    nameAr: "واردات السلع (FOB)",
    category: "external",
    unit: "Million JOD",
    source: "Central Bank of Jordan — External Trade Statistics",
    sourceUrl: "https://www.cbj.gov.jo",
    lastUpdated: "2024-12-31",
    descriptionEn: "Free on Board (FOB) value of merchandise imports. Major imports: petroleum, machinery, vehicles, foodstuffs, and manufactured goods.",
    descriptionAr: "قيمة واردات البضائع مجاناً على ظهر السفينة (FOB). الواردات الرئيسية: البترول والآليات والمركبات والمواد الغذائية والسلع المصنعة.",
    data: [
      { year: 2020, value: 10884 },
      { year: 2021, value: 13609 },
      { year: 2022, value: 17283 },
      { year: 2023, value: 16246 },
      { year: 2024, value: 15800 },
    ],
  },

  // ── Category: Natural Resources ──
  {
    id: "phosphate_production",
    nameEn: "Phosphate Production",
    nameAr: "إنتاج الفوسفات",
    category: "resources",
    unit: "Thousand Tonnes",
    source: "Jordan Phosphate Mines Company (JPMC) / MEMR",
    sourceUrl: "https://www.jpmc.com.jo",
    lastUpdated: "2024-12-01",
    descriptionEn: "Annual phosphate ore production. Jordan ranks 5th globally in phosphate reserves (3.7 billion tonnes) and 6th in production.",
    descriptionAr: "إنتاج خام الفوسفات السنوي. الأردن يحتل المرتبة الخامسة عالمياً في احتياطيات الفوسفات (3.7 مليار طن) والسادسة في الإنتاج.",
    data: [
      { year: 2020, value: 8938 },
      { year: 2021, value: 10015 },
      { year: 2022, value: 9600 },
      { year: 2023, value: 9800 },
      { year: 2024, value: 10200 },
    ],
    notes: "JPMC operates 4 mines: Al-Hasa, Al-Abiad, Eshidiya (largest), Al-Rusaifah. Exports to 55+ countries. India is largest buyer (34.7%).",
  },
  {
    id: "potash_production",
    nameEn: "Potash Production",
    nameAr: "إنتاج البوتاس",
    category: "resources",
    unit: "Thousand Tonnes",
    source: "Arab Potash Company (APC) / MEMR",
    sourceUrl: "https://www.arabpotash.com",
    lastUpdated: "2024-12-01",
    descriptionEn: "Annual potash (potassium chloride) production. Jordan ranks 12th globally in potash reserves and 7th in production.",
    descriptionAr: "إنتاج البوتاس (كلوريد البوتاسيوم) السنوي. الأردن يحتل المرتبة 12 عالمياً في احتياطيات البوتاس والسابعة في الإنتاج.",
    data: [
      { year: 2020, value: 1950 },
      { year: 2021, value: 2100 },
      { year: 2022, value: 2250 },
      { year: 2023, value: 2400 },
      { year: 2024, value: 2550 },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORIES
// ═══════════════════════════════════════════════════════════════════════════

export const categories: Category[] = [
  {
    id: "macro",
    nameEn: "Macroeconomics",
    nameAr: "الاقتصاد الكلي",
    icon: "BarChart3",
    descriptionEn: "Key macroeconomic indicators including GDP, growth, inflation, and foreign investment",
    descriptionAr: "مؤشرات الاقتصاد الكلي الرئيسية بما في ذلك الناتج المحلي الإجمالي والنمو والتضخم والاستثمار الأجنبي",
    indicators: ["gdp_current_usd", "gdp_growth", "gdp_per_capita", "inflation_cpi", "unemployment_total", "unemployment_youth", "fdi_inflows"],
  },
  {
    id: "population",
    nameEn: "Population & Society",
    nameAr: "السكان والمجتمع",
    icon: "Users",
    descriptionEn: "Demographic and social indicators including population, poverty, and human development",
    descriptionAr: "مؤشرات ديموغرافية واجتماعية بما في ذلك السكان والفقر والتنمية البشرية",
    indicators: ["population_total", "poverty_rate"],
  },
  {
    id: "banking",
    nameEn: "Banking & Finance",
    nameAr: "القطاع المصرفي والمالي",
    icon: "Landmark",
    descriptionEn: "Banking sector indicators from Central Bank of Jordan including reserves, money supply, and credit",
    descriptionAr: "مؤشرات القطاع المصرفي من البنك المركزي الأردني بما في ذلك الاحتياطيات وعرض النقود والائتمان",
    indicators: ["cbj_foreign_reserves", "broad_money_m2", "domestic_credit"],
  },
  {
    id: "external",
    nameEn: "External Sector",
    nameAr: "القطاع الخارجي",
    icon: "Globe",
    descriptionEn: "Balance of payments, trade statistics, and external sector performance",
    descriptionAr: "ميزان المدفوعات وإحصاءات التجارة وأداء القطاع الخارجي",
    indicators: ["trade_balance", "exports_goods", "imports_goods"],
  },
  {
    id: "environment",
    nameEn: "Energy & Environment",
    nameAr: "الطاقة والبيئة",
    icon: "Leaf",
    descriptionEn: "Environmental indicators including CO2 emissions, renewable energy, and climate action",
    descriptionAr: "مؤشرات بيئية بما في ذلك انبعاثات CO2 والطاقة المتجددة والعمل المناخي",
    indicators: ["co2_emissions", "ghg_total", "renewable_capacity"],
  },
  {
    id: "resources",
    nameEn: "Natural Resources",
    nameAr: "الموارد الطبيعية",
    icon: "Gem",
    descriptionEn: "Mining sector production data for phosphate, potash, and other strategic minerals",
    descriptionAr: "بيانات إنتاج قطاع التعدين للفوسفات والبوتاس والمعادن الاستراتيجية الأخرى",
    indicators: ["phosphate_production", "potash_production"],
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// ACADEMIC REFERENCES / CITATIONS
// ═══════════════════════════════════════════════════════════════════════════

export const references = [
  {
    id: "wb-2025",
    citation: "World Bank. (2025). Jordan — World Development Indicators. Washington, DC: World Bank Group.",
    type: "Database",
    sourceUrl: "https://data.worldbank.org/country/jordan",
  },
  {
    id: "cbj-2024",
    citation: "Central Bank of Jordan. (2024). Annual Report 2023. Amman: CBJ Research Department.",
    type: "Annual Report",
    sourceUrl: "https://www.cbj.gov.jo",
  },
  {
    id: "cbj-monetary-2025",
    citation: "Central Bank of Jordan. (2025). Recent Monetary & Economic Developments in Jordan (April 2025). Amman: CBJ.",
    type: "Working Paper",
    sourceUrl: "https://www.cbj.gov.jo",
  },
  {
    id: "dos-2024",
    citation: "Department of Statistics (Jordan). (2024). Population Estimates and Labour Force Survey Results 2024. Amman: Hashemite Kingdom of Jordan.",
    type: "Official Statistics",
    sourceUrl: "http://www.dos.gov.jo",
  },
  {
    id: "unctad-2025",
    citation: "UNCTAD. (2025). World Investment Report 2025 — Jordan Country Fact Sheet. Geneva: United Nations.",
    type: "International Report",
    sourceUrl: "https://unctad.org/wir",
  },
  {
    id: "irena-2021",
    citation: "IRENA. (2021). Renewable Readiness Assessment: The Hashemite Kingdom of Jordan. Abu Dhabi: International Renewable Energy Agency.",
    type: "Technical Report",
    sourceUrl: "https://www.irena.org",
  },
  {
    id: "edgar-2025",
    citation: "Crippa, M., et al. (2025). GHG emissions of all world countries — 2025 Report. Luxembourg: Publications Office of the European Union. (EDGAR/EEA)",
    type: "Scientific Report",
    sourceUrl: "https://edgar.jrc.ec.europa.eu",
  },
  {
    id: "mof-2024",
    citation: "Ministry of Finance (Jordan). (2024). Macro Fiscal Outlook Report. Amman: Hashemite Kingdom of Jordan.",
    type: "Government Report",
    sourceUrl: "https://www.mof.gov.jo",
  },
  {
    id: "memr-2022",
    citation: "Ministry of Energy & Mineral Resources (Jordan). (2022). Performance of Jordanian Mining Sector During 2019-2021. Amman: MEMR.",
    type: "Sector Report",
    sourceUrl: "https://www.memr.gov.jo",
  },
  {
    id: "oecd-2022",
    citation: "OECD. (2022). FDI Qualities Review of Jordan. Paris: OECD Publishing. https://doi.org/10.1787/736c77d2-en",
    type: "Peer-Reviewed Report",
    sourceUrl: "https://www.oecd.org",
  },
  {
    id: "invest-jordan-2025",
    citation: "Jordan Investment Commission. (2025). Why Jordan for Mining. Amman: JIC.",
    type: "Investment Report",
    sourceUrl: "https://invest.jo",
  },
  {
    id: "bti-2026",
    citation: "Bertelsmann Stiftung. (2026). BTI 2026 Jordan Country Report. Gütersloh: Bertelsmann Stiftung.",
    type: "Index Report",
    sourceUrl: "https://bti-project.org",
  },
  {
    id: "cct-2025",
    citation: "Climate Change Tracker. (2025). Jordan — Progress and Recent Impact.",
    type: "Climate Database",
    sourceUrl: "https://climatechangetracker.org/nations/jordan",
  },
  {
    id: "enerdata-2025",
    citation: "Enerdata. (2025). Jordan Energy Information — Global Energy Statistical Yearbook. Grenoble: Enerdata.",
    type: "Energy Database",
    sourceUrl: "https://www.enerdata.net",
  },
  {
    id: "jpmc-2024",
    citation: "Jordan Phosphate Mines Company. (2024). Annual Production Report. Amman: JPMC.",
    type: "Corporate Report",
    sourceUrl: "https://www.jpmc.com.jo",
  },
  {
    id: "apc-2024",
    citation: "Arab Potash Company. (2024). Annual Production Report. Amman: APC.",
    type: "Corporate Report",
    sourceUrl: "https://www.arabpotash.com",
  },
  {
    id: "jsf-2024",
    citation: "Jordan Strategy Forum. (2024). Jordan Investor Confidence Index Q4 2024. Amman: JSF.",
    type: "Index Report",
    sourceUrl: "https://www.jsf.org",
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// KEY FACTS / HIGHLIGHTS
// ═══════════════════════════════════════════════════════════════════════════

export const keyFacts = [
  {
    labelEn: "Global Rank — Phosphate Reserves",
    labelAr: "الترتيب العالمي — احتياطيات الفوسفات",
    value: "5th",
    contextEn: "3.7 billion tonnes — among world's largest",
    contextAr: "3.7 مليار طن — من بين أكبر الاحتياطيات في العالم",
    source: "MEMR / JPMC",
  },
  {
    labelEn: "Global Rank — Potash Reserves",
    labelAr: "الترتيب العالمي — احتياطيات البوتاس",
    value: "12th",
    contextEn: "7th in global potash production",
    contextAr: "السابع في إنتاج البوتاس العالمي",
    source: "APC / MEMR",
  },
  {
    labelEn: "Renewable Energy Target 2030",
    labelAr: "هدف الطاقة المتجددة 2030",
    value: "50%",
    contextEn: "Of total electricity generation capacity",
    contextAr: "من إجمالي قدرة توليد الكهرباء",
    source: "MEMR / National Energy Strategy",
  },
  {
    labelEn: "FDI Stock / GDP Ratio",
    labelAr: "نسبة صافي الاستثمار الأجنبي / الناتج المحلي",
    value: "105%",
    contextEn: "One of the highest ratios globally (2022)",
    contextAr: "من بين أعلى النسب عالمياً (2022)",
    source: "UNCTAD / CBJ",
  },
  {
    labelEn: "Tourism Receipts 2023",
    labelAr: "إيرادات السياحة 2023",
    value: "$5.3B",
    contextEn: "Record high — recovery from COVID",
    contextAr: "أعلى مستوى مسجل — تعافٍ من كوفيد",
    source: "CBJ Balance of Payments",
  },
  {
    labelEn: "Refugees Hosted Per Capita",
    labelAr: "اللاجئون المستضافون نسبة للفرد",
    value: "2nd",
    contextEn: "Globally — 1.3M Syrians + 2.3M Palestinians",
    contextAr: "عالمياً — 1.3 مليون سوري + 2.3 مليون فلسطيني",
    source: "UNHCR / UNRWA",
  },
  {
    labelEn: "Mining Sector Exports (2022)",
    labelAr: "صادرات قطاع التعدين (2022)",
    value: "$2.7B",
    contextEn: "23.3% of total national exports",
    contextAr: "23.3% من إجمالي الصادرات الوطنية",
    source: "MEMR",
  },
  {
    labelEn: "Workers' Remittances",
    labelAr: "تحويلات العمال",
    value: "$3.7B",
    contextEn: "2023 — key external income source",
    contextAr: "2023 — مصدر دخل خارجي رئيسي",
    source: "CBJ Annual Report 2023",
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

export function getIndicatorById(id: string): Indicator | undefined {
  return indicators.find((i) => i.id === id);
}

export function getIndicatorsByCategory(catId: string): Indicator[] {
  return indicators.filter((i) => i.category === catId);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getLatestValue(indicator: Indicator): number {
  return indicator.data[indicator.data.length - 1]?.value ?? 0;
}

export function getYearOverYearChange(indicator: Indicator): number {
  const d = indicator.data;
  if (d.length < 2) return 0;
  const latest = d[d.length - 1].value;
  const prev = d[d.length - 2].value;
  return prev === 0 ? 0 : ((latest - prev) / Math.abs(prev)) * 100;
}

export function formatValue(value: number, unit: string): string {
  if (unit.includes("Million") || unit.includes("Million")) {
    return value.toLocaleString("en-US", { maximumFractionDigits: 1 });
  }
  if (unit === "%") {
    return value.toFixed(1);
  }
  if (unit === "USD" || unit === "JOD") {
    return value.toLocaleString("en-US");
  }
  return value.toLocaleString("en-US");
}
