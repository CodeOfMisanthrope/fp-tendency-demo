import "~assets/style/main.css";
import esbuildApiInit from "./esbuild-api";
import { Option, Result } from "~core/containers";

esbuildApiInit();

console.log("Dec server is running");

// const res1 = new Result(() => 42);
// res1
//   .then((val) => {
//     console.log(val);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
// .then((val) => {
//   console.log(val);
// })

// const op1 = new Option(() => 42);
// op1.then((v) => {
//    console.log(v);
//    return v;
// }).catch(() => {
//    console.log(null);
// });

// Option.exec(function* main() {
//    const res1 = new Option(() => 42);
//    console.log(yield res1); // 42
//
//   const res2 = yield new Option(() => null);
//    console.log(res2); // null
// });

// Result.exec(function* main() {
//    const res1 = new Result(() => 42);
//    console.log(yield res1); // 42
//    const res2 = yield new Result(() => {
//      return null;
//    });
//    // try {
//    //   const res2 = yield new Result(() => {
//    //     throw 'Boom!';
//    //   });
//    // } catch (err) {
//    //   console.error(err); // "Boom!" (Error)
//    // }
// });

// const op1 = new Option(() => null);
// const res1 = op1.match(
//   (val) => val * 2,
//   () => 0
// )

// const result = new Option(() => 42);
// console.log(result.status); // "Some"

const optionSome = new Option(() => 42);
const some = optionSome.unwrap(); // 42

const optionNone = new Option(() => null);
const none = optionNone.unwrap(); // null
console.log(none);
