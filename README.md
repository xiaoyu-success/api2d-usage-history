<div align="center">
<img src="https://api2d.com/logo512.png" alt="预览" height=120px/>

<h1 align="center">api2d-usage-history</h1>

一个专为API2D开发者计划成员提供的客户端使用记录查询的第三方接口

[API2D官方网站](https://api2d.com/) / [反馈 Issues](https://github.com/xiaoyu-success/api2d-usage-history/issues)

</div>

## 部署

### 环境变量

| 变量名   | 说明                   | 默认值  | 注意 |
|-------|----------------------|------|----|
| TOKEN | API2D开发者计划的Token API | 无    | 必填 |
| PORT  | 服务监听端口               | 9000 | 选填 |

### 容器部署（推荐）

#### 拉取镜像

```bash
docker pull xiaoyu2001/api2d_usage:1.0
```

#### 运行容器

```bash
docker run -d --name api2d_usage -p 9000:8000 -e TOKEN="你的API2D中Token API" -e PORT=8000 xiaoyu2001/api2d_usage:1.0
```

解释一下上面的docker运行命令，`--name`表示容器名，`9000:8000`表示将容器内的`8000`端口映射到主机的`9000`端口，而我们环境变量中的`PORT`监听端口应该与容器的端口一致，即在这里也应该同步改为`8000`。
如果你想容器默认运行在`9000`端口的话，可使用下面的命令，**记得放开服务器防火墙的`9000`端口！**

```bash
docker run -d --name api2d_usage -p 9000:9000 -e TOKEN="你的API2D中Token API" xiaoyu2001/api2d_usage:1.0
```

### 本地部署（需自行安装node.js）
```bash
npm install
```

```bash
npm start
```
> 本地部署请到`.env`文件中填写环境变量！如果要同步推送到GitHub，请注意删除`.env`文件中填写的个人Token API，否则后果自负！

## 使用方法

### 客户端请求示例

#### javascript

```javascript
fetch('http://localhost:9000', {  // http(s)://{IP}:{PORT} 此处的IP和PORT为你部署的服务器的IP和主机端口
    method: 'POST',
    headers: {
        'Authorization': 'Bearer fkxxxx' // 客户的API2D专属APIkey
    }
})
    .then(response => response.json())
    .then(res => console.log(res));
```

#### python

```python
import requests
import json

url = 'http://localhost:9000'  # http(s)://{IP}:{PORT} 此处的IP和PORT为你部署的服务器的IP和主机端口

headers = {
    'Authorization': 'Bearer fkxxxx'  # 客户的API2D专属APIkey
}

response = requests.post(url, headers=headers)

if response.status_code == 200:
    res = json.loads(response.text)
    print(res)
else:
    print('Error:', response.status_code)
```

### 返回值示例

```json
{
  "code": 200,
  "data": {
    "custom_key": {
      "uid": "uid",
      "key": "fkxxx",
      "point": 7185
    },
    "point_usage_array": [
      {
        "id": "id",
        "before_point": 7312,
        "after_point": 7270,
        "changed_at": "2023-06-xx 15:xx:xx"
      },
      {
        "id": "id",
        "before_point": 7270,
        "after_point": 7310,
        "changed_at": "2023-06-xx 15:xx:xx"
      }
    ]
  }
}
```

## 开源协议

[Anti 996 License](https://github.com/kattgu7/Anti-996-License/blob/master/LICENSE_CN_EN)
