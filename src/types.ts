import { Action as ReduxAction } from 'redux';

export type Action<Type> = ReduxAction<Type>;

export type PayloadAction<Type, Payload> = Action<Type> & {
    readonly payload: Payload;
};
