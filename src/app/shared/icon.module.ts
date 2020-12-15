// Third Example - icon module
import { NgModule } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

export const ESTORE_ICONLIST = [
  'estore-check',
  'estore-check-circle',
  'estore-times',
  'estore-share',
  'estore-disabled',
  'estore-close',
  'estore-chevron-left',
  'estore-chevron-right',
  'estore-chevron-up',
  'estore-chevron-down',
  'estore-emoji-2',
  'estore-emoji-3',
  'estore-emoji-4',
  'estore-exclamation-triangle',
  'estore-times-block',
];

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
  ],
  exports: [],
  providers: []
})
export class IconModule {
  private path: string = 'assets/img/svg';
  constructor(
    private domSanitizer: DomSanitizer,
    public matIconRegistry: MatIconRegistry
  ) {
    this.matIconRegistry
      .addSvgIcon('game-icon', this.setIconPath(`${this.path}/icons/game-icon.svg`))
      .addSvgIcon('sim-expressive', this.setIconPath(`${this.path}/mnp-sim-verify/sim_expressive.svg`))
      .addSvgIcon('account-profile', this.setIconPath(`${this.path}/mnp-sim-verify/account_profile.svg`))
      .addSvgIcon('sim-icon', this.setIconPath(`${this.path}/mnp-sim-verify/sim_icon.svg`))
      .addSvgIcon('tick-icon', this.setIconPath(`${this.path}/mnp-sim-verify/tick_icon.svg`))
      .addSvgIcon('sim-card-sample', this.setIconPath(`${this.path}/mnp-sim-verify/sim_card.svg`));
    ESTORE_ICONLIST.forEach(i => {
      this.matIconRegistry.addSvgIcon(i, this.setIconPath(`${this.path}/${i}.svg`));
    })
  }

  private setIconPath(icon: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(icon);
  }
}