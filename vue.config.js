module.exports = {
    pages: {
        index: {
            // page 的入口
            entry: 'demo/main.ts',
            // 模板来源
            template: 'demo/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'EasyRefresh'
        }
    }
}
