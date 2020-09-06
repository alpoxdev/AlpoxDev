export const getTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hours = date.getHours();

    // console.log(date);

    return { year, month, day, hours };
};

export const parseTimestamp = (timestamp) => {
    const { year, month, day } = getTimestamp(timestamp);
    return `${year}년 ${month}월 ${day}일`;
}

export const getNowTimestamp = () => {
    const nowTimestamp = Date.now();
    return nowTimestamp;
}

export const parseRefreshTimestamp = (loginTime) => {
    if(!loginTime) return false;
    const loginDate = new Date(loginTime);
    const nowDate = new Date(getNowTimestamp());

    // const diffTime = (nowDate.getTime() - loginDate.getTime()) / (1000 * 60 * 60);
    // console.log(diffTime);

    const diffDay = (nowDate.getTime() - loginDate.getTime()) / (1000 * 60 * 60 * 24);
    if(diffDay > 1) return true;
    if(diffDay > 0.8 && diffDay < 1) return true;
    return false;
}