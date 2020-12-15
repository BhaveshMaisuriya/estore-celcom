import { Component, Input, AfterViewInit } from '@angular/core';
import gsap from "gsap";

@Component({
  selector: 'app-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.css']
})
export class PageLoaderComponent implements AfterViewInit {

  @Input() type: 'legacy' | 'new' | 'material' = 'new';

  constructor() { }

  ngAfterViewInit(): void {
    if (this.type === 'new') {
      // const tl = gsap.timeline({
      //   repeat: -1,
      //   repeatDelay: 0.5,
      // });
      // tl.fromTo(".dot", .4, {scale: 1}, {
      //   scale: 1.2,
      //   borderColor: '#009bdf',
      //   borderWidth: '2px',
      //   // repeat: -1,
      //   stagger: {
      //     from: "start",
      //     each: .1,
      //     // repeat: -1,
      //   }
      // });
      const tl = gsap.timeline({
        // repeat: -1,
        // repeatDelay: 2,
        defaults: {
          duration: .5,
        }
      });
      tl.fromTo(".dot:nth-child(1)", {scale: 0}, {
        scale: 1.2,
        borderColor: '#009bdf',
        borderWidth: '2px',
        yoyo: true,
        repeat: -1,
      });
      tl.fromTo(".dot:nth-child(2)", {scale: 0}, {
        scale: 1.2,
        borderColor: '#009bdf',
        borderWidth: '2px',
        yoyo: true,
        repeat: -1,
      }, "-=.2");
      tl.fromTo(".dot:nth-child(3)", {scale: 0}, {
        scale: 1.2,
        borderColor: '#009bdf',
        borderWidth: '2px',
        yoyo: true,
        repeat: -1,
      }, "-=.2");
    }
  }

}
