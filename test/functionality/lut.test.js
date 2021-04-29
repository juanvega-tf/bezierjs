import {Bezier} from "../../src/bezier.js";

test(`calculate LUT`, () => {
    const b = new Bezier(
        {x: 100, y: 25},
        {x: 10, y: 90},
        {x: 110, y: 100},
        {x: 150, y: 195}
    );
    const lut = b.getLUT(230);

    console.log(lut);
    expect(lut.length).toEqual(229)
});
