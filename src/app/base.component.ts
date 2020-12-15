import { AddWidget } from './Model/addwidget.model';
import { ContentNavigation } from './Model/contentnavigation.model';
import * as ErrorConst from '../constants/error.constants';
import * as FormConst from '../constants/form.constants';
import * as AppConstant from './shared/constants/application.constants';
import { BaseService } from './base.service';
import { environment } from 'environments/environment';

export class BaseComponent extends BaseService {
    public ApiUrl: string = environment.nodeUrl;
    public eStoreUrl: string = environment.eStoreUrl;
    private TemplateType: string;
    public IsXpax = false;
    private APP_TEMPLATE_TYPE = "TemplateType";
    private TEMPLATE_DEFAULT = "default";
    private TEMPLATE_XPAX = "xpax";
    public errorConst: any;
    public formConst: any;
    public appConstant: any;
    public IsMobile = false;
    constructor() {
        super();
        this.InitBase();
        this.errorConst = ErrorConst;
        this.formConst = FormConst;
        this.appConstant = AppConstant;
    }

    private InitBase() {
        if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && localStorage) {
            const templateType = localStorage.getItem(this.APP_TEMPLATE_TYPE);
            if (templateType != null) {
                if (templateType === this.TEMPLATE_XPAX) {
                    this.IsXpax = true;
                    this.TemplateType = templateType;
                } else {
                    this.IsXpax = false;
                    this.TemplateType = templateType;
                }
            }
            this.IsMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent);
        }
    }

    public defaultOnClick() {
        return false;
    }

    public isMobile(): boolean {
        return this.IsMobile;
    }
}
