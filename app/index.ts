import { initToursDivElements } from './services/tourService';
import { ITours } from './models/tours';
import { getTours } from '@rest/tours';
import { initFooterTitle, initHeaderTitle } from '@services/general/general';
import './assets/styles/main.scss';
import {images} from '@services/img/img';

export let toursDataArray: ITours[] = [];
const imagesStore = images;

export function initApp(): void {
  initHeaderTitle('Туры', 'h1');
  initFooterTitle('Туры по всему миру', 'h2');

  getTours().then((data: ITours[]) => {
    toursDataArray = data;
    initToursDivElements(data);
  });
}

initApp();

