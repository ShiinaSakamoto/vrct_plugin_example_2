import path from "path";
import { fileURLToPath } from "url";
import TerserPlugin from "terser-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    mode: "production",
    entry: "./src/index.jsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.esm.js",
        library: {
            type: "module",
        },
        // 出力形式がESモジュールであるため、モジュールのエクスポートを設定
        module: true
    },
    externals: {
        react: "root React", // react をグローバルオブジェクトにマッピング
    },
    experiments: {
        outputModule: true, // ESモジュール出力を有効化
    },
    optimization: {
        minimizer: [new TerserPlugin({
            extractComments: false,
        })],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                loader: "babel-loader",
                options: {
                    presets: [
                        "@babel/preset-env",  // 一般的なJavaScriptのトランスパイル
                        ["@babel/preset-react", { runtime: "automatic" }] // React用
                    ],
                },
                },
            },
        ],
    },

    resolve: {
        extensions: [".js", ".jsx"],
    },
};

