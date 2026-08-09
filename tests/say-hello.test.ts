import { sayHello } from "../src/1_say_hello.tsx";


describe("Say Hello", () => {
    it("should return hello", () => {
        const name = "Fauzi";
        expect(sayHello(name)).toBe("Hello Fauzi");
    });
});