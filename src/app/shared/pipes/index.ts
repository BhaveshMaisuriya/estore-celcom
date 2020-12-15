import { NumberStandardFilter } from './number-standard.pipe';
import { OrderFilter } from './order-filter.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';
import { SearchHighlight } from './search-highlight.pipe';
import { FormatTimePipe } from './format-time.pipe'

export const sharedPipes = [
    NumberStandardFilter,
    OrderFilter,
    SafeHtmlPipe,
    SearchHighlight,
    FormatTimePipe,
];
