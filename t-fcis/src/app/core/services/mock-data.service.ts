
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SamplePlot, Species } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  private mockSamplePlots: SamplePlot[] = [
    {
      id: 'plot1',
      projectId: 'proj1',
      plotNumber: 'P001',
      location: {
        latitude: 24.123,
        longitude: 121.456,
        altitude: 1500,
        pdop: 2.5
      },
      slope: 20,
      aspect: 180,
      nestedPlots: [
        {
          id: 'main1',
          type: 'Main',
          radius: 12.62,
          slopeCorrectedRadius: 13.43,
          areaHa: 0.05,
          trees: [
            { id: 't1', treeNumber: 1, speciesCode: 'CRYJA', dbh: 25.5, height: 20.1 },
            { id: 't2', treeNumber: 2, speciesCode: 'TAICR', dbh: 30.1, height: 22.5 },
          ]
        },
        {
          id: 'sub1',
          type: 'Sub',
          radius: 5.64,
          slopeCorrectedRadius: 6.00,
          areaHa: 0.01,
          trees: [
            { id: 't3', treeNumber: 3, speciesCode: 'CRYJA', dbh: 10.2 },
          ]
        }
      ],
      surveyDate: new Date('2024-10-26'),
      surveyor: 'Jules'
    }
  ];

  private mockSpecies: Species[] = [
    {
      code: 'CRYJA',
      scientificName: 'Cryptomeria japonica',
      commonName: '柳杉',
      allometricParams: { a: 0.154, b: 2.46 },
      woodDensity: 0.35,
      carbonFraction: 0.5,
      rootToShootRatio: 0.23
    },
    {
      code: 'TAICR',
      scientificName: 'Taiwania cryptomerioides',
      commonName: '台灣杉',
      allometricParams: { a: 0.13, b: 2.55 },
      woodDensity: 0.416,
      carbonFraction: 0.5,
      rootToShootRatio: 0.23
    }
  ];

  constructor() { }

  getAllSamplePlots(): Observable<SamplePlot[]> {
    return of(this.mockSamplePlots);
  }

  getSamplePlotById(id: string): Observable<SamplePlot | undefined> {
    const plot = this.mockSamplePlots.find(p => p.id === id);
    return of(plot);
  }

  getAllSpecies(): Observable<Species[]> {
    return of(this.mockSpecies);
  }
}
