module.exports = {
    devPort: 3000,  // 开发端口
    distDir: '../public/', // 打包输出目录
    templateTitle: 'Vue app',   // 页面标题
    templateOutput: 'index.html',    // 页面输出路径，相对于 distDir
    apiRoot: '/api',    // api root path
    uploadUrl: '/upload',  // apiRoot + uploadUrl
    uploadDir: '../upload/'    // 文件保存目录
}
