import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Coordinate } from '../../models/coordinate';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  constructor(
    private readonly fb: FormBuilder,
    private dataService: DataService,
    public readonly dialogRef: MatDialogRef<AddComponent>
  ) {}

  public submitted = false;
  public addingForm: FormGroup = this.fb.group({
    name: ['Благородное собрание', [Validators.required]],
    description: ["test description"],
    hint: ['подсказка'],
    location_lat: ['55.758850', [Validators.required]], // супер крутую валидацию не делал.
    location_long: ['37.616385', [Validators.required]],
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
}
