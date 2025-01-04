import "~assets/style/main.css";
import esbuildApiInit from "./esbuild-api";
import { curry } from "~core/utils";

esbuildApiInit();

console.log("Dec server is running");

const add = (x: number, y: number) => x + y;
const add2 = (x: number, y: number, z:number) => x + y + z;

console.log(typeof curry(add)(1)(2));
console.log(typeof curry(add)(1)(3));
console.log(typeof curry(add2)(1)(3));
