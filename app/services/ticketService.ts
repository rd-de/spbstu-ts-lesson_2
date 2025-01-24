import { getTicketById, postTicketData } from "@rest/tickets";
import { initTicketElementTemplate } from "../templates/ticketInfo";
import { initFooterTitle, initHeaderTitle } from "@services/general/general";
import { IVipTicket, TicketType, ITicket } from "../models/ticket/ticket";


export function initTicketInfo(ticket: TicketType | IVipTicket): void {
    const targetElement = document.querySelector<HTMLElement>('.ticket-info');

    if (targetElement) {
        const ticketDescription: string = ticket?.description || '';
        const ticketOperator: string = ticket?.tourOperator || '';
        let vipClientType: string = '';

        if ('vipStatus' in ticket) {
            vipClientType = ticket.vipStatus;
        }

        const ticketElemsArr: [string, string, string] = [ticketDescription, ticketOperator, vipClientType];
        let ticketElemTemplate: string = '';

        ticketElemsArr.forEach((el, i) => {
            ticketElemTemplate += initTicketElementTemplate(el, i);
        });

        targetElement.innerHTML = ticketElemTemplate;
    }
}

export function initUserData(): Record<string, string> {
    const userInfo = document.querySelectorAll<HTMLElement>('.user-info > p');
    const userInfoObj: Record<string, string> = {};

    userInfo.forEach((el) => {
        const inputDataName = el.getAttribute('data-name');
        if (inputDataName) {
            const inputElem = el.querySelector<HTMLInputElement>('input');
            userInfoObj[inputDataName] = inputElem?.value || '';
        }
    });

    return userInfoObj;
}

export function initPostData(data: TicketType): void {
    const userInfo = initUserData();
    console.log('User Info:', userInfo);

    postTicketData(data).then((response) => {
        if (response.success) {
            console.log('Data posted successfully');
        }
    });
}

export function registerConfirmButton(ticketPostInstance: TicketType): void {
    const targetEl = document.getElementById('accept-order-button');
    if (targetEl) {
        targetEl.addEventListener('click', () => {
            initPostData(ticketPostInstance);
        });
    }
}
