import { NumberChooserComponent } from './number-chooser/number-chooser.component';
import { PageLoaderComponent } from './page-loader/page-loader.component';
import { StaticHeroBannerComponent } from './static-hero-banner/static-hero-banner.component';
import { ModalComponent } from './modal/modal.component';
import { McLoginComponent } from './mc-login/mc-login.component';
import { NewOtpInputComponent } from './new-otp-input/new-otp-input.component';
import { PlanCardComponent } from './plan-card/plan-card.component';
import { DeviceCardComponent } from './device-card/device-card.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ShopPlanBannerComponent } from './shop-plan-banner/shop-plan-banner.component';
import { CopyLinkFormComponent } from './copy-link-form/copy-link-form.component';
import { BasePlanWrapperComponent } from './plans/base-plan-wrapper/base-plan-wrapper.component';
import { AddonPlanWrapperComponent } from './plans/addon-plan-wrapper/addon-plan-wrapper.component';
import { NewLineWrapperComponent } from './plans/new-line-wrapper/new-line-wrapper.component';
import { TypeofPurchaseWrapperComponent } from './type-of-purchase/typeof-purchase-wrapper/typeof-purchase-wrapper.component';
import { SupplementaryLineWrapperComponent } from './type-of-purchase/supplementary-line-wrapper/supplementary-line-wrapper.component';
import { DeviceCarouselComponent } from './device-carousel/device-carousel.component';
import { DeviceDetailSpecsComponent } from './device-detail-specs/device-detail-specs.component';
import { forms } from './forms';
import { CobpWrapperComponent } from './plans/cobp-wrapper/cobp-wrapper.component';
import { MnpWrapperComponent } from './mnp-wrapper/mnp-wrapper.component';
import { CardOptionsComponent } from './card-options/card-options.component';
import {DeviceColorStoragePickerComponent} from "./device-color-storage-picker/device-color-storage-picker.component";
import { NotesComponent } from './notes/notes.component';
import { DeviceSwitchGuidesComponent } from './device-switch-guides/device-switch-guides.component';
import { GamificationComponent } from './gamification/bike-gamification/gamification.component';
import { InternetPassWrapperComponent } from './plans/internet-pass-wrapper/internet-pass-wrapper.component'
import { DeviceComboCardComponent } from './device-combo-card/device-combo-card.component';
import {LifestyleVoucherWrapperComponent} from './plans/lifestyle-voucher-wrapper/lifestyle-voucher-wrapper.component'
import { OmniBannerComponent } from './omni-banner/omni-banner.component';
import { MoonDeviceCardComponent } from './moon/moon-device-card/moon-device-card.component';
import { MoonDeviceCardWrapperComponent } from './moon/moon-device-card-wrapper/moon-device-card-wrapper.component';
import { ClawGamificationComponent } from './gamification/claw-gamification/claw-gamification.component';
import { TnpsPopupComponent } from './tnps-popup/tnps-popup.component';
import { DeviceComboWrapperComponent } from './device-combo-wrapper/device-combo-wrapper.component';
import { EstoreButtonMenuComponent } from './estore-button-menu/estore-button-menu.component';
import { CobpNumberChooserComponent } from './device-combo/cobp-number-chooser/cobp-number-chooser.component';
import { COBPInstructionsComponent } from './cobp-instructions/cobp-instructions.component';

import { helpers } from './helpers';

export const sharedComponents = [
    NumberChooserComponent,
    PageLoaderComponent,
    StaticHeroBannerComponent,
    ModalComponent,
    McLoginComponent,
    NewOtpInputComponent,
    PlanCardComponent,
    DeviceCardComponent,
    DeviceComboCardComponent,
    PaginationComponent,
    ShopPlanBannerComponent,
    CopyLinkFormComponent,

    ...forms,

    BasePlanWrapperComponent,
    AddonPlanWrapperComponent,
    TypeofPurchaseWrapperComponent,
    NewLineWrapperComponent,
    SupplementaryLineWrapperComponent,
    CobpWrapperComponent,
    DeviceCarouselComponent,
    DeviceDetailSpecsComponent,
    MnpWrapperComponent,
    CardOptionsComponent,
    DeviceColorStoragePickerComponent,
    NotesComponent,
    DeviceSwitchGuidesComponent,
    GamificationComponent,
    ClawGamificationComponent,
    LifestyleVoucherWrapperComponent,
    OmniBannerComponent,

    MoonDeviceCardComponent,
    MoonDeviceCardWrapperComponent,

    TnpsPopupComponent,
    InternetPassWrapperComponent,
    DeviceComboWrapperComponent,
    EstoreButtonMenuComponent,
    CobpNumberChooserComponent,
    COBPInstructionsComponent,

    ...helpers,
];
