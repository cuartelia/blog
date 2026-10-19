/** Magnitudes físicas de referencia; presiones absolutas, temperaturas en kelvin. */
export const GAS_REFERENCE = Object.freeze({ pressureKPa: 101.325, volumeL: 10, temperatureC: 20 });
export const WATER_REFERENCE = Object.freeze({ massKg: 1, initialC: 20, specificHeatKJPerKgC: 4.184 });
export const PRESSURE_SCALE_MAX_KPA = 350;

/** Presión en kPa de una cantidad constante de gas ideal. */
export function idealGasPressure(volumeL, temperatureC) {
  if (!Number.isFinite(volumeL) || volumeL <= 0 || !Number.isFinite(temperatureC) || temperatureC <= -273.15) {
    throw new RangeError('El volumen debe ser positivo y la temperatura superior al cero absoluto.');
  }
  const initialKelvin = GAS_REFERENCE.temperatureC + 273.15;
  return GAS_REFERENCE.pressureKPa * (GAS_REFERENCE.volumeL / volumeL) * ((temperatureC + 273.15) / initialKelvin);
}

/** Temperatura aproximada del agua, sin pérdidas ni cambio de fase (válido por debajo de 100 °C). */
export function waterTemperature(energyKJ) {
  if (!Number.isFinite(energyKJ) || energyKJ < 0) throw new RangeError('La energía debe ser no negativa.');
  const temperature = WATER_REFERENCE.initialC + energyKJ / (WATER_REFERENCE.massKg * WATER_REFERENCE.specificHeatKJPerKgC);
  if (temperature >= 100) throw new RangeError('Este modelo solo describe agua líquida sin ebullición.');
  return temperature;
}
