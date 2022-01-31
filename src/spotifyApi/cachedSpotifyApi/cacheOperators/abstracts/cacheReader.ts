export abstract class CacheReader {
    private keyName: string;

    constructor(keyName: string) {
        this.keyName = keyName;
    }

    public read(id: string): any {
        let itemsCacheJson = localStorage.getItem(this.keyName);
        if (itemsCacheJson) {
            let itemsCache = JSON.parse(itemsCacheJson);
            let itemInCache = itemsCache[id];
            if (itemInCache) {
                let item = this.mapSerializeObjectToObject(itemInCache);
                return item;
            }
        }
    }

    protected abstract mapSerializeObjectToObject(object: {
        [key: string]: string;
    }): any;
}
