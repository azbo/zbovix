# ZboVix

![](https://github.com/azbo/zbovix/actions/workflows/ci-linux.yml/badge.svg?branch=main)

ZboVix 是一款基于 Go 语言开发的、开源轻量级日志分析工具，专为自部署场景设计。它支持 Nginx 访问日志和 JSON 结构化日志解析，提供直观的数据可视化和全面的统计分析功能，帮助您实时监控网站流量、访问来源和地理分布等关键指标，无需复杂配置即可快速部署使用。

## 功能特点

- **全面访问指标**：实时统计独立访客数 (UV)、页面浏览量 (PV) 和流量数据
- **多种日志格式**：支持 Nginx 访问日志和 JSON 结构化日志（如 json.log 格式）
- **地理位置分布**：展示国内和全球访问来源的可视化地图
- **详细访问排名**：提供 URL、引荐来源、浏览器、操作系统和设备类型的访问排名
- **时间序列分析**：支持按小时和按天查看访问趋势
- **多站点支持**：可同时监控多个网站的访问数据
- **增量日志解析**：自动扫描日志文件，解析并存储最新数据
- **高性能查询**：存储使用轻量级 SQLite，结合多级缓存策略实现快速响应
- **嵌入式资源**：前端资源和IP库内嵌于可执行文件中，无需额外部署静态文件
- **日志查询分析**：新增结构化日志查询和分析功能，支持按条件筛选和搜索

## 快速开始

1. 下载最新版本的 ZboVix

```bash
wget https://github.com/azbo/zbovix/releases/download/latest/zbovix
chmod +x zbovix
```

2. 生成配置文件
```bash
./zbovix -gen-config
```
执行后将在当前目录生成 zbovix_config.json 配置文件。

3. 编辑配置文件 zbovix_config.json，添加您的网站信息和日志路径

- 支持日志轮转路径
- 支持 PV 过滤规则
- 支持 JSON 结构化日志格式

```json
{
  "websites": [
    {
      "name": "示例网站1",
      "logPath": "./weblog_eg/blog.log",
      "logType": "nginx"
    },
    {
      "name": "示例网站2",
      "logPath": "./logs/json.log",
      "logType": "json"
    }
  ],
  "system": {
    "logDestination": "file",
    "taskInterval": "5m"
  },
  "server": {
    "Port": ":8088"
  },
  "pvFilter": {
    "statusCodeInclude": [
      200
    ],
    "excludePatterns": [
      "favicon.ico$",
      "robots.txt$",
      "sitemap.xml$",
      "\\.(?:js|css|jpg|jpeg|png|gif|svg|webp|woff|woff2|ttf|eot|ico)$",
      "^/api/",
      "^/ajax/",
      "^/health$",
      "^/_(?:nuxt|next)/",
      "rss.xml$",
      "feed.xml$",
      "atom.xml$"
    ],
    "excludeIPs": ["127.0.0.1", "::1"]
  }
}
```

4. 启动 ZboVix 服务
```bash
./zbovix
```

5. 访问 Web 界面
http://localhost:8088


## 从源码编译

如果您想从源码编译 ZboVix，请按照以下步骤操作：

```bash
# 克隆项目仓库
git clone https://github.com/azbo/zbovix.git
cd zbovix

# 编译项目
go mod tidy
go build -o zbovix ./cmd/nixvis/main.go

# 或使用编译脚本
# bash package.sh
```

## Docker 部署

1. 下载 docker-compose

```bash
wget https://github.com/azbo/zbovix/releases/download/docker/docker-compose.yml
wget https://github.com/azbo/zbovix/releases/download/docker/zbovix_config.json
```

2. 修改 zbovix_config.json 添加您的网站信息和日志路径

3. 修改 docker-compose.yml 添加文件挂载(zbovix_config.json、日志文件)

如需分析多个日志文件，可以考虑将日志目录整体挂载（如 /var/log/nginx:/var/log/nginx:ro）。

```yml
version: '3'
services:
  zbovix:
    image: ghcr.io/azbo/zbovix:latest
    ports:
      - "8088:8088"
    volumes:
      - ./zbovix_config.json:/app/zbovix_config.json:ro
      - /var/log/nginx/blog.log:/var/log/nginx/blog.log:ro
      - /etc/localtime:/etc/localtime:ro
```

4. 启动

```bash
docker compose up -d
```

5. 访问 Web 界面
http://localhost:8088

## 技术栈

- **后端**: Go语言 (Gin框架、ip2region地理位置查询)
- **前端**: 原生HTML5/CSS3/JavaScript (ECharts地图可视化、Chart.js图表)

## 许可证

ZboVix 使用 MIT 许可证开源发布。详情请查看 LICENSE 文件。
