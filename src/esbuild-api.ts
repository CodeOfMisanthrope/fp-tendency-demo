export default function esbuildApiInit() {
    new EventSource('/esbuild').addEventListener('change', () => location.reload());
};
