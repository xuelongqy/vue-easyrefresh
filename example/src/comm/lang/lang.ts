import VueI18n from 'vue-i18n'

// 设置默认语言
const DEFAULT_LANG = 'en-US'
// 获取当前目录下的文件
const files = require.context('.', false, /\.js$/)
// 存储生成的各国语言
const messages = {}
files.keys().forEach((key) => {
    if (key === './lang.js') { return }
    // @ts-ignore
    messages[key.replace(/(\.\/|\.js)/g, '')] = files(key)
})

/**
 * @Title: getLanguage方法
 * @Description: 获取当前语言,没有则使用默认
 * @author XueLong xuelongqy@foxmail.com
 * @date 2018/1/26 9:53
 * @update_author
 * @update_time
 * @version V1.0
 * @return String 当前语言
 */
export const getLanguage = function(): string {
    // 获取系统语言
    const lang: string = navigator.language
    // 判断是否包含此语言
    // @ts-ignore
    return messages[lang] === undefined ? DEFAULT_LANG : lang
}

// 存储生成的i18n
export const createI18n = function(): VueI18n {
    return new VueI18n({
        locale: getLanguage(),
        fallbackLocale: DEFAULT_LANG,
        messages,
    })
}

export default {
    getLanguage,
    createI18n,
}
