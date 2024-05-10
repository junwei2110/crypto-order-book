
export const findKeyValueJSON = (key: string, data: Record<string, any>) => {

    const stack = [data];

    while (stack.length) {
        const item = stack.pop();
        try {
            const keyList = Object.keys(item)
            for (let i = 0; i < keyList.length; i++) {
                const innerKey = keyList[i];
                if (innerKey === key) {
                  
                    return { [key]: item[innerKey] }
                } else {
                    if (typeof item[innerKey] === "object") {
                        stack.push(item[innerKey]);
                    }
    
                }
            }

        } catch (e) {
            console.log(e.message);
            return {};
        }

    }

    return {};

}

export const calculateAverage = (arr: number[]) => {
    let sum = 0;
    arr.forEach(no => sum += no);
    return sum/arr.length;
}