import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { YaReadyEvent } from 'angular8-yandex-maps';
import { ToastrService } from 'ngx-toastr';
import { Coordinate } from '../../models/coordinate';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss'],
})
export class PointComponent {
  constructor(
    public readonly dataService: DataService,
    public readonly dialogRef: MatDialogRef<PointComponent>,
    private readonly toastr: ToastrService
  ) {}

  public map: ymaps.Map | any;
  public myPoint: ymaps.Placemark | any;
  public selectedCoords: Coordinate['location'] = [];

  public createPlacemark(coords: any): ymaps.Placemark {
    return new ymaps.Placemark(coords, {
      preset: 'islands#violetDotIconWithCaption',
      draggable: true,
    });
  }

  public onMapReady(event: YaReadyEvent<ymaps.Map>): void {
    this.map = event.target;
    this.map.events.add('click', (e: any) => {
      const coords = (this.selectedCoords = e.get('coords'));
      if (this.myPoint) {
        this.myPoint.geometry.setCoordinates(coords);
      } else {
        this.myPoint = this.createPlacemark(coords);
        this.map.geoObjects.add(this.myPoint);
      }
    });
  }

  public save(): void {
    if (!this.selectedCoords.length) {
      this.toastr.error('выберите точку на карте!');
      return;
    }
    this.dialogRef.close(this.selectedCoords);
  }
}
