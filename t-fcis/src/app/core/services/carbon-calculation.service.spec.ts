
import { TestBed } from '@angular/core/testing';
import { CarbonCalculationService } from './carbon-calculation.service';
import { SurveyTree, Species } from '../models';

describe('CarbonCalculationService', () => {
  let service: CarbonCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarbonCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should correctly calculate carbon stock for a tree', () => {
    const mockTree: SurveyTree = {
      id: 't1',
      treeNumber: 1,
      speciesCode: 'CRYJA',
      dbh: 30, // cm
      height: 20, // m
    };

    const mockSpecies: Species = {
      code: 'CRYJA',
      scientificName: 'Cryptomeria japonica',
      commonName: '柳杉',
      allometricParams: { a: 0.154, b: 2.46 }, // Using DBH-only for simplicity in this test
      woodDensity: 0.35,
      carbonFraction: 0.5,
      rootToShootRatio: 0.23
    };

    const result = service.calculateTreeCarbon(mockTree, mockSpecies);

    // Expected values based on manual calculation:
    // AGB = 0.154 * (30 ^ 2.46) = 0.154 * 3405.08 = 524.38 kg
    // BGB = 524.38 * 0.23 = 120.61 kg
    // Total Biomass = 524.38 + 120.61 = 644.99 kg
    // Carbon Stock = 644.99 * 0.5 = 322.50 kg
    // CO2e = 322.50 * (44 / 12) = 1182.48 kg

    expect(result.agb).toBeCloseTo(524.38, 2);
    expect(result.bgb).toBeCloseTo(120.61, 2);
    expect(result.totalBiomass).toBeCloseTo(644.99, 2);
    expect(result.carbonStock).toBeCloseTo(322.50, 2);
    expect(result.co2e).toBeCloseTo(1182.48, 2);
  });
});
