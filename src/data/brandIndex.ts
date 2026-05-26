export interface CountryData {
  id: string;
  name: string;
  nameAr: string;
  code: string;
  flag: string;
  gdp2023: number; // billion USD
  gdp2024: number;
  gdpGrowth: number; // %
  population2023: number; // millions
  population2024: number;
  perCapitaGDP: number; // USD
  unemployment: number; // %
  inflation: number; // %
  fdi2023: number; // million USD
  creditRating: string;
  easeOfBusiness: number; // rank
  globalCompetitiveness: number; // rank 1-141
  renewableEnergy: number; // % of total
  co2PerCapita: number; // tonnes
  internetPenetration: number; // %
  corruptionIndex: number; // 0-100
  humanDevelopmentIndex: number; // 0-1
  giniIndex: number; // 0-100
  literacyRate: number; // %
  lifeExpectancy: number; // years
  povertyRate: number; // %
  governmentEffectiveness: number; // -2.5 to 2.5
  ruleOfLaw: number; // -2.5 to 2.5
  regulatoryQuality: number; // -2.5 to 2.5
  politicalStability: number; // -2.5 to 2.5
}

export const countries: CountryData[] = [
  {
    id: "jo", name: "Jordan", nameAr: "الأردن", code: "JOR", flag: "🇯🇴",
    gdp2023: 50.72, gdp2024: 53.35, gdpGrowth: 2.5,
    population2023: 11.44, population2024: 11.55, perCapitaGDP: 4618,
    unemployment: 20.8, inflation: 1.56, fdi2023: 843,
    creditRating: "BB-", easeOfBusiness: 75, globalCompetitiveness: 70,
    renewableEnergy: 29, co2PerCapita: 3.0, internetPenetration: 85.0,
    corruptionIndex: 46, humanDevelopmentIndex: 0.736, giniIndex: 33.7,
    literacyRate: 98.2, lifeExpectancy: 74.4, povertyRate: 16.0,
    governmentEffectiveness: -0.2, ruleOfLaw: 0.4, regulatoryQuality: 0.1,
    politicalStability: -0.3,
  },
  {
    id: "sa", name: "Saudi Arabia", nameAr: "السعودية", code: "SAU", flag: "🇸🇦",
    gdp2023: 1068.78, gdp2024: 1106.70, gdpGrowth: 1.5,
    population2023: 32.18, population2024: 33.00, perCapitaGDP: 33500,
    unemployment: 5.6, inflation: 1.9, fdi2023: 19265,
    creditRating: "A", easeOfBusiness: 62, globalCompetitiveness: 28,
    renewableEnergy: 2.4, co2PerCapita: 18.0, internetPenetration: 99.0,
    corruptionIndex: 52, humanDevelopmentIndex: 0.875, giniIndex: 45.9,
    literacyRate: 97.6, lifeExpectancy: 75.3, povertyRate: 0.0,
    governmentEffectiveness: 0.4, ruleOfLaw: 0.5, regulatoryQuality: 0.4,
    politicalStability: -0.2,
  },
  {
    id: "ae", name: "UAE", nameAr: "الإمارات", code: "ARE", flag: "🇦🇪",
    gdp2023: 509.01, gdp2024: 527.80, gdpGrowth: 3.7,
    population2023: 9.51, population2024: 9.80, perCapitaGDP: 53850,
    unemployment: 2.9, inflation: 1.8, fdi2023: 22873,
    creditRating: "AA-", easeOfBusiness: 16, globalCompetitiveness: 9,
    renewableEnergy: 3.8, co2PerCapita: 20.0, internetPenetration: 99.0,
    corruptionIndex: 68, humanDevelopmentIndex: 0.937, giniIndex: 26.0,
    literacyRate: 97.6, lifeExpectancy: 78.7, povertyRate: 0.0,
    governmentEffectiveness: 1.3, ruleOfLaw: 1.3, regulatoryQuality: 1.4,
    politicalStability: 0.9,
  },
  {
    id: "iq", name: "Iraq", nameAr: "العراق", code: "IRQ", flag: "🇮🇶",
    gdp2023: 250.62, gdp2024: 265.89, gdpGrowth: 1.1,
    population2023: 44.50, population2024: 46.20, perCapitaGDP: 5755,
    unemployment: 14.2, inflation: 4.5, fdi2023: 5560,
    creditRating: "B-", easeOfBusiness: 172, globalCompetitiveness: 131,
    renewableEnergy: 1.2, co2PerCapita: 4.2, internetPenetration: 78.0,
    corruptionIndex: 23, humanDevelopmentIndex: 0.673, giniIndex: 29.5,
    literacyRate: 85.6, lifeExpectancy: 70.6, povertyRate: 21.5,
    governmentEffectiveness: -1.3, ruleOfLaw: -1.2, regulatoryQuality: -1.1,
    politicalStability: -2.1,
  },
  {
    id: "lb", name: "Lebanon", nameAr: "لبنان", code: "LBN", flag: "🇱🇧",
    gdp2023: 18.08, gdp2024: 21.78, gdpGrowth: 0.5,
    population2023: 5.35, population2024: 5.30, perCapitaGDP: 4110,
    unemployment: 12.0, inflation: 45.0, fdi2023: 285,
    creditRating: "RD", easeOfBusiness: 143, globalCompetitiveness: 123,
    renewableEnergy: 5.0, co2PerCapita: 3.0, internetPenetration: 90.0,
    corruptionIndex: 13, humanDevelopmentIndex: 0.706, giniIndex: 31.8,
    literacyRate: 95.1, lifeExpectancy: 75.0, povertyRate: 44.0,
    governmentEffectiveness: -1.5, ruleOfLaw: -0.8, regulatoryQuality: -0.8,
    politicalStability: -1.8,
  },
  {
    id: "ly", name: "Libya", nameAr: "ليبيا", code: "LBY", flag: "🇱🇾",
    gdp2023: 40.95, gdp2024: 43.76, gdpGrowth: 7.5,
    population2023: 6.82, population2024: 6.92, perCapitaGDP: 6324,
    unemployment: 18.5, inflation: 2.7, fdi2023: 620,
    creditRating: "NR", easeOfBusiness: 186, globalCompetitiveness: 137,
    renewableEnergy: 0.1, co2PerCapita: 8.5, internetPenetration: 22.0,
    corruptionIndex: 17, humanDevelopmentIndex: 0.718, giniIndex: 40.0,
    literacyRate: 91.4, lifeExpectancy: 72.7, povertyRate: 25.0,
    governmentEffectiveness: -1.7, ruleOfLaw: -1.4, regulatoryQuality: -1.2,
    politicalStability: -2.0,
  },
  {
    id: "ps", name: "Palestine", nameAr: "فلسطين", code: "PSE", flag: "🇵🇸",
    gdp2023: 19.56, gdp2024: 20.45, gdpGrowth: 1.2,
    population2023: 5.48, population2024: 5.62, perCapitaGDP: 3639,
    unemployment: 25.6, inflation: 2.5, fdi2023: 45,
    creditRating: "NR", easeOfBusiness: 114, globalCompetitiveness: 98,
    renewableEnergy: 1.5, co2PerCapita: 0.7, internetPenetration: 75.0,
    corruptionIndex: 44, humanDevelopmentIndex: 0.715, giniIndex: 34.0,
    literacyRate: 97.2, lifeExpectancy: 74.2, povertyRate: 29.0,
    governmentEffectiveness: -0.7, ruleOfLaw: -0.3, regulatoryQuality: -0.5,
    politicalStability: -1.5,
  },
  {
    id: "kw", name: "Kuwait", nameAr: "الكويت", code: "KWT", flag: "🇰🇼",
    gdp2023: 159.69, gdp2024: 167.70, gdpGrowth: 2.8,
    population2023: 4.31, population2024: 4.42, perCapitaGDP: 37941,
    unemployment: 2.1, inflation: 3.0, fdi2023: 120,
    creditRating: "A+", easeOfBusiness: 79, globalCompetitiveness: 42,
    renewableEnergy: 0.5, co2PerCapita: 25.0, internetPenetration: 99.0,
    corruptionIndex: 46, humanDevelopmentIndex: 0.847, giniIndex: 32.3,
    literacyRate: 96.3, lifeExpectancy: 78.7, povertyRate: 0.0,
    governmentEffectiveness: 0.1, ruleOfLaw: 0.6, regulatoryQuality: 0.2,
    politicalStability: -0.1,
  },
];

export const indicatorDefs = [
  { key: "gdpGrowth", label: "GDP Growth", labelAr: "نمو الناتج المحلي", unit: "%", higherBetter: true },
  { key: "perCapitaGDP", label: "GDP Per Capita", labelAr: "النصيب الفردي", unit: "USD", higherBetter: true },
  { key: "unemployment", label: "Unemployment", labelAr: "البطالة", unit: "%", higherBetter: false },
  { key: "inflation", label: "Inflation", labelAr: "التضخم", unit: "%", higherBetter: false },
  { key: "renewableEnergy", label: "Renewable Energy", labelAr: "الطاقة المتجددة", unit: "%", higherBetter: true },
  { key: "co2PerCapita", label: "CO2 Per Capita", labelAr: "انبعاثات CO2", unit: "t", higherBetter: false },
  { key: "internetPenetration", label: "Internet Penetration", labelAr: "انتشار الإنترنت", unit: "%", higherBetter: true },
  { key: "corruptionIndex", label: "Corruption Index", labelAr: "مؤشر الفساد", unit: "/100", higherBetter: true },
  { key: "humanDevelopmentIndex", label: "Human Development", labelAr: "التنمية البشرية", unit: "/1", higherBetter: true },
  { key: "literacyRate", label: "Literacy Rate", labelAr: "معدل الإلمام", unit: "%", higherBetter: true },
  { key: "lifeExpectancy", label: "Life Expectancy", labelAr: "الأمل في الحياة", unit: "yrs", higherBetter: true },
  { key: "povertyRate", label: "Poverty Rate", labelAr: "معدل الفقر", unit: "%", higherBetter: false },
];

export function getRankings(indicatorKey: string, higherBetter: boolean) {
  const sorted = [...countries].sort((a, b) => {
    const valA = a[indicatorKey as keyof CountryData] as number;
    const valB = b[indicatorKey as keyof CountryData] as number;
    return higherBetter ? valB - valA : valA - valB;
  });
  return sorted;
}

export interface TimelineData {
  year: number;
  jordan: number;
  saudi: number;
  uae: number;
  iraq: number;
  lebanon: number;
  libya: number;
  palestine: number;
  kuwait: number;
}

export const gdpTimeline: TimelineData[] = [
  { year: 2020, jordan: 43.91, saudi: 703.37, uae: 359.14, iraq: 172.06, lebanon: 32.49, libya: 19.18, palestine: 15.56, kuwait: 105.95 },
  { year: 2021, jordan: 45.44, saudi: 833.54, uae: 415.02, iraq: 207.89, lebanon: 23.12, libya: 33.56, palestine: 17.48, kuwait: 135.73 },
  { year: 2022, jordan: 48.79, saudi: 1108.57, uae: 499.67, iraq: 264.18, lebanon: 21.78, libya: 40.95, palestine: 18.64, kuwait: 161.82 },
  { year: 2023, jordan: 50.72, saudi: 1068.78, uae: 509.01, iraq: 250.62, lebanon: 18.08, libya: 40.95, palestine: 19.56, kuwait: 159.69 },
  { year: 2024, jordan: 53.35, saudi: 1106.70, uae: 527.80, iraq: 265.89, lebanon: 21.78, libya: 43.76, palestine: 20.45, kuwait: 167.70 },
];

export const inflationTimeline: TimelineData[] = [
  { year: 2020, jordan: 0.33, saudi: 3.4, uae: -2.1, iraq: 0.6, lebanon: 84.9, libya: 22.6, palestine: 1.2, kuwait: 2.1 },
  { year: 2021, jordan: 1.35, saudi: 3.1, uae: 0.2, iraq: 6.0, lebanon: 154.8, libya: 2.9, palestine: 1.2, kuwait: 3.4 },
  { year: 2022, jordan: 4.23, saudi: 2.5, uae: 4.8, iraq: 5.0, lebanon: 171.2, libya: 4.5, palestine: 3.7, kuwait: 4.0 },
  { year: 2023, jordan: 2.08, saudi: 2.3, uae: 1.6, iraq: 3.8, lebanon: 45.0, libya: 2.7, palestine: 3.0, kuwait: 3.5 },
  { year: 2024, jordan: 1.56, saudi: 1.9, uae: 1.8, iraq: 4.5, lebanon: 12.0, libya: 2.7, palestine: 2.5, kuwait: 3.0 },
];

export interface AIIndicator {
  id: string;
  name: string;
  nameAr: string;
  value: number;
  benchmark: number;
  trend: "up" | "down" | "stable";
  status: "good" | "warning" | "critical";
  description: string;
}

export const aiIndicators: AIIndicator[] = [
  { id: "gdp_growth", name: "GDP Growth", nameAr: "نمو الناتج المحلي", value: 2.5, benchmark: 3.0, trend: "stable", status: "good", description: "Economic growth remains moderate but stable" },
  { id: "inflation", name: "Inflation Rate", nameAr: "معدل التضخم", value: 1.56, benchmark: 2.5, trend: "down", status: "good", description: "Low and stable inflation, below target" },
  { id: "unemployment", name: "Unemployment", nameAr: "معدل البطالة", value: 20.8, benchmark: 12.0, trend: "down", status: "critical", description: "Unemployment remains structurally high" },
  { id: "fdi", name: "FDI Inflows", nameAr: "الاستثمار الأجنبي", value: 1635, benchmark: 2000, trend: "up", status: "warning", description: "FDI recovering but below potential" },
  { id: "forex", name: "Foreign Reserves", nameAr: "الاحتياطيات الأجنبية", value: 14711, benchmark: 15000, trend: "up", status: "good", description: "Reserves adequate for import coverage" },
  { id: "renewable", name: "Renewable Energy", nameAr: "الطاقة المتجددة", value: 29, benchmark: 31, trend: "up", status: "good", description: "On track for 2030 target of 50%" },
  { id: "debt", name: "Public Debt/GDP", nameAr: "الدين العام/الناتج", value: 88.5, benchmark: 77.0, trend: "down", status: "critical", description: "Debt remains elevated but declining" },
  { id: "tourism", name: "Tourism Recovery", nameAr: "تعافي السياحة", value: 95, benchmark: 100, trend: "up", status: "good", description: "Tourism near pre-pandemic levels" },
];
