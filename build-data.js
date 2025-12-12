import { fetchFeishuNavigation } from './api/feishu.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildData() {
  console.log('开始获取飞书数据...');

  const data = await fetchFeishuNavigation();

  if (data.success) {
    // 确保目录存在
    const outputDir = path.join(__dirname, './data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 保存数据文件，供构建使用
    const outputPath = path.join(outputDir, 'navigation.json');
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log('数据构建完成:', outputPath);
    console.log(`获取到 ${data.categories.length} 个分类`);

    // 统计总条目数
    let totalItems = 0;
    for (const category of data.categories) {
      totalItems += data.data[category].length;
    }
    console.log(`总条目数: ${totalItems}`);

  } else {
    console.error('数据获取失败:', data.error);
    process.exit(1);
  }
}

buildData().catch(console.error);
