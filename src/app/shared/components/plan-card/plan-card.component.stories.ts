import { storiesOf } from '@storybook/angular';
import { PlanCardComponent } from 'app/shared/components/plan-card/plan-card.component';
import { SafeHtmlPipe } from 'app/shared/pipes/safe-html.pipe';
import { boolean, text, withKnobs, object } from '@storybook/addon-knobs';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from 'app/shared/icon.module';

storiesOf('Plans/plan-card-component', module).add('General', () => ({
    template: `
        <h3>Default</h3>
        <div class="row">
            <div class="col-md-3">
                <app-plan-card 
                    (click)="selected != selected"
                    [useMaterialTheme]="useMaterialTheme"
                    [selected]="selected" 
                    [pricetag]="pricetag" 
                    [title]="title"
                    [collapsibleFooter]="false"
                    [height100]="true"
                    [image]="image"
                    [promotion_text]="promotion_text"
                    [promotion_badge]="promotion_badge"
                    [footerTemplate]="footer">
                    
                    <ng-template #footer>
                        <div [innerHTML]="footerText | safeHtml" >
                        </div>
                    </ng-template>
                </app-plan-card>
            </div>
        </div>
    `,
    styles: [
        `
        `
    ],
    decorators: [
        withKnobs
    ],
    props: {
        useMaterialTheme: boolean('useMaterialTheme', true),
        selected: boolean('selected', true),
        image: text('image [url]', 'https://res.cloudinary.com/imhaf/image/upload/c_scale,q_auto:best,w_200/v1592188327/celcom/unlimited_1_0.png'),
        title: text('title [html]', 'Mega&trade; Unlimited'),
        pricetag: text('pricetag [html]', 'RM100'),
        promotion_text: text(`promotion_text [html]`, 'Get 50% off for 3 months<br> (including base plan)*'),
        promotion_badge: object(`promotion_badge [json]`,
        {
            "promotion_badge_text": "Online Exclusive",
            "promotion_badge_text_color": "#ffffff",
            "promotion_badge_background_color": "#c40d42"
        }),
        footerText: text('footer [html]', `
        <span>30GB monthly high-speed Internet</span><br />
        <span>Unlimited calls to all networks</span><br />
        <span>RM0.20 per SMS</span>
    `),
    },
    moduleMetadata: {
        declarations: [PlanCardComponent, SafeHtmlPipe],
        imports: [
            MatIconModule,
            IconModule,
        ],
    },
}),
{
    knobs: {
        escapeHTML: false,
    }
});
