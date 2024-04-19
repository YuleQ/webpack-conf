import webpack from 'webpack'
import { builDevServer } from './buildDevServer'
import { buildLoaders } from './buildLoaders'
import { buildPlugins } from './buildPlugins'
import { buildResolvers } from './buildResolvers'
import { BuildOptions } from './types/types'


export function buildWebpack(options: BuildOptions): webpack.Configuration {
    const{mode, paths} = options
    const isDev = mode === 'development' 

    return {
        mode: mode ?? 'development',
        entry: paths.entry,
        output: {
            path: paths.output,
            filename: '[name].[contenthash].js',
            clean: true,
            assetModuleFilename: 'images/[hash][ext][query]'

        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
        devServer: isDev ? builDevServer(options) : undefined
    }
}