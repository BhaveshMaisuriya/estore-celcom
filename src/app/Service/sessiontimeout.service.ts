import { Injectable } from '@angular/core';
import { of, fromEvent, Observable, interval } from 'rxjs';
import { BaseService } from '../base.service';
import { AppService } from '../Service/app.service';
import { UserService } from '../Service/user.service';
import { NotificationPopupEvent } from "../Service/broadcaster.service";
import { throttleTime, mapTo, debounceTime, startWith, merge, switchMap } from 'rxjs/operators';

@Injectable()
export class SessionTimeOutService extends BaseService {

    public IsIdle = false;
    private DEBOUNE_TIME = 1000;
    private THROTTLE_TIME = 1000;
    private DISPLAY_POPUP_TIME = 360; // 2 * 60 * 3 - 2 mins for 3 events
    // private LOGOUT_TIME = 5400; // 30*60 * 3 not used
    public Counter = 5400; // 30 * 60 * 3 - mins * sec * events
    public MyCounter = 5400; // 30 * 60 * 3 - mins * sec * events
    public CounterDecrement = 1;
    public IsDisplayPopup = false;
    public IsLogOutExplicitly = false;
    private IDLE = "IDLE";
    private TICK = "TICK";
    private MOUSEMOVE_EVENT = "MOUSEMOVE";
    private SCROLLMOVE_EVENT = "SCROLLMOVE";
    private TOUCHMOVE_EVENT = "TOUCHMOVE";
    private CLICK_EVENT = "CLICK";
    private KEYPRESS_EVENT = "KEYPRESS";
    private IsMobileViewPort = false;
    public isCSagent = false;
    public isDealer = false;
    public userType: string;

    constructor(private _service: AppService,
      private _userService: UserService,
      private _brodcastService: NotificationPopupEvent) {
        super();
        this.isCSagent = this._userService.isCSAgent();
        this.isDealer = this._userService.isDealer();
    }

    public RegisterEventListnerForIdleCheck(userType: string) {
        this.userType = userType;
        this.IsMobileViewPort = this.DetermieIsMobileViewPort();
        if (userType === 'dealer') {
            this.userType = 'dealer';
            this.DISPLAY_POPUP_TIME = 180;
            // ? Using the same timeout as `user` for `dealer`
            // private LOGOUT_TIME = 5400; // 30*60 * 3 not used
            // this.Counter = 900; // 5 * 60 * 3 - mins * sec * events
            // this.MyCounter = 900; // 5 * 60 * 3 - mins * sec * events
        }
        this.RegisterListner();
    }

    private RegisterListner() {
        this.RegisterScrollMove();
        this.RegisterClick();
        this.RegisterKeyPress();
    }

    private RegisterMouseMove() {
        const mouse_move = fromEvent(window, 'mousemove')
            .pipe(throttleTime(this.THROTTLE_TIME))
            .pipe(mapTo(false));

        const no_mouse_move = fromEvent(window, 'mousemove')
            .pipe(startWith(0)) // init with no scroll.
            .pipe(debounceTime(this.DEBOUNE_TIME)) // detect no scroll after 300 ms.
            .pipe(mapTo(true));

        mouse_move.pipe(merge(no_mouse_move))
            .pipe(switchMap(e => e ? interval(1000).pipe(mapTo(this.TICK)) : of(this.MOUSEMOVE_EVENT)))
            // start the interval if there was no scroll. Stop the interval if there was a scroll.
            .subscribe(
                (type) => {
                    this.manageEvent(type);
                });
    }
    private RegisterKeyPress() {
        const keypress_event = fromEvent(window, 'keypress')
            .pipe(throttleTime(this.THROTTLE_TIME))
            .pipe(mapTo(false));

        const no_keypress_event = fromEvent(window, 'keypress')
            .pipe(startWith(0)) // init with no scroll.
            .pipe(debounceTime(this.DEBOUNE_TIME)) // detect no scroll after 300 ms.
            .pipe(mapTo(true));

        keypress_event.pipe(merge(no_keypress_event))
            .pipe(switchMap(e => e ? interval(1000).pipe(mapTo(this.TICK)) : of(this.KEYPRESS_EVENT)))
            // start the interval if there was no scroll. Stop the interval if there was a scroll.
            .subscribe(
                (type) => {
                    this.manageEvent(type);
                });
    }
    private RegisterScrollMove() {
        const scroll_move = fromEvent(window, 'scroll')
            .pipe(throttleTime(this.THROTTLE_TIME))
            .pipe(mapTo(false));

        const no_scroll_move = fromEvent(window, 'scroll')
            .pipe(startWith(0)) // init with no scroll.
            .pipe(debounceTime(this.DEBOUNE_TIME)) // detect no scroll after 300 ms.
            .pipe(mapTo(true));

        scroll_move.pipe(merge(no_scroll_move))
            .pipe(switchMap(e => e ? interval(1000).pipe(mapTo(this.TICK)) : of(this.SCROLLMOVE_EVENT)))
            // start the interval if there was no scroll. Stop the interval if there was a scroll.
            .subscribe(
                (type) => {
                    this.manageEvent(type);
                });
    }

    private RegisterTouchMove() {
        const touch_move = fromEvent(window, 'touchstart')
            .pipe(throttleTime(this.THROTTLE_TIME))
            .pipe(mapTo(false));

        const no_touch_move_move = fromEvent(window, 'touchstart')
            .pipe(startWith(0)) // init with no scroll.
            .pipe(debounceTime(this.DEBOUNE_TIME)) // detect no scroll after 300 ms.
            .pipe(mapTo(true));

        touch_move.pipe(merge(no_touch_move_move))
            .pipe(switchMap(e => e ? interval(1000).pipe(mapTo(this.TICK)) : of(this.TOUCHMOVE_EVENT)))
            // start the interval if there was no scroll. Stop the interval if there was a scroll.
            .subscribe(
                (type) => {
                    this.manageEvent(type);
                });
    }

    private RegisterClick() {
        const click_event = fromEvent(window, 'click')
            .pipe(throttleTime(this.THROTTLE_TIME))
            .pipe(mapTo(false));

        const no_click_event = fromEvent(window, 'click')
            .pipe(startWith(0)) // init with no scroll.
            .pipe(debounceTime(this.DEBOUNE_TIME)) // detect no scroll after 300 ms.
            .pipe(mapTo(true));

        click_event.pipe(merge(no_click_event))
            .pipe(switchMap(e => e ? interval(1000).pipe(mapTo(this.TICK)) : of(this.CLICK_EVENT)))
            // start the interval if there was no click. Stop the interval if there was a click.
            .subscribe(
                (type) => {
                    this.manageEvent(type);
                });
    }

    private ManageListnerEvent(type) {
        if (typeof window !== 'undefined' && sessionStorage) {
            if (sessionStorage.getItem('UserInfo') ||
              sessionStorage.getItem('GuestInfo') ||
              sessionStorage.getItem('AgentInfo') ||
              sessionStorage.getItem('DealerInfo')) {

                this.MyCounter = this.MyCounter - this.CounterDecrement;
                if (type === this.TICK) {
                    if (this.MyCounter <= this.DISPLAY_POPUP_TIME) {
                        this.IsDisplayPopup = true;
                        this.IsIdle = true;
                        this.DisplayPopupModalBox();
                    }

                    if (this.MyCounter <= 0) {
                        this.IsLogOutExplicitly = true;
                        // reset/logout/stop
                        if (this.userType === 'dealer') {
                          this._userService.UserLogout();
                        } else {
                          this.LogOut();
                        }
                        this.Reset();
                        this.MyCounter = this.Counter;
                    }
                }
                if (typeof window !== 'undefined' && typeof document !== 'undefined' && localStorage) {
                    localStorage.setItem("IdleCounter", JSON.stringify({ counter: this.MyCounter }));
                }
            }
        }

    }


    private Reset() {
        this.IsIdle = false;
        this.MyCounter = this.Counter;
        this.IsLogOutExplicitly = false;
        this.IsDisplayPopup = false;
    }
    private DisplayPopupModalBox() {
        this.IsDisplayPopup = false;
        const data = {
            Action: "DISPLAY_POPUP",
            IsDisplayPopup: true
        };
        this._brodcastService.fire(data);
    }
    private LogOut() {
        let apiUrl = this.getLogOutApiUrl();
        if (localStorage && localStorage.getItem('sessionHash')) {
            apiUrl = apiUrl + '?sessionHash=' + localStorage.getItem('sessionHash');
        }
        this._service.getEstoreUserData(apiUrl).subscribe(
            (response: any) => {
                this.clearStorage();
            }, (error: any) => {
                this.clearStorage();
            });
    }
    public clearStorage() {
        if (typeof window !== 'undefined') {
            if (localStorage) {
                localStorage.clear();
            }
            if (sessionStorage) {
                sessionStorage.clear();
            }
            window.location.href = this.getLogOutRedirectionUrl();
        }
    }
    public getLogOutApiUrl(): string {
        let url = "/rest/V1/customerLogout";
        if (this.isCSagent || this.isDealer) {
          url = "/rest/V1/agent-logout";
        }
        return url;
    }
    public getLogOutRedirectionUrl(): string {
        let loginUrl = "/";
        if (this.isCSagent) {
            loginUrl = "/store/agentlogin";
        }
        if (this.isDealer) {
            loginUrl = "/store/dealerlogin";
        }
        return loginUrl;
    }
    public manageEvent(type) {
        if (type === this.TICK) {
            this.ManageListnerEvent(type);
        } else {
            this.Reset();
        }
    }

    private DetermieIsMobileViewPort() {
        let isMobile = false;
        if (typeof navigator !== 'undefined') {
            // device detection
            // tslint:disable-next-line:max-line-length
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
                || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
                isMobile = true;
            }
        }
        return isMobile;
    }


}
