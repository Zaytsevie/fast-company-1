export function time(time) {
    const currentTime = Date.parse(new Date()) - time;

    const date = new Date(parseInt(time));

    const options1 = { year: "numeric", month: "long", day: "numeric" };
    const options2 = { month: "long", day: "numeric" };

    if (currentTime <= 60) {
        return "1 минуту назад";
    } else if (currentTime >= 60 && currentTime <= 300) {
        return "5 минут назад";
    } else if (currentTime >= 300 && currentTime <= 600) {
        return "10 минут назад";
    } else if (currentTime >= 600 && currentTime <= 1800) {
        return "30 минут назад";
    } else if (currentTime >= 1800 && currentTime <= 86400000) {
        return `${date.getHours()} : ${date.getMinutes()}`;
    } else if (currentTime >= 86400000 && currentTime <= 2678400000) {
        return `${date.toLocaleString("rus-RU", options2)}`;
    } else if (currentTime >= 2678400000) {
        return `${date.toLocaleString("rus-RU", options1)}`;
    }
    return "";
}
