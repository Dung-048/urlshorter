import _ from "lodash";

export function formatWeight(weight: number): string {
    if (weight < 0) {
        return '';
    }

    if (weight < 1) {
        return `${_.round(weight * 1000, 1)}mg`;
    }

    return `${_.round(weight, 1)}g`;
}
