import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [tailwindcss(), react()],
	test: {
		environment: "happy-dom",
		setupFiles: ["./src/tests/setup.ts"],
		include: ["src/**/*.{test,spec}.{ts,tsx}"],
		globals: true,
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
