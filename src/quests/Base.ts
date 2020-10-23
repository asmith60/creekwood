export abstract class BaseQuest {
    name: string;
    displayName: string;
    state: 'ACTIVE' | 'INACTIVE' | 'COMPLETE' = 'INACTIVE';
    constructor(name: string, displayName: string) {
        this.name = name;
        this.displayName = displayName;
    }
}