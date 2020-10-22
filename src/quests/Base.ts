export abstract class BaseQuest {
    name: string;
    displayName: string;
    state: 'ACTIVE' | 'INACTIVE' | 'COMPLETED' = 'INACTIVE';
    constructor(name: string, displayName: string) {
        this.name = name;
        this.displayName = displayName;
    }
}