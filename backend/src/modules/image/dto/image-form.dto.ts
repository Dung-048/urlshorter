import {StringField} from "../../../decorator/field.decorators";

export class ImageFormDto {
    @StringField()
    file: string;
}
