import { storiesOf } from '@storybook/angular';
import { MatIconModule } from '@angular/material/icon';
import { IconModule, ESTORE_ICONLIST } from 'app/shared/icon.module';
import { Component, Input } from '@angular/core';
import { withKnobs, object, color, number } from '@storybook/addon-knobs';

@Component({
    selector: 'test-cmp',
    template: `
        <div class="container">
            <div class="row">
                <div class="p-0 col-6 col-md-3 col-lg-2 icon-container" *ngFor="let icon of iconList">
                    <div class="icon">
                        <mat-icon
                            [ngStyle]="iconStyle"
                            [svgIcon]="icon">
                        </mat-icon>
                    </div>
                    <div class="label">{{ icon }}</div>
                </div>
            </div>
        </div>
    `,
    styles: [
        `
            .icon-container {
                text-align: center;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                /* justify-content: space-between; */
                color: #495057;
                overflow: hidden;
            }
            .icon-container:hover {
                /* border-color: #333; */
                border-radius: 4px;
                -webkit-box-shadow: 0px 5px 15px 2px rgba(0,0,0,0.27); 
                box-shadow: 0px 5px 15px 2px rgba(0,0,0,0.27);
            }
            .icon-container:hover > .icon {
                background: #009BDF;
                color: white;
            }
            .icon-container:hover mat-icon {
                color: white !important;
            }
            .icon-container .icon {
                padding: 8px;
                /* flex: 1; */
            }
            .icon-container div {
                padding: 8px;
            }
        `
    ]
})
class TestComponent {
    @Input() iconStyle;
    
    @Input()
    public set color(v : string) {
        this._color = v;
        this.populateStyle();
    }

    @Input()
    public set size(v : number) {
        this._size = v;
        this.populateStyle();
    }
    
    iconList = ESTORE_ICONLIST;
    _color: string;
    _size: number;
    constructor() {
        this.iconList = [
            ...ESTORE_ICONLIST.sort(),
        ];
    }

    populateStyle() {
        console.info('update');
        this.iconStyle = {
            'color': this._color,
            'width': `${this._size}px`,
            'height': `${this._size}px`,
        }
    }
}

storiesOf('Components', module).add('Icons', () => ({
    template: `
        <test-cmp
        [color]="color"
        [size]="size"></test-cmp>
    `,
    moduleMetadata: {
        declarations: [
            TestComponent,
        ],
        imports: [
            MatIconModule,
            IconModule,
        ],
    },
    decorators: [
        withKnobs
    ],
    props: {
        color: color('Color', '#495057'),
        size: number('Size', 48, {
            range: true,
            min: 8,
            max: 200,
            step: 8,
        }),
    },
}));
