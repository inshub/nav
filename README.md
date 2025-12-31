# AIGC 导航站

一个基于飞书多维表格的 AIGC (Artificial Intelligence Generated Content) 工具导航站点，汇集了各类 AI 工具和资源。

## ✨ 特性

- 🚀 **现代化界面**：基于 TailwindCSS 和 ShadCN 组件库构建的响应式设计
- 📱 **深色模式**：支持明暗主题切换，适应不同使用场景
- 🔄 **实时同步**：通过飞书 API 实时获取最新数据，保持内容更新
- ⚡ **缓存机制**：内置 5 分钟缓存，提升加载速度
- 🛠️ **简单部署**：纯静态站点，可部署到任何静态托管服务
- 🔍 **分类管理**：支持按分类浏览和展示工具

## 🛠️ 技术栈

- **前端框架**：原生 HTML/CSS/JavaScript
- **样式库**：TailwindCSS
- **UI 组件**：ShadCN 组件风格
- **图标库**：Lucide Icons
- **数据源**：飞书多维表格
- **构建工具**：Node.js

## 📦 安装与配置

### 1. 克隆项目

```bash
git clone https://github.com/inshub/nav.git
cd nav
```

### 2. 安装依赖

使用 pnpm（推荐）：
```bash
pnpm install
```

或使用 npm：
```bash
npm install
```

### 3. 环境配置

创建 `.env` 文件并配置飞书相关参数：

```env
# 飞书应用配置
FEISHU_APP_ID=your_app_id
FEISHU_APP_SECRET=your_app_secret
FEISHU_APP_TOKEN=your_app_token
FEISHU_TABLE_ID=your_table_id
```

获取飞书应用信息的步骤：
1. 登录[飞书开放平台](https://open.feishu.cn/)
2. 创建应用并获取 App ID 和 App Secret
   ![](https://lyln.oss-cn-beijing.aliyuncs.com/obsidian/nav-feish.png)
3. 在多维表格中获取 App Token 和 Table ID，下图页面浏览器地址有对应 App Token 和 Table ID
   ![](https://lyln.oss-cn-beijing.aliyuncs.com/obsidian/nav-feishu-duowei.png)

### 4. 构建数据

```bash
# 构建导航数据
npm run build
# 或
pnpm build
```

### 5. 启动本地服务器

```bash
# 使用 Python 启动简单 HTTP 服务器
npm start
# 或
pnpm start

# 访问 http://localhost:8000
```

## 📁 项目结构

```
nav/
├── api/
│   └── feishu.js          # 飞书 API 集成
├── data/
│   └── navigation.json    # 构建后的导航数据
├── .env                   # 环境变量（需手动创建）
├── index.html            # 主页面
├── build-data.js         # 数据构建脚本
├── package.json          # 项目配置
└── README.md             # 项目说明
```

## 🔧 API 说明

### 飞书数据获取流程

1. **获取访问令牌**：使用 App ID 和 App Secret 获取 tenant_access_token
2. **读取多维表格**：通过 API 获取多维表格中的记录
3. **数据处理**：将表格数据转换为导航所需的格式
4. **缓存机制**：将处理后的数据缓存 5 分钟，提升响应速度

### 数据字段说明

多维表格中的字段说明：
- `name` / `站点名称`：站点名称
- `url` / `网址`：站点链接
- `category` / `分类`：工具分类
- `desc` / `描述`：工具描述
- `icon` / `图标`：图标名称或链接
- `sort` / `排序`：排序权重

## 🚀 部署指南

### 静态托管部署

1. 构建数据：
   ```bash
   npm run build
   ```

2. 部署到静态托管平台（如 GitHub Pages、Netlify、Vercel 等）

3. 配置构建命令：`npm run build`
4. 配置发布目录：项目根目录

### 自动化部署

可以设置 GitHub Actions 来定时构建数据：

```yaml
name: Update Data
on:
  schedule:
    - cron: '0 */6 * * *'  # 每 6 小时更新一次
  workflow_dispatch:
jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

## 🎨 自定义配置

### 修改主题

在 `index.html` 的 `<style>` 标签中修改 CSS 变量：

```css
:root {
    --primary: 240 5.9% 10%;
    --secondary: 240 4.8% 95.9%;
    /* 其他颜色变量... */
}
```

### 添加新分类

在飞书多维表格中的 `category` 字段添加新的分类名称，系统会自动识别并创建对应的分类卡片。

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [TailwindCSS](https://tailwindcss.com/) - 原子化 CSS 框架
- [ShadCN](https://ui.shadcn.com/) - 优雅的 UI 组件库
- [Lucide](https://lucide.dev/) - 精美的图标库
- [飞书开放平台](https://open.feishu.cn/) - 提供 API 支持

## 📞 联系方式

- GitHub 项目地址：[https://github.com/inshub/nav](https://github.com/inshub/nav)
- 如有问题或建议，欢迎提交 [Issue](https://github.com/inshub/nav/issues)

---

⭐ 如果这个项目对你有帮助，请给它一个 Star！