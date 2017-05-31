微信公众号：

	JSSDK
	2.配置JS安全域名
		设置-公众号设置-功能设置-JS安全域名设置
		下载*.txt文件，压缩，上传到新浪SAE
		保存。。。


新浪SAE：
	服务器
	1.创建应用 标准空间 SVN
		weixindemo.applinzi.com
	8.将代码直接压缩（不带外层文件夹）上传代码包到SAE
	9.点击链接查看页面效果
	10.将网址转换成二维码，使用微信扫一扫打开页面，查看效果


代码部分：
	3.编写代码
		三个按钮，单击事件 alert()
	4.demo.zip php文件夹下的四个文件
		将四个php文件拷贝到你的文件夹下
		sample.php
	5.将index.html 修改为 index.php(只有后缀为php的文件，内部才可以写php代码)
	6.从sample.php 里面拷贝代码到 index.php中
		<?php
			require_once "jssdk.php";
			$jssdk = new JSSDK("yourAppID", "yourAppSecret");
			$signPackage = $jssdk->GetSignPackage();
			?>
		从公众号平台找到 appid appsecret 替换掉字符串
	
		<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
	
		wx.config({
		    debug: true,
		    appId: '<?php echo $signPackage["appId"];?>',
		    timestamp: <?php echo $signPackage["timestamp"];?>,
		    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
		    signature: '<?php echo $signPackage["signature"];?>',
		    jsApiList: [
		      // 所有要调用的 API 都要加到这个列表中
		    ]
		  });
		  wx.ready(function () {
		    // 在这里调用 API
		  });
	7.拍照
		wx.config({})  jsApiList: ['chooseImage']
	
		onclick = function () {
			// 从说明文档中拷贝代码
		}


