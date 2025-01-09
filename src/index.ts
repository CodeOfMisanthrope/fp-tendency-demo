import "~assets/style/main.css";
import esbuildApiInit from "./esbuild-api";
import { Result } from "~core/containers";

esbuildApiInit();

console.log("Dec server is running");

const res1 = new Result(() => 42);
