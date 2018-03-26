# 边学边实践--第一个node+express+mysql博客

[✔] 首页 tab 切换文章

[✔] 查看文章内容

[✔] 后台更换头像 (并删除源文件)

[✔] 后台查看个人信息

[✔] 后台自动保存个人信息

[✔] 后台用户注册，注册，退出登录

[✔] 后台查看所有文章，删除文章，编辑文章，添加文章，后台显示文章分页

[✔] 文章评论，删除个人评论

#### 后续补充：

[✖] 文章点赞，访问数

[✖] 后台查看所有用户信息

[✖] 后台编辑，删除用户相关信息

```
npm install

node app.js


// 如果报类似错： sqlMessage: 'Incorrect string value: \'\\xE6\\xB5\\x8B\\xE8\\xAF\\x95...\' for column \'comCont\' at row 1'

请在mysql运行命令：
ALTER TABLE todo CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci

`
todo 为表名
`
```
