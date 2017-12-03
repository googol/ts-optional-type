export type Optional<T> = None | Some<T>;

export interface None {
    readonly type: 'none';
}

export interface Some<T> {
    readonly type: 'some';
    readonly value: T;
}

export const isSome = <T>(value: Optional<T>): value is Some<T> => value.type === 'some';
export const isNone = <T>(value: Optional<T>): value is None => value.type === 'none';

const Optional = {
    toString<T>(this: Optional<T>) {
        const x = this;
        return isSome(x)
            ? `(Some ${x.value})`
            : `(None)`;
    },
};

function getPropertyDescriptor<T>(type: 'some', value: T): PropertyDescriptorMap;
function getPropertyDescriptor(type: 'none'): PropertyDescriptorMap;
function getPropertyDescriptor<T>(type: 'some' | 'none', value?: T): PropertyDescriptorMap {
    return {
        type: {
            value: type,
            enumerable: true,
        },
        value: {
            value,
            enumerable: true,
        },
    };
}

export const Some = <T>(value: T): Optional<T> => Object.freeze(Object.create(Optional, getPropertyDescriptor<T>('some', value)) as Some<T>);

const _none = Object.freeze(Object.create(Optional, getPropertyDescriptor('none')) as None);
export const None = <T>(): Optional<T> => _none;
