
import { Injectable } from '@angular/core';
import { SurveyTree, Species } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CarbonCalculationService {

  constructor() { }

  /**
   * Calculates the carbon stock and CO2 equivalent for a single tree.
   * Follows the methodology from the planning document.
   *
   * @param tree The surveyed tree data.
   * @param species The species data containing allometric parameters.
   * @returns An object containing AGB, BGB, total biomass, carbon stock, and CO2e.
   */
  calculateTreeCarbon(tree: SurveyTree, species: Species): { agb: number, bgb: number, totalBiomass: number, carbonStock: number, co2e: number } {
    if (!tree || !species) {
      throw new Error('SurveyTree and Species data must be provided.');
    }

    // 1. Calculate Above-ground Biomass (AGB) in kg
    // AGB = a * DBH^b * H^c
    const { a, b, c } = species.allometricParams;
    let agb: number;

    // Tier 2: Use height-inclusive formula ONLY if 'c' is a valid number.
    if (typeof c === 'number' && typeof tree.height === 'number') {
      agb = a * Math.pow(tree.dbh, b) * Math.pow(tree.height, c);
    }
    // Tier 1 / Fallback: Use DBH-only formula.
    else {
      agb = a * Math.pow(tree.dbh, b);
    }

    // 2. Calculate Below-ground Biomass (BGB) in kg
    // BGB = AGB * Root-to-Shoot Ratio
    const bgb = agb * species.rootToShootRatio;

    // 3. Calculate Total Biomass
    const totalBiomass = agb + bgb;

    // 4. Calculate Carbon Stock (C_stock) in kg
    // C_stock = Total Biomass * Carbon Fraction
    const carbonStock = totalBiomass * species.carbonFraction;

    // 5. Calculate CO2 Equivalent (CO2e) in kg
    // CO2e = C_stock * (44 / 12)
    const co2e = carbonStock * (44 / 12);

    return {
      agb,
      bgb,
      totalBiomass,
      carbonStock,
      co2e
    };
  }
}
