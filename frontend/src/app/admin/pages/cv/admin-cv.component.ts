import { Component, OnInit, signal } from '@angular/core';
import { AdminCvService, CvDoc } from '../../services/admin-cv.service';
import { toAssetUrl } from '../../../shared/asset-url';

@Component({
    selector: 'app-admin-cv',
    standalone: true,
    imports: [],
    templateUrl: './admin-cv.component.html',
    styleUrl: './admin-cv.component.css'
})
export class AdminCvComponent implements OnInit {

    cv = signal<CvDoc | null>(null);
    uploading = signal(false);
    reparsing = signal(false);
    message = signal('');

    constructor(private service: AdminCvService) {}

    ngOnInit(): void {
        this.load();
    }

    load(): void {
        this.service.getAll().subscribe(x => {
            this.cv.set(
                x.find(c => !c.deleted) || null
            );
        });
    }

    pdfUrl(): string {
        return this.cv()
            ? toAssetUrl(this.cv()!.filePath, '')
            : '';
    }

    onFileSelected(e: Event): void {
        const f = (e.target as HTMLInputElement).files?.[0];

        if (!f || f.type !== 'application/pdf') {
            this.message.set('Please choose a PDF file.');
            return;
        }

        this.uploading.set(true);

        this.service.upload(f).subscribe({
            next: c => {
                this.cv.set(c);
                this.uploading.set(false);
                this.message.set('CV uploaded and parsed.');
            },

            error: x => {
                this.uploading.set(false);
                this.message.set(
                    x.error?.message || 'Upload failed.'
                );
            }
        });
    }

    hide(): void {
        this.service.hide().subscribe({
            next: c => {
                this.cv.set(c);
                this.message.set(
                    'CV hidden from the public site.'
                );
            }
        });
    }

    show(): void {
        this.service.setVisibility(true).subscribe({
            next: c => {
                this.cv.set(c);
                this.message.set(
                    'CV visible on the public site.'
                );
            }
        });
    }

    remove(): void {
        const c = this.cv();

        if (!c || !confirm('Delete the CV permanently?')) {
            return;
        }

        this.service.delete().subscribe({
            next: () => {
                this.cv.set(null);
                this.message.set('CV permanently deleted.');
            }
        });
    }

    reparse(): void {
        this.reparsing.set(true);

        this.service.reparse().subscribe({
            next: c => {
                this.cv.set(c);
                this.reparsing.set(false);
                this.message.set('CV re-parsed.');
            },

            error: x => {
                this.reparsing.set(false);
                this.message.set(
                    x.error?.message || 'Re-parse failed.'
                );
            }
        });
    }
}