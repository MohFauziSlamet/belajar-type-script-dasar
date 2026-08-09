
describe("Data Type", () => {
    it("should return hello", () => {
        let name: string = "Fauzi";
        let age: number = 20;
        let isMarried: boolean = true;

        console.log("Name is : " + name);
        console.log("Age is : " + age);

        name = "Azka";
        age = 21;
        isMarried = false;

        console.log("=========");
        console.log("Is Married : " + isMarried);
        console.log("Name is : " + name);
        console.log("Age is : " + age);


    });
});