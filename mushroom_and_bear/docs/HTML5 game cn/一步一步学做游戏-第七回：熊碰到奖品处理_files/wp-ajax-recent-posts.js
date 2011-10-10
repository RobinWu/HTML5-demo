/*!
Author: QiQiBoY
Update: 20010/10/07
Author URI: http://www.qiqiboy.com/
*/

/*
################################################
contact me: 1. imqiqiboy#gmail.com
			2. http://www.qiqiboy.com/contact
			3. http://www.qiqiboy.com/guestbook
################################################
*/

;(function() {
	function $(id) {
		return document.getElementById(id)
	}
	function createxmlHttp() {
		var xmlHttp;
		try {
			xmlHttp = new XMLHttpRequest()
		} catch(e) {
			try {
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")
			} catch(e) {
				try {
					xmlHttp = new ActiveXObject("Msxml2.XMLHTTP")
				} catch(e) {
					alert("Your browser does not support ajax!");
					return false
				}
			}
		}
		return xmlHttp
	}
	function removeNode(obj){
		if(typeof obj == "string")$(obj).parentNode.removeChild($(obj));
		else obj.parentNode.removeChild(obj);
	}
	var baseurl="http://"+window.location.host+"/wp-content/";//get your blog url
	var finds=document.getElementsByTagName('link');
	for(var i=0;i<finds.length;i++){
		if(finds[i].href.indexOf('wp-content')>0){
			baseurl=finds[i].href.substring(0,finds[i].href.indexOf('wp-content')+11);
			break;
		}
	}
	function get_recent_posts(args){
		var url = '?action=wpAjaxRecentPosts&'+args;
        xmlHttp = createxmlHttp();
        xmlHttp.open("GET", url, true);
		xmlHttp.setRequestHeader("Content-type", "charset=UTF-8");
		if($('recent-post-more')||0)
			$('recent-post-more').innerHTML='<DIV style="background:url('+baseurl+'plugins/wp-ajax-recent-posts/img/loading.gif) left center no-repeat;padding-left:20px;'+')" class="ajax-loader">Loading...<p></p></DIV>';
		$('wp-recent-posts').style.cursor = 'wait';
        xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4 || xmlHttp.readyState=="complete") {
                if (xmlHttp.status == 200) {//successed!
                    var data = xmlHttp.responseText;
					removeNode($('recent-post-more'));
                    $('wp-recent-posts').innerHTML+=data;
                } else {//error!
                    $('recent-post-more').innerHTML='<p>'+xmlHttp.responseText+'</p><p>Oops, failed to load data. <small><a href="javascript:void(0);" onclick="WARP.get_recent_posts(\''+args+'\');">[Reload]</a></small></p>';
                }
				$('wp-recent-posts').style.cursor = 'auto';
            }
        };
        xmlHttp.send(null)
	}
window.WARP = {};
window.WARP['get_recent_posts'] = get_recent_posts;
})();