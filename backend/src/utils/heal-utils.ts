import {Gender} from "../modules/user/domain/gender";

export function calLostWeightRate(initialWeight?: number, currentWeight?: number) {
    if (initialWeight == null || currentWeight == null) {
        return 0;
    }

    if (initialWeight <= 0 || currentWeight <= 0 || currentWeight >= initialWeight) {
        return 0;
    }

    return 100.0 * (initialWeight - currentWeight) / initialWeight;
}

export function calIdealWeight(gender: Gender, height: number) {
    if (height <= 0) {
        return 0;
    }

    const addingHeight = 0.91 * (height - 152.4);

    const baseWeight = gender === Gender.MALE ? 50 : 45.5;

    return baseWeight + addingHeight;
}

export function calRecommendedCalories(bmi: number, idealWeight: number) {
    if (bmi < 18.5) {
        return 30 * idealWeight;
    }

    return 25 * idealWeight;
}

export function calRecommendedProtein(bmi: number, idealWeight: number) {
    if (bmi < 18.5) {
        return 1.5 * idealWeight;
    }

    return 1.5 * idealWeight;
}

export function calculateBMI(weight: number, height: number) {
    const heightInMeter = height / 100;

    if (heightInMeter <= 0 || weight <= 0) {
        return 0;
    }

    return weight / (heightInMeter * heightInMeter);
}
