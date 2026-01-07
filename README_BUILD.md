# ZboVix 编译说明

## 快速编译

### 使用国内代理（推荐）
```bash
# 设置 Go 代理为国内镜像
export GOPROXY=https://goproxy.cn,direct

# 编译
go build -o zbovix ./cmd/nixvis/main.go
```

### 或使用默认代理
```bash
go mod tidy
go build -o zbovix ./cmd/nixvis/main.go
```

## 编译输出

- **Linux/macOS**: `zbovix`
- **Windows**: `zbovix.exe`

## 使用方法

1. 生成配置文件:
```bash
./zbovix -gen-config
```

2. 编辑 `zbovix_config.json`

3. 启动服务:
```bash
./zbovix
```

4. 访问: http://localhost:8088

## 常见问题

### 网络连接错误
如果遇到 "dial tcp" 错误，请使用国内代理:
```bash
export GOPROXY=https://goproxy.cn,direct
go mod tidy
```

### 模块依赖错误
运行以下命令清理并重新下载依赖:
```bash
go clean -modcache
go mod tidy
go build -o zbovix ./cmd/nixvis/main.go
```

## 技术栈

- Go 1.23.6
- Gin Web Framework
- SQLite
- ECharts
- Chart.js

## 许可证

MIT License
