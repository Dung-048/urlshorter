export function sameAs(value: unknown) {
    return (v: string | undefined | null) =>
        String(v).toUpperCase() === String(value).toUpperCase();
}

export function formatPercent(value: number) {
    return Math.round(value * 100);
}
