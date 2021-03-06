import { shell } from 'electron';
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { GitError, GitSyncWithRemoteResult } from '../../../../core/git';


export type VcsSyncMessageBoxType = 'success' | 'error';


@Component({
    selector: 'gd-vcs-sync-message-box',
    templateUrl: './vcs-sync-message-box.component.html',
    styleUrls: ['./vcs-sync-message-box.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'VcsSyncMessageBox',
        '[class.VcsSyncMessageBox--type-success]': 'type === "success"',
        '[class.VcsSyncMessageBox--type-error]': 'type === "error"',
    },
})
export class VcsSyncMessageBoxComponent implements OnInit {
    @Input() processing: boolean;
    @Input() type: VcsSyncMessageBoxType;
    @Input() successResult: GitSyncWithRemoteResult | null = null;
    @Input() error: GitError | null = null;
    @Output() readonly dismiss = new EventEmitter<void>();

    get headIconName(): string {
        switch (this.type) {
            case 'success':
                return 'check';
            case 'error':
                return 'exclamation-triangle';
        }
    }

    get headTitle(): string {
        switch (this.type) {
            case 'success':
                return 'Sync Success';
            case 'error':
                return 'Sync Fail';
        }
    }

    get contentExists(): boolean {
        return (this.type === 'success' && !!this.successResult)
            || (this.type === 'error' && !!this.error);
    }

    ngOnInit(): void {
    }

    dismissThis(): void {
        this.dismiss.emit();
    }

    openRemoteUrl(url: string): void {
        shell.openExternal(url);
    }
}
