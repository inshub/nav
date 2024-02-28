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
                icon: '/icons/doubao.jpeg',
                title: '豆包',
                desc: '抖音旗下智能聊天助手',
                link: 'https://www.doubao.com/'
            }
        ]
    },
    {
        title: 'AI提示词条',
        items: [
            {
                icon: '/icons/chat-prompt.svg',
                title: 'ChatGPT Prompts',
                desc: 'Ai魔法典',
                link: 'https://www.magiccodex.cn/docs/chatgpt.html'
            },
            {
                icon: '/icons/learn-prompt.png',
                title: 'Learning Prompt',
                desc: '免费的 Prompt Engineering 教程',
                link: 'https://learningprompt.wiki/'
            },
            {
                icon: '/icons/NovelAI.png',
                title: 'NovelAI魔导书',
                desc: 'Stable Diffusion提示词在线生成',
                link: 'https://thereisnospon.github.io/NovelAiTag/'
            }
        ]
    },
    {
        title: 'AI智能对话',
        items: [
            {
                icon: '/icons/HuggingChat.svg',
                title: 'HuggingChat',
                desc: 'Hugging Face公司开发的一个开源项目，旨在提供高质量的、基于机器学习的聊天接口。',
                link: 'https://huggingface.co/chat/'
            },
            {
                icon: '/icons/doubao.jpeg',
                title: '豆包',
                desc: '抖音旗下智能聊天助手',
                link: 'https://www.doubao.com/'
            }
        ]
    },
    {
        title: 'AI绘画创作',
        items: [
            {
                icon: '/icons/drawing-prompt.svg',
                title: 'Drawing Prompt',
                desc: '绘画提示,生成并可视化艺术提示。完全免费。无需登录或信用卡。',
                link: 'https://drawing-prompt.com/zh-Hans'
            },
            {
                icon: '/icons/drawing-prompt.svg',
                title: 'Drawing Prompts Hub',
                desc: 'AI Art Prompts Generator 包含Midjourney/Stable Diffusion/DALL.E ',
                link: 'https://drawingprompts.cc/'
            },
            {
                icon: 'https://huggingface.co/chat/huggingchat/logo.svg',
                title: 'Stable Diffusion XL',
                desc: 'spaces google sdxl',
                link: 'https://huggingface.co/spaces/google/sdxl'
            },
            {
                icon: '/icons/dreamina.png',
                title: '剪映Dreamina',
                desc: '用简单的文案，创作精彩的图片',
                link: 'https://www.capcut.cn/ai-tool/platform'
            },
            {
                icon: '/icons/drawing-prompt.svg',
                title: 'niji・journey',
                desc: '魔法般的二次元绘画生成',
                link: 'https://nijijourney.com/zh/'
            },


        ]
    },
]