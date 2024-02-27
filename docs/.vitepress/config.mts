import { defineConfig } from 'vitepress'
import { head } from './configs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "AIGC导航",
  description: "A AIGC Nav Site",
  appearance: false,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',
    outline: {
      level: 'deep',
      label: '本页目录',
    },
    footer: {
      message: '本导航来自互联网，仅供个人学习参考。',
      copyright: 'Copyright © 2023-present <a href="https://github.com/inshub">inshub</a>'
    },
  }
})
