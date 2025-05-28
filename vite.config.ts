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
			"@pages": path.resolve(__dirname, "src/pages"),
			"@components": path.resolve(__dirname, "src/components"),
			"@hooks": path.resolve(__dirname, "src/hooks"),
			"@utils": path.resolve(__dirname, "src/utils"),
			"@services": path.resolve(__dirname, "src/services"),
			"@models": path.resolve(__dirname, "src/models"),
			"@context": path.resolve(__dirname, "src/context"),
		},
	},
});
