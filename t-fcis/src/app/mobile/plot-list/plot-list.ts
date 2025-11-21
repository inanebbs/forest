import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { Observable } from 'rxjs';

import { SamplePlot } from '../../core/models';
import { MockDataService } from '../../core/services/mock-data.service';

@Component({
  selector: 'app-plot-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatListModule],
  templateUrl: './plot-list.html',
  styleUrls: ['./plot-list.scss'],
})
export class PlotListComponent implements OnInit {
  public samplePlots$!: Observable<SamplePlot[]>;

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.samplePlots$ = this.mockDataService.getAllSamplePlots();
  }
}
