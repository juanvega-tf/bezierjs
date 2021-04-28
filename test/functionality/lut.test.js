import {Bezier} from "../../src/bezier.js";

test(`calculate LUT`, () => {
    const b = new Bezier(100, 25, 10, 90, 110, 100, 150, 195);
    const lut = b.getLUT(230);

    console.log(lut);
    expect(lut.length).toEqual(229)
});
