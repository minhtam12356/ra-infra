import dayjs from 'dayjs';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(CustomParseFormat);
dayjs.extend(timezone);

const tz = 'Asia/Ho_Chi_Minh';
dayjs.tz.setDefault(tz);

export { dayjs };
