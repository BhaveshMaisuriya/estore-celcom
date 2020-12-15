import { storiesOf } from '@storybook/angular';
import { boolean, text, number, withKnobs, object } from '@storybook/addon-knobs';
import { Component, OnInit, Input } from '@angular/core';
import gsap from "gsap";
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'test-cmp',
    styles: [
        `
        .scene-container {
            max-width: 844px;
            height: 333px;
            position: relative;
            overflow: hidden;
        }
        #img-bg {
            height: 100%;
            max-width: unset;
            position: absolute;
            top: 0;
            left: 0;
        }
        #character-container {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 150px;
            width: 150px;
            overflow: hidden;
        }
        #character-container img {
            max-width: unset;
            cursor: pointer;
        }
        `
    ],
    template: `
        <div class="scene-container">
            <img id="img-bg" src="https://res.cloudinary.com/imhaf/image/upload/c_scale,h_333,w_884/v1595321943/gamification/BG.png">
            <div id="character-container">
                <img (click)="runCharacter()" src="https://res.cloudinary.com/imhaf/image/upload/c_scale,h_150/v1595321942/gamification/dino.png">
            </div>
        </div>
    `,
})
class TestComponent implements OnInit {
    timeline: gsap.core.Timeline;
    initialized = false;
    played = false;

    ngOnInit(): void {
        this.timeline = gsap.timeline()
        this.timeline.to('#character-container img', 1, {repeat:-1, x: -1945, ease:'steps(9)'});
        this.timeline.to('#character-container', {duration: 3, x: '500'});
        this.timeline.pause();
        this.initialized = true;
        // GSDevTools.create();
    }

    runCharacter() {
        if (!this.played) {
            this.played = true;
            this.timeline.play();
        } else {
            this.played = false;
            this.timeline.restart();
            this.timeline.pause();
        }
    }

}

storiesOf('Gamification', module).add('GSAP Animation', () => ({
    template: `
        <test-cmp></test-cmp>
    `,
    decorators: [
        withKnobs
    ],
    props: {
        // x: number('x', -2250)
    },
    moduleMetadata: {
        declarations: [
            TestComponent,
        ],
        imports: [
            FormsModule,
        ]
    },
}),
    {
        knobs: {
            escapeHTML: false,
        }
    });
