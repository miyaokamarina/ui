import { px } from '@anireact/css';
import { map } from '@anireact/prelude';
import { sizes } from '../Constants/Constants';
import { MediaState } from '../Media/MediaState';
import { RawX } from './RawX';
import { X } from './X';

export const createX = (raw: RawX, { size, hasTouch }: MediaState): X => {
    const s = sizes[size];
    const xinit = raw[`x${s}` as keyof RawX] as number;
    const iinit = raw[`${hasTouch ? 't' : 'i'}x${s}` as keyof RawX];

    const [x, xl1, xl2, xl3, xl4, xl5, xl6, xs1, xs2, xs3, xs4, xs5, xs6] = xHelper(xinit);
    const [ix, ixl1, ixl2, ixl3, ixl4, ixl5, ixl6, ixs1, ixs2, ixs3, ixs4, ixs5, ixs6] = xHelper(iinit);

    return {
        ...{ x, xl1, xl2, xl3, xl4, xl5, xl6, xs1, xs2, xs3, xs4, xs5, xs6 },
        ...{ ix, ixl1, ixl2, ixl3, ixl4, ixl5, ixl6, ixs1, ixs2, ixs3, ixs4, ixs5, ixs6 },
    };
};

const xHelper = (init: number): ReadonlyArray<string> => {
    return map(
        [
            1, //         |    | 20    |
            1 + 1 / 3, // | l1 | 26.67 |
            2, //         | l2 | 40    |
            3, //         | l3 | 60    |
            4, //         | l4 | 80    |
            5, //         | l5 | 100   |
            6, //         | l6 | 120   |
            0.8, //       | s1 | 16    |
            0.5, //       | s2 | 10    |
            0.25, //      | s3 | 5     |
            0.15, //      | s4 | 3     |
            0.1, //       | s5 | 2     |
            0.05, //      | s6 | 1     |
        ],
        x => px(init * x),
    );
};
