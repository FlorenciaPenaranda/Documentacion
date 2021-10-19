/** @format */

import { css } from "lit-element";

export const gridLayout = css`
    .grid {
        display: grid;
        grid-gap: 0.5rem;
        padding: 0.5rem;
        align-items: center;
    }

    .inner-grid {
        display: grid;
        grid-gap: 0.5rem;
        align-items: center;
    }

    .fit {
        grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    }
    .fill {
        grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    }
    .column {
        grid-auto-flow: column;
    }
    .start {
        place-content: start;
    }
    .end {
        place-content: end;
    }
    .center {
        place-content: center;
    }
    .itemsCenter {
        justify-items: center;
    }
    .stretch {
        justify-content: stretch;
        align-content: stretch;
    }
    .justify-self-end {
        justify-self: end;
    }
    .justify-self-start {
        justify-self: start;
    }
    .justify-self-center {
        justify-self: center;
    }
    .align-self-end {
        align-self: end;
    }
    .align-self-start {
        align-self: start;
    }
    .align-start {
        align-items: start;
    }
    .align-end {
        align-items: end;
    }

    .cursor:hover {
        cursor: pointer;
        background-color: var(--color-gris-claro);
    }

    /*.cursor:focus {
        cursor: pointer;
        background-color: var(--color-blanco);
        color: var(--color-negro);
    }*/
`;
