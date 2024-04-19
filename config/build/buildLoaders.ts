import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";
import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules']{
    const isDev = options.mode === 'development' 

    const fontLoader = {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]'
        }
      
    }
    
    const assetsLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    }


    const svgrLoader = {
        test: /\.svg$/i,
        // type: 'asset/resource' , 
        use: [
            {
                loader: '@svgr/webpack', 
                options: {
                    icon: true,
                    svgoConfig: { 
                        plugins: [
                            {
                                name: 'convertColors',
                                params: { 
                                    currentColor: true
                                }
                            }
                        ]
                    }
                }
            }
        ],
    }

    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
          }
        },
    }

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            cssLoaderWithModules,
            "sass-loader",
    ],  
    }

    const tsLoader =  {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
              }),
            }
          }
        ]
      }
    

    return[
        scssLoader,
        tsLoader,
        assetsLoader,
        svgrLoader,
        fontLoader,
    ]
}