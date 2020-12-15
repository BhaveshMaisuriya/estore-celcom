import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { SYS_DOWN_MSG } from 'app/shared/constants/error.constants';

export interface iModalErrorData {
    message: string;
    title?: string;
    btnCancel?: string;
    btnConfirm?: string;
}
@Injectable({ providedIn: 'root' })
export class ModalService {
    private modals: any[] = [];
    public onClosedModal = new BehaviorSubject(null);
    public onShowModal = new BehaviorSubject(null);

    add(modal: any) {
        // add modal to array of active modals
        this.modals.push(modal);
    }

    remove(id: string) {
        // remove modal from array of active modals
        this.modals = this.modals.filter(x => x.id !== id);
    }

    open(id: string) {
        // open modal specified by id
        const modal = this.modals.find(x => x.id === id);
        return modal?.open();
    }

    close(id: string, result = null) {
        // close modal specified by id
        const modal = this.modals.find(x => x.id === id);
        modal?.close(result);
    }

    showError(data: iModalErrorData = null) {
        return this._showModalExclusively('error-popup', data);
    }

    showConfirm(data: iModalErrorData = null) {
        return this._showModalExclusively('confirm-popup', data);
    }

    private _showModalExclusively(modal_id, data: iModalErrorData = null) {
        const modal = this.modals.find(x => x.id === modal_id);
        this.toggleShowHideOtherModal(modal_id);
        return modal?.open(data).pipe(
            tap(_r => this.toggleShowHideOtherModal(modal_id))
        );
    }

    toggleShowHideOtherModal(id: string) {
        const modals = this.modals.filter(x => x.id !== id);
        for (const mdl of modals) {
            mdl.toggleShowHide();
        }
        this.modals.find(x => x.id === id)?.forceVisible(true);
    }
}