import _ from "lodash";

export function generateCode(length: number = 6): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
    return _.shuffle(characters).slice(0, length).join('');
}
