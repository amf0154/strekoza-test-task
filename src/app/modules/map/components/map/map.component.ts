import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { YaReadyEvent } from 'angular8-yandex-maps';
import { Coordinate } from '../../models/coordinate';
import { DataService } from '../../services/data.service';
import { AddComponent } from '../add/add.component';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  constructor(
    private readonly dialog: MatDialog,
    public readonly data: DataService
  ) {}

  public readonly initialMapPosition = [55.759425, 37.612926];
  public map: ymaps.Map | any;
  public readonly initialMapZoom = 17;

  public onMapReady(event: YaReadyEvent<ymaps.Map>): void {
    this.map = event.target;
  }

  public addPoint(): void {
    this.dialog
      .open(AddComponent, {
        width: '600px',
      })
      .afterClosed()
      .subscribe((coords: Coordinate | undefined) => {
        if (coords) {
          this.openPoint(coords);
        }
      });
  }

  public control(): void {
    this.dialog
      .open(EditComponent, {
        width: '600px',
      })
      .afterClosed()
      .subscribe();
  }

  private openPoint(point: Coordinate) {
    this.map.zoomRange.get(point.location).then((range: any) => {
      this.map.setCenter(point.location, range[1]);
    });
  }
}
