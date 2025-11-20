
// Using interfaces for clear data contracts
// PascalCase for type names, camelCase for properties

/**
 * Represents a single survey project.
 */
export interface Project {
  id: string; // Unique identifier
  name: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
}

/**
 * Represents a single sample plot within a project.
 */
export interface SamplePlot {
  id: string; // Unique identifier
  projectId: string; // Foreign key to Project
  plotNumber: string; // User-defined plot number/code
  location: {
    latitude: number;
    longitude: number;
    altitude?: number;
    pdop?: number; // Positional Dilution of Precision
  };
  slope: number; // In degrees
  aspect: number; // In degrees from North
  photos?: {
    north: string;
    east: string;
    south: string;
    west: string;
    canopy: string; // Sky view
    ground: string;
  };
  nestedPlots: NestedPlot[];
  surveyDate: Date;
  surveyor: string;
}

/**
 * Represents a nested plot within a main sample plot.
 */
export interface NestedPlot {
  id: string;
  type: 'Main' | 'Sub' | 'Regeneration';
  radius: number; // Horizontal radius in meters
  slopeCorrectedRadius: number; // Calculated radius based on slope
  areaHa: number; // Area in hectares
  trees: SurveyTree[];
}

/**
 * Represents a single tree or bamboo surveyed.
 */
export interface SurveyTree {
  id: string;
  treeNumber: number;
  speciesCode: string; // Code to link to Species table
  dbh: number; // Diameter at Breast Height in cm
  height?: number; // Total height in meters
  isDeadwood?: boolean;
  decompositionClass?: number; // For deadwood
  isBamboo?: boolean;
  bambooAge?: number; // For bamboo (1-year, 2-year, etc.)
  notes?: string;
}

/**
 * Represents a tree species with its specific parameters for carbon calculation.
 */
export interface Species {
  code: string; // e.g., 'CRYJA'
  scientificName: string;
  commonName: string;
  allometricParams: {
    a: number;
    b: number;
    c?: number;
  };
  woodDensity: number; // Mg/m^3
  carbonFraction: number; // Default 0.5
  rootToShootRatio: number;
}
