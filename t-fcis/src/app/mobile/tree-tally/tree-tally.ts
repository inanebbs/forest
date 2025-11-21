import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { SurveyTree, Species, SamplePlot } from '../../core/models';
import { MockDataService } from '../../core/services/mock-data.service';

@Component({
  selector: 'app-tree-tally',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule
  ],
  templateUrl: './tree-tally.html',
  styleUrls: ['./tree-tally.scss'],
})
export class TreeTallyComponent implements OnInit {
  public plot: SamplePlot | undefined;
  public trees: SurveyTree[] = [];
  public species: Species[] = [];
  public newTreeForm!: FormGroup;
  public isAdding = false;

  constructor(
    private fb: FormBuilder,
    private mockDataService: MockDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const plotId = this.route.snapshot.paramMap.get('id');
    if (plotId) {
      this.mockDataService.getSamplePlotById(plotId).subscribe(plot => {
        if (plot) {
          this.plot = plot;
          // Flatten the trees from all nested plots into a single list
          this.trees = plot.nestedPlots.flatMap(np => np.trees);
        }
      });
    }

    this.newTreeForm = this.fb.group({
      speciesCode: ['', Validators.required],
      dbh: ['', [Validators.required, Validators.min(2)]],
      height: [''],
    });
  }

  startAdding(): void {
    this.isAdding = true;
  }

  cancelAdding(): void {
    this.isAdding = false;
    this.newTreeForm.reset();
  }

  saveTree(): void {
    if (this.newTreeForm.valid) {
      const newTree: SurveyTree = {
        id: `t${this.trees.length + 1}`, // Simple ID generation for mock data
        treeNumber: this.trees.length + 1,
        ...this.newTreeForm.value
      };
      this.trees.push(newTree);
      // In a real app, you'd also save this back to the service/backend
      this.cancelAdding();
    }
  }
}
