export const sendError = (res: any, code: number, message: string) => {
    res.status(code).send({
        message
    })
};