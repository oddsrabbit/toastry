const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

async function build() {
    // ESM build (CSS auto-injected)
    await esbuild.build({
        entryPoints: ['src/index.js'],
        outfile: 'dist/toastry.module.js',
        format: 'esm',
        bundle: true,
        minify: true,
        sourcemap: true,
        loader: { '.css': 'text' },
    });

    // CJS build (CSS auto-injected)
    await esbuild.build({
        entryPoints: ['src/index.js'],
        outfile: 'dist/toastry.cjs',
        format: 'cjs',
        bundle: true,
        minify: true,
        sourcemap: true,
        loader: { '.css': 'text' },
    });

    // IIFE build (sets window.toast, CSS auto-injected)
    await esbuild.build({
        entryPoints: ['src/index.js'],
        outfile: 'dist/toastry.js',
        format: 'iife',
        globalName: '__toastry',
        bundle: true,
        minify: true,
        sourcemap: true,
        loader: { '.css': 'text' },
        footer: {
            js: 'if(typeof window!=="undefined"){window.toast=__toastry.default||__toastry.toast;}',
        },
    });

    // CSS build
    await esbuild.build({
        entryPoints: ['src/styles.css'],
        outfile: 'dist/toastry.css',
        bundle: true,
        minify: true,
        sourcemap: true,
    });

    // Copy type definitions
    fs.copyFileSync('src/toastry.d.ts', 'dist/toastry.d.ts');


    // Report sizes
    const files = ['dist/toastry.module.js', 'dist/toastry.cjs', 'dist/toastry.js', 'dist/toastry.css'];
    console.log('\nBuild complete:\n');
    for (const file of files) {
        const stat = fs.statSync(file);
        const kb = (stat.size / 1024).toFixed(1);
        console.log(`  ${file} — ${kb} KB`);
    }
    console.log('');
}

build().catch((err) => {
    console.error(err);
    process.exit(1);
});
