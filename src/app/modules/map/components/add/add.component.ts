import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Coordinate } from '../../models/coordinate';
import { DataService } from '../../services/data.service';
import { PointComponent } from '../point/point.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  constructor(
    private readonly fb: FormBuilder,
    private dataService: DataService,
    private readonly dialog: MatDialog,
    public readonly dialogRef: MatDialogRef<AddComponent>
  ) {}

  public submitted = false;
  public addingForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    description: [''],
    hint: [''],
    location_lat: ['', [Validators.required]], // супер крутую валидацию не делал.
    location_long: ['', [Validators.required]],
  });

  public get f() {
    return this.addingForm.controls;
  }

  public save(): void {
    this.submitted = true;
    if (this.addingForm.invalid) {
      return;
    } else {
      const { name, description, hint, location_lat, location_long } =
        this.addingForm.getRawValue();
      const mapItem: Coordinate = {
        location: [+location_lat, +location_long],
        hint: {
          balloonContentHeader: name,
          balloonContentBody: description,
          hintContent: hint,
        },
      };
      this.dataService.addPoint(mapItem);
      this.dialogRef.close(mapItem);
    }
  }

  public choosePoint(): void {
    this.dialog
      .open(PointComponent, {
        width: '800px',
      })
      .afterClosed()
      .subscribe((coords: Coordinate['location'] | undefined) => {
        if (coords?.length) {
          const [lat, long] = coords;
          this.addingForm.get('location_lat')?.setValue(lat);
          this.addingForm.get('location_long')?.setValue(long);
        }
      });
  }
}
