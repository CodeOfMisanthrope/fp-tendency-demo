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

const op1 = new Option(() => 42);
op1.then((v) => {
   console.log(v);
   return v;
}).catch(() => {
   console.log(null);
});
