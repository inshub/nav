import type { NavLink } from './components/type'

type NavData = {
    title: string
    items: NavLink[]
}

export const NAV_DATA: NavData[] = [
    {
        title: '常用工具',
        items: [
            {
                icon: '/icons/devv.png',
                title: 'Devv.ai',
                desc: '最懂程序员的新一代 AI 搜索引擎',
                link: 'https://devv.ai/'
            },
            {
                icon: '/icons/chatgpt.png',
                title: 'ChatGPT',
                link: 'https://chat.openai.com/chat'
            }
        ]
    },
    {
        title: 'AI 导航',
        items: [
            {
                icon: '/icons/chatgpt.png',
                title: 'ChatGPT（最强）',
                link: 'https://chat.openai.com/chat'
            },
            {
                icon: 'https://www.notion.so/images/logo-ios.png',
                title: 'Notion AI（笔记）',
                link: 'https://www.notion.so'
            }
        ]
    }
]