function bindHandlers(topObj: object): void {
    const aThis = topObj;
    let obj: object | null = topObj;
    let found: Set<string> = new Set();
    while (obj) {
        const keys = Reflect.ownKeys(obj)
        keys.forEach((name) => {
            if (typeof (name) === 'string')
                if (name.substring(0, 6) === 'handle') {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    if (typeof obj[name] === 'function') {
                        if (!found.has(name)) {

                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            aThis[name] = aThis[name].bind(aThis);
                            found.add(name);
                        }
                    }
                }
        });
        obj = Reflect.getPrototypeOf(obj)
    }
}

export {bindHandlers}