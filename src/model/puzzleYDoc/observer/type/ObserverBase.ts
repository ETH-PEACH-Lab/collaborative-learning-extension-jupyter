import { UUID } from "@lumino/coreutils";
import { PuzzleDocChange } from "../../PuzzleYDoc";
import * as Y from 'yjs';

export interface IObserverableEvent{
    type: 'ArrayObserved' | 'FieldObserved',
    parentId?: string,
    propertyName:string,
    data: Y.Array<Y.Map<any>> | Y.Map<any>
}
export default  abstract class ObserverBase {
    public get id(){
        return this._id;
    }

    public attach(observer: ObserverBase): void {
        const isExist = this.observers.includes(observer);
        if (isExist) {
            throw Error('Observer has been attached already.');
        }
        this.observers.push(observer);
    }

    public detach(observer: ObserverBase): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            throw Error('Nonexistent observer.');
        }

        this.observers.splice(observerIndex, 1);

    }
    protected notify(event: IObserverableEvent): void {
        for (const observer of this.observers) {
            observer.update(event);
        }
    }

    protected abstract update(event: IObserverableEvent):void;
    constructor(emitChange: (change: PuzzleDocChange) => void){
        this._emitChange = emitChange;
    }
    protected _getRealPropertyName(
        parentPropertyName: string,
        propertyName: string
    ): string {
        if (parentPropertyName === '') {
            return propertyName;
        }
        return [parentPropertyName, propertyName].join('.');
    }
    protected _emitChange: (change: PuzzleDocChange) => void;
    protected _registeredObservers: Set<string> = new Set();
        private observers: ObserverBase[] = [];

    private _id: string = UUID.uuid4();
}