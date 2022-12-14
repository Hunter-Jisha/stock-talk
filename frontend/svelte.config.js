import preprocess from "svelte-preprocess";
import adapter from '@sveltejs/adapter-node';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocess({
		postcss: true,
		}),
	],
	kit: {
		adapter: adapter({ out: 'out' })
	}
};

export default config;
