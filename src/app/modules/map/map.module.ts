import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './components/map/map.component';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import { AddComponent } from './components/add/add.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './components/edit/edit.component';

const mapConfig: YaConfig = {
  apikey: 'API_KEY',
  lang: 'ru_RU',
};

@NgModule({
  declarations: [
    MapComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    MapRoutingModule,
    MatDialogModule,
    MatButtonModule,
    AngularYandexMapsModule.forRoot(mapConfig),
    FormsModule,
    ReactiveFormsModule
  ],
})
export class MapModule { }
