import "~assets/style/main.css";
import esbuildApiInit from "./esbuild-api";
import { slice } from "~core/iter";

esbuildApiInit();

console.log("Dec server is running");

console.log([...slice([1, 2, 3, 4], 0, 2)]);
