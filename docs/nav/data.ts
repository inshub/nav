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
            },
            {
                icon: '/icons/doubao.jpeg',
                title: '扣子',
                desc: '扣子是新一代一站式 AI Bot 开发平台, 分国内和国外两个版本。国外基于GPT4（免费白嫖GPT4），国内基于云雀语言大模型。',
                link: 'https://www.coze.cn/'
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
            {
                icon: '/icons/drawing-prompt.svg',
                title: 'Sora Generated Video',
                desc: 'Sora相关教程使用方法和新闻动态',
                link: 'https://soragenerated.video/zh/sora_shipin/'
            },
            {
                icon: '/icons/drawing-prompt.svg',
                title: 'Sora Web 客户端',
                desc: '目前无法调用 OpenAI 的官方接口，使用FakeSoraAPI',
                link: 'https://sorawebui.com/'
            },
            {
                icon: '/icons/drawing-prompt.svg',
                title: 'Sora.FM',
                desc: 'Sora 文本生成视频 API 还未发布，网站上展示的所有视频都是由 OpenAI 官方生成的。',
                link: 'https://sora.fm'
            },


        ]
    },
    {
        title: 'AI学习工具',
        items: [
            {
                icon: '/icons/github.png',
                title: 'Cloudflare WARP+',
                desc: '免费的生产力工具，临时性使用。试用了一段时间还可以',
                link: 'https://tofree.zeabur.app/'
            },
            {
                icon: '/icons/immersivetranslate.png',
                title: '沉浸式翻译',
                desc: '一款免费的，好用的，没有废话的，革命性的，饱受赞誉的，AI 驱动的双语网页翻译扩展，帮助你有效地打破信息差，在手机上也可以用！',
                link: 'https://immersivetranslate.com/?via=lucas'
            },
        ]
    },
]