export const GAS_REFERENCE: Readonly<{ pressureKPa: number; volumeL: number; temperatureC: number }>;
export const WATER_REFERENCE: Readonly<{ massKg: number; initialC: number; specificHeatKJPerKgC: number }>;
export const PRESSURE_SCALE_MAX_KPA: number;
export function idealGasPressure(volumeL: number, temperatureC: number): number;
export function waterTemperature(energyKJ: number): number;
