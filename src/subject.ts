import {Observer} from './observer';

export interface Subject{
    register(obs:Observer): void;
    unregister(obs:Observer): void;
    notifyAll(): void;
}