# 边学边实践--第一个node+express+mysql博客

[✔] 首页 tab 切换文章

[✔] 查看文章内容

[✔] 后台--更换头像 (并删除源文件)

[✔] 后台--查看个人信息

[✔] 后台--自动保存个人信息

[✔] 后台--用户注册，注册，退出登录，查看所有用户信息，删除用户相关信息，点击查看用户相关资料

[✔] 后台--查看所有文章（不是超级用户，只能看自己发布的），删除文章，编辑文章，添加文章，后台显示文章分页

[✔] 文章评论，删除个人评论，文章点赞，访问数

#### 后续补充：

[✖] 富文本图片上传处理

```
#### mysql 结构

blog -------------------- 用户表 
    id ------------------ 用户id
    username ------------ 用户名
    password ------------ 用户密码
    web ----------------- 个人信息网站
    intr ---------------- 个人介绍
    comp ---------------- 个人信息公司
    logoURL ------------- 头像路径
    isAdmin ------------- 超级会员
    creatTime ----------- 用户创建时间

news -------------------- 文章
    id ------------------ 文章id
    title --------------- 文章标题
    cont ---------------- 文章内容
    time ---------------- 文章时间
    tab ----------------- 文章分类
    name ---------------- 发表文章的用户名
    zan ----------------- 点赞数
    visit --------------- 访问量

comment ----------------- 文章评论
    id ------------------ 评论id
    nameId -------------- 评论人id
    comCont ------------- 评论内容
    contTime ------------ 评论时间
    mewsId -------------- 评论所在的文章id
    comName ------------- 评论用户名


npm install

node app.js


// 如果报类似错： sqlMessage: 'Incorrect string value: \'\\xE6\\xB5\\x8B\\xE8\\xAF\\x95...\' for column \'comCont\' at row 1'

请在mysql运行命令：
ALTER TABLE todo CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci

// todo 为表名

```
