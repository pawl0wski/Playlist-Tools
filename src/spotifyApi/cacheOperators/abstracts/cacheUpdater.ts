export abstract class CacheUpdater {
    private keyName: string;

    constructor(keyName: string) {
        this.keyName = keyName;
    }

    public update(item: object) {
        let itemsCacheJson = localStorage.getItem(this.keyName);
        let itemsCache: { [key: string]: object } = {};
        if (itemsCacheJson) {
            itemsCache = JSON.parse(itemsCacheJson);
        }
        let serializedItem = this.mapObjectToSerializeObject(item);
        itemsCache[serializedItem["id"]] = serializedItem;
        localStorage.setItem(this.keyName, JSON.stringify(itemsCache));
    }

    protected abstract mapObjectToSerializeObject(item: object): {
        [key: string]: string;
    };
}
