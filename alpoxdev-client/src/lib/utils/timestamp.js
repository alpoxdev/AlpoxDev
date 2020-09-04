export const getTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);

    return { year, month, day };
};

export function parseTimestamp(timestamp) {
    const { year, month, day } = getTimestamp(timestamp);
    return `${year}년 ${month}월 ${day}일`;
}
