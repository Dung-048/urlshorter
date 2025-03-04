import {NumberFieldOptional} from '../decorator/field.decorators';
import {SearchOffset} from './search-offset';

export class SearchOffsetDto {
    @NumberFieldOptional({min: 0})
    skip = 0;

    @NumberFieldOptional({min: 1, max: 100})
    take = 10;

    public static toSearchOffset(search: SearchOffsetDto): SearchOffset {
        return {
            ...search
        };
    }
}
