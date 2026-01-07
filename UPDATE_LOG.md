# ZboVix 更新日志

## v2.0.0 - 2025-01-07

### 🎉 重大更新

#### 1. 项目重命名
- 项目从 NixVis 重命名为 **ZboVix**
- 仓库地址: `https://github.com/azbo/zbovix`
- 模块路径: `github.com/azbo/zbovix`

#### 2. JSON 日志支持 ⭐ 新功能
- 新增 JSON 结构化日志解析器
- 支持混合使用 Nginx 和 JSON 日志格式
- 自动提取 IP、URL、时间戳等信息

**配置示例**:
```json
{
  "websites": [
    {
      "name": "Nginx日志站点",
      "logPath": "/var/log/nginx/access.log",
      "logType": "nginx"
    },
    {
      "name": "JSON日志站点",
      "logPath": "./json.log",
      "logType": "json"
    }
  ]
}
```

**支持的 JSON 日志格式**:
```json
{
  "@timestamp": "2026/01/07 15:54:57.385",
  "aspnet-request-method": "POST",
  "aspnet-request-url": "http://example.com/api/endpoint",
  "aspnet-request-ip": "192.168.1.1",
  "aspnet-request-headers": "X-Real-IP=192.168.1.1,User-Agent=Mozilla/5.0..."
}
```

#### 3. UI/UX 全面升级
- **现代化设计**: 紫蓝色系渐变主题 (#4e54c8 → #3b82f6)
- **流畅动画**: 悬停、点击、页面切换动画
- **圆角设计**: 统一 8-16px 圆角
- **阴影优化**: 多层次阴影效果
- **暗色模式**: 完整支持，自动切换

**视觉亮点**:
- 渐变文字标题
- 卡片悬停效果
- 按钮动画反馈
- 表格美化设计
- 响应式布局

#### 4. 日志查询页面增强
- 新增状态码筛选功能
- 优化搜索和排序控件
- 改进表格展示效果
- 更好的分页控制

### 🔧 技术细节

**后端**:
- Go 1.23.6
- Gin Web Framework
- SQLite 数据库
- ip2region 地理位置

**前端**:
- 原生 JavaScript (ES6+)
- ECharts 地图可视化
- Chart.js 图表库
- CSS3 动画

### 📝 配置变更

**新增字段**:
- `logType`: 日志类型 (可选值: "nginx", "json"，默认: "nginx")
- `excludeIPs`: IP 过滤列表

**完整配置示例**:
参见 `zbovix_config.json`

### 🚀 快速开始

1. 下载最新版本:
```bash
wget https://github.com/azbo/zbovix/releases/download/latest/zbovix
chmod +x zbovix
```

2. 生成配置文件:
```bash
./zbovix -gen-config
```

3. 编辑 `zbovix_config.json`

4. 启动服务:
```bash
./zbovix
```

5. 访问: http://localhost:8088

### 📊 功能特性

✅ 多格式日志支持 (Nginx + JSON)
✅ 实时访问统计 (UV/PV/流量)
✅ 地理位置分布 (国内+全球地图)
✅ 详细排名分析 (URL/来源/浏览器/OS/设备)
✅ 时间序列分析 (按小时/按天)
✅ 多站点监控
✅ 增量日志解析
✅ 高性能查询 (SQLite + 多级缓存)
✅ 日志查询和搜索
✅ 状态码筛选
✅ 深色模式

### 🔄 升级指南

从 NixVis 升级到 ZboVix:

1. 备份现有配置和数据
2. 下载新的 zbovix 可执行文件
3. 更新配置文件（可选添加 logType 字段）
4. 重启服务

**兼容性**: 完全兼容现有 Nginx 日志格式和配置

### 🐛 已知问题

- JSON 日志格式需要包含特定字段（@timestamp, aspnet-request-url 等）
- 如需支持其他 JSON 格式，请提交 Issue

### 📚 相关文档

- [README.md](README.md) - 项目说明
- [DEPLOY.md](DEPLOY.md) - 部署指南
- [QUICKSTART.md](QUICKSTART.md) - 快速开始

### 🙏 致谢

感谢所有贡献者和用户的支持！

---

**提交者**: azbo
**构建日期**: 2025-01-07
