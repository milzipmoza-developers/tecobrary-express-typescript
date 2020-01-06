const calculate = (page: number, limit: number) => {
    let offset = 0;
    if (page > 1) {
        offset = limit * (page - 1);
    }
    return offset;
};

export {
    calculate
}