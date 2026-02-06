
function bindHandlers(topObj: object) : void {
    const aThis = topObj;
    let obj: object | null = topObj;
    while (obj) {
        const keys = Reflect.ownKeys(obj)
        keys.forEach((name) => {
            if (typeof(name) === 'string')
                if (name.substring(0, 6) === 'handle') {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    if (typeof obj[name] === 'function') {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        aThis[name] = obj[name].bind(aThis);
                        // console.log(name);
                    }
                }
        });
        obj = Reflect.getPrototypeOf(obj)
    }
}

export {bindHandlers}