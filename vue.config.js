module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? './' : '/',
    pages: {
        index: {
            // page 的入口
            entry: 'example/main.ts',
            // 模板来源
            template: 'example/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'EasyRefresh'
        }
    },
    css: {
        extract: true
    }
}
