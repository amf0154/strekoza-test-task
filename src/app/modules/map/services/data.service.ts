import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Coordinate } from '../models/coordinate';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  
  constructor() {}

  private readonly storageKey = 'mapData';
  private coordinates: Array<Coordinate> = [
    {
      location: [55.759353, 37.615323],
      hint: {
        balloonContentHeader: 'Новый Манеж',
        balloonContentBody:
          'Выставочное пространство, расположенное в бывшем здании Георгиевской электрической станции XIX века. Открытие состоялось в 1995 году по инициативе Юрия Лужкова. По состоянию на 2018 год здание входит в состав Московского выставочного объединения «Манеж», в помещениях проходят выставки русского искусства',
        hintContent: 'Новый Манеж',
      },
    },
    {
      location: [55.758555, 37.613951],
      hint: {
        balloonContentHeader: 'Усадьба Маттейсена',
        balloonContentBody:
          'В XVIII веке между современными Георгиевским и Камергерским переулками, Тверской улицей и несохранившимся Георгиевским монастырём располагались две усадьбы — князей М. Н. Волконского и С. М. Голицына. В начале XIX века оба владения объединил тайный советник и камергер П. П. Бекетов.',
        hintContent: 'Усадьба Маттейсена',
      },
    },
    {
      location: [55.759395, 37.614551],
      hint: {
        balloonContentHeader: 'Московский союз литераторов',
        balloonContentBody:
          'Региональное общественное объединение творческих работников в области литературы, творческий союз, созданный для защиты  профессиональных интересов и книгоиздания.',
        hintContent: 'Московский союз литераторов',
      },
    },
  ];

  public $coordinates = new BehaviorSubject<Array<Coordinate>>(
    this.getPointList()
  );

  public addPoint(item: Coordinate): void {
    const existedData = this.$coordinates.value;
    existedData.push(item);
    this.$coordinates.next(existedData);
    this.saveDataLocal();
  }

  private saveDataLocal(): void {
    const data = JSON.stringify(this.$coordinates.value);
    window.localStorage.setItem(this.storageKey, data);
  }

  public hasData(): Observable<boolean> {
    return this.$coordinates.pipe(map((val) => val.length !== 0))
  }

  public removePoint(i: number) {
    const data = this.$coordinates.value;
    data.splice(i, 1);
    console.log(data)
    this.$coordinates.next(data);
    this.saveDataLocal();
  }

  private getPointList(): Array<Coordinate> {
    const items = localStorage.getItem(this.storageKey);
    const data = items ? JSON.parse(items) : this.coordinates;
    return data;
  }
}
