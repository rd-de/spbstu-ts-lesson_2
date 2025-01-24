import { ITours } from '../models/tours';
import { getTourTemplate } from '../templates/tours';
import { openModal } from '../services/modal/modalService';

export function initToursDivElements(data: ITours[]): void {
  if (Array.isArray(data)) {
    const rootElement: HTMLElement | null = document.querySelector('.main-app');

    const tourWrap: HTMLDivElement = document.createElement('div');
    tourWrap.classList.add('tour-wrap');

    initTourElListener(tourWrap);

    let rootElementData: string = '';
    data.forEach((el: ITours, i: number) => {
      rootElementData += getTourTemplate(el, i);
    });

    tourWrap.innerHTML = rootElementData;
    rootElement?.appendChild(tourWrap);
  }
}

export function initTourElListener(tourWrap: HTMLElement): void {
  tourWrap.addEventListener('click', (ev: MouseEvent) => {
    const targetItem: HTMLElement = ev.target as HTMLElement;
    const parentItem: HTMLElement | null = targetItem.parentElement;
    let realTarget: HTMLElement | null = null;

    if (targetItem.hasAttribute('data-tour-item-index')) {
      realTarget = targetItem;
    } else if (parentItem && parentItem.hasAttribute('data-tour-item-index')) {
      realTarget = parentItem;
    }

    if (realTarget) {
      const dataIndex: string | null = realTarget.getAttribute('data-tour-item-index');
      if (dataIndex) {
        openModal('order', Number(dataIndex));
      }
    }
  });
}