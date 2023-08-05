type LogType = (...agrs: any[]) => void;
export type CustomLoggerType = (method: string) => LogType;

export function CustomLogger(context: string): CustomLoggerType {
    return setMethod;

    function setMethod(method: string): LogType {
        return logger;
        function logger(...args: any[]) {
            console.log(`[${context}]-[method ${method}]:  `);
            // args.forEach((value) => {
            //     console.log(value);
            // });
            console.log(args);
        }
    }
}
