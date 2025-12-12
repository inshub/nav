import 'dotenv/config';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

// 缓存tenant_access_token及其过期时间
let cachedToken = null;
let tokenExpireTime = null;

// 缓存配置
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const CACHE_FILE = path.join(__dirname, '../data/cache.json');
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

// 获取tenant_access_token
async function getTenantAccessToken() {
  const now = Date.now();
  if (cachedToken && tokenExpireTime && now < tokenExpireTime - 5 * 60 * 1000) {
    console.log('使用缓存的tenant_access_token');
    return cachedToken;
  }

  try {
    console.log('重新获取tenant_access_token');
    const response = await axios.post(
      'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal',
      {
        app_id: process.env.FEISHU_APP_ID,
        app_secret: process.env.FEISHU_APP_SECRET
      },
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }
    );

    if (response.data.code === 0) {
      cachedToken = response.data.tenant_access_token;
      tokenExpireTime = now + response.data.expire * 1000;
      return cachedToken;
    } else {
      throw new Error(`获取tenant_access_token失败: ${response.data.msg}`);
    }
  } catch (error) {
    console.error('获取tenant_access_token异常:', error.message);
    throw error;
  }
}

// 获取多维表格数据
async function getBitableData(token) {
  try {
    console.log(`正在获取表格数据 - App Token: ${process.env.FEISHU_APP_TOKEN}, Table ID: ${process.env.FEISHU_TABLE_ID}`);

    let allItems = [];
    let pageToken = null;
    let hasMore = true;

    // 分页获取所有数据
    while (hasMore) {
      const params = {
        page_size: 100
      };

      if (pageToken) {
        params.page_token = pageToken;
      }

      const url = `https://open.feishu.cn/open-apis/bitable/v1/apps/${process.env.FEISHU_APP_TOKEN}/tables/${process.env.FEISHU_TABLE_ID}/records`;
      console.log(`请求URL: ${url}`);
      console.log(`请求参数:`, params);

      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8'
        },
        params
      });

      console.log(`响应状态: ${response.status}`);
      console.log(`响应数据:`, JSON.stringify(response.data, null, 2));

      if (response.data.code === 0) {
        allItems = allItems.concat(response.data.data.items);
        pageToken = response.data.data.page_token;
        hasMore = response.data.data.has_more;
        console.log(`成功获取 ${response.data.data.items.length} 条记录，总计: ${allItems.length}`);
      } else {
        console.error(`API错误 - Code: ${response.data.code}, Msg: ${response.data.msg}`);
        throw new Error(`获取多维表格数据失败: ${response.data.msg} (code: ${response.data.code})`);
      }
    }

    console.log(`总共获取到 ${allItems.length} 条记录`);
    return allItems;
  } catch (error) {
    console.error('获取多维表格数据异常:', error.message);
    if (error.response) {
      console.error(`HTTP状态: ${error.response.status}`);
      console.error(`响应数据:`, error.response.data);
    }
    throw error;
  }
}

// 处理多维表格数据
function processTableData(items) {
  console.log(`开始处理 ${items.length} 条记录`);

  const records = items.map(item => {
    const fields = item.fields;

    // 支持多种字段名称映射
    const name = fields.name || fields.站点名称 || fields.title || '';
    const url = fields.url || fields.网址?.link || fields.link || '';
    const category = fields.category || fields.分类 || '其它';
    const desc = fields.desc || fields.描述 || fields.description || '';
    const sort = fields.sort || fields.排序 || 0;

    // 图标处理 - 支持在线 URL 和 Lucide 图标
    let icon = '';

    // 处理不同字段的图标数据
    if (typeof fields.图标 === 'string') {
      icon = fields.图标;
    } else if (typeof fields.icon === 'string') {
      icon = fields.icon;
    } else if (fields.图标?.link) {
      icon = fields.图标.link;
    } else if (fields.icon?.link) {
      icon = fields.icon.link;
    } else if (fields.备用图标?.link) {
      icon = fields.备用图标.link;
    }

    // 处理图标格式
    if (icon && typeof icon === 'string') {
      // 如果是完整的图片 URL（有文件扩展名），直接使用
      if ((icon.startsWith('http://') || icon.startsWith('https://')) &&
          icon.match(/\.(png|jpg|jpeg|gif|svg|ico|webp)$/i)) {
        // 保持原样，作为在线图标
        console.log(`处理图标 ${name}: 保留图片URL - ${icon}`);
      }
      // 如果是 http://xxx 或 https://xxx 格式但没有文件扩展名，提取名称作为 Lucide 图标
      else if (icon.startsWith('http://') || icon.startsWith('https://')) {
        // 提取最后一部分作为图标名称
        const iconName = icon.split('/').pop().split('?')[0];
        icon = iconName || 'Link';
        console.log(`处理图标 ${name}: 从URL提取 - ${iconName} -> ${icon}`);
      }
      // 如果看起来像是错误的 URL 格式（如 http:///icons/xxx）
      else if (icon.startsWith('http:///icons/')) {
        // 这种情况可能是飞书数据解析错误，提取图标名作为 Lucide 图标
        const iconName = icon.replace('http:///icons/', '').replace('.svg', '');
        icon = iconName;
        console.log(`处理图标 ${name}: 修复错误URL - ${iconName}`);
      }
      // 如果是其他格式，作为 Lucide 图标名称处理
      else {
        // 直接使用作为 Lucide 图标名称
        console.log(`处理图标 ${name}: 使用Lucide图标 - ${icon}`);
        // 不需要修改，直接使用原始值
      }
    } else {
      // 如果没有图标，使用默认的 Link 图标
      icon = 'Link';
      console.log(`处理图标 ${name}: 使用默认图标 - ${icon}`);
    }

    if (!name && !url) {
      return null;
    }

    return {
      id: item.record_id,
      name: name,
      title: name, // 保持与现有数据结构兼容
      desc: desc,
      description: desc, // 保持兼容
      link: url,
      url: url, // 保持兼容
      category: category,
      sort: typeof sort === 'number' ? sort : parseInt(sort) || 0,
      icon: icon
    };
  }).filter(record => record !== null);

  console.log(`有效记录数: ${records.length}`);

  // 按分类分组
  const groupedByCategory = {};
  records.forEach(record => {
    if (!groupedByCategory[record.category]) {
      groupedByCategory[record.category] = [];
    }
    groupedByCategory[record.category].push(record);
  });

  // 每个分类内按排序字段排序
  Object.keys(groupedByCategory).forEach(category => {
    groupedByCategory[category].sort((a, b) => a.sort - b.sort);
  });

  console.log(`分类数量: ${Object.keys(groupedByCategory).length}`);

  return groupedByCategory;
}

// 带缓存的数据获取
async function fetchWithCache() {
  try {
    // 检查缓存
    if (fs.existsSync(CACHE_FILE)) {
      const cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
      if (Date.now() - cache.timestamp < CACHE_DURATION) {
        console.log('使用缓存数据');
        return cache.data;
      }
    }

    // 获取新数据
    console.log('获取新数据...');
    const data = await fetchFeishuNavigation();

    // 保存缓存
    const cacheDir = path.dirname(CACHE_FILE);
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }

    fs.writeFileSync(CACHE_FILE, JSON.stringify({
      timestamp: Date.now(),
      data: data
    }));

    return data;
  } catch (error) {
    // 缓存失败时的降级策略
    if (fs.existsSync(CACHE_FILE)) {
      console.warn('API失败，使用过期缓存');
      return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8')).data;
    }
    throw error;
  }
}

// 主要导出函数
async function fetchFeishuNavigation() {
  try {
    const token = await getTenantAccessToken();
    const items = await getBitableData(token);
    const data = processTableData(items);

    return {
      success: true,
      data: data,
      categories: Object.keys(data),
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('获取飞书数据失败:', error.message);

    // 返回空数据而不是模拟数据，适合静态构建
    return {
      success: false,
      data: {},
      categories: [],
      error: error.message
    };
  }
}

// 健康检查函数
async function healthCheck() {
  try {
    const data = await fetchFeishuNavigation();

    console.log('飞书数据健康检查:');
    console.log('- 状态:', data.success ? '✅ 正常' : '❌ 异常');
    console.log('- 分类数量:', data.categories.length);
    console.log('- 数据更新时间:', data.timestamp);

    if (!data.success) {
      console.error('- 错误信息:', data.error);
      return false;
    }

    // 检查数据完整性
    let totalItems = 0;
    for (const category of data.categories) {
      totalItems += data.data[category].length;
    }
    console.log('- 总条目数:', totalItems);

    return true;
  } catch (error) {
    console.error('健康检查失败:', error);
    return false;
  }
}

export {
  fetchFeishuNavigation,
  fetchWithCache,
  getTenantAccessToken,
  getBitableData,
  processTableData,
  healthCheck
};