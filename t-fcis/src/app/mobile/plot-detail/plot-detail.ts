import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';


import { SamplePlot } from '../../core/models';
import { MockDataService } from '../../core/services/mock-data.service';

@Component({
  selector: 'app-plot-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './plot-detail.html',
  styleUrls: ['./plot-detail.scss'],
})
export class PlotDetailComponent implements OnInit {
  public samplePlot$!: Observable<SamplePlot | undefined>;
  public correctedRadius: number | null = null;
  public mainPlotHorizontalRadius = 12.62; // 0.05 ha

  constructor(
    private route: ActivatedRoute,
    private mockDataService: MockDataService
  ) {}

  ngOnInit(): void {
    const plotId = this.route.snapshot.paramMap.get('id');
    if (plotId) {
      this.samplePlot$ = this.mockDataService.getSamplePlotById(plotId);
    }
  }

  calculateSlopeCorrection(slope: number): void {
    if (slope >= 0 && slope < 90) {
      const slopeInRadians = slope * (Math.PI / 180);
      this.correctedRadius = this.mainPlotHorizontalRadius / Math.sqrt(Math.cos(slopeInRadians));
    } else {
      this.correctedRadius = null;
    }
  }
}
