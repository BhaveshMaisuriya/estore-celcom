import { TestBed } from '@angular/core/testing';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IconModule } from "./icon.module";

describe('IconModule', () => {
    let module: IconModule;

    beforeEach(() => {
        const domSanitizer = TestBed.get(DomSanitizer);
        const matIconRegistry = TestBed.get(MatIconRegistry);

        module = new IconModule(domSanitizer, matIconRegistry);
    });

    it('should create an instance', () => {
        expect(module).toBeTruthy();
    });
});