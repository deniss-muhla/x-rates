import { Action as ReduxAction } from 'redux';
import { ApiState } from './api/types';

// action type without payload
export type Action<Type> = ReduxAction<Type>;

// action type with payload
export type PayloadAction<Type, Payload> = Action<Type> & {
    readonly payload: Payload;
};

// root application state type
export type RootState = {
    api: ApiState;
};
