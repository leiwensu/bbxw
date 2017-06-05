var sourceURL = 'http://192.168.24.154:8001';
$("#searchIcon").mouseenter(function(event) {
    $(this).hide();
    $("#searchInput").show('3000');
})
$(document).bind("click",function(e){
    if($(e.target).closest("#searchInput").length == 0){
        $("#searchInput").hide('3000');
        $("#searchIcon").show();
    }
})
/**
 * 侧边栏悬浮效果处理
 *
 */
function sidebarFloat(){
    var $aside = $('#aside');//获取侧边栏
    var asideH = $aside.height() + $('.header').height();//侧边栏的高度
    var asideOffsetTop = $aside.offset().top;//获取侧边栏最底的图片到顶部的距离

    var $main = $('#main');//获取主栏目
    var mainOffsetTop = $main.offset().top;//主栏目距离顶部的距离
    var mainH = $main.height() + $('.header').height();//主栏目高度
    var windowH = $(window).height();//可视区高度
    var scrollTop = 0,
        t = 0;
    $(window).scroll(function(event) {
        scrollTop = $(document).scrollTop();//获取滚动条滚动的距离
        if (mainH > asideH) {
            if (t <= scrollTop) { //下滚
                if (asideH <= windowH + scrollTop) {
                    $('.sidebar').addClass('aside_fixed')
                }
                if (mainH <= windowH + scrollTop) {
                    $('.sidebar').removeClass('aside_fixed').addClass('aside_absolute')
                }
            } else {//上滚
                if ((mainH > (windowH + scrollTop))) {
                    $('.sidebar').removeClass('aside_absolute').addClass('aside_fixed')
                }
                if (scrollTop <= asideH - windowH) {
                    $('.sidebar').removeClass('aside_fixed')
                }
            }
            setTimeout(function() {
                t = scrollTop;
            }, 0);
        }

    });
}
// 底部栏友情链接hover
function footerHover () {
    $(".footer_links_list").hover(function() {
        $(this).removeClass('limit_1_item');
    }, function() {
        $(this).addClass('limit_1_item');
    })
}
/*
 * 处理过长的字符串，截取并添加省略号
 * 注：半角长度为1，全角长度为2
 *
 * pStr:字符串
 * pLen:截取长度
 *
 * return: 截取后的字符串
 */
function autoAddEllipsis(pStr, pLen) {
    if(typeof(pStr)=="undefined" || pStr==""){
     return "";
    }
    var _ret = cutString(pStr, pLen);
    var _cutFlag = _ret.cutflag;
    var _cutStringn = _ret.cutstring;

    if ("1" == _cutFlag) {
        return _cutStringn + "...";
    } else {
        return _cutStringn;
    }
}

/*
 * 取得指定长度的字符串
 * 注：半角长度为1，全角长度为2
 *
 * pStr:字符串
 * pLen:截取长度
 *
 * return: 截取后的字符串
 */
function  cutString(pStr, pLen) {

    // 原字符串长度
    var _strLen = pStr.length;

    var _tmpCode;

    var _cutString;

    // 默认情况下，返回的字符串是原字符串的一部分
    var _cutFlag = "1";

    var _lenCount = 0;

    var _ret = false;

    if (_strLen <= pLen/2) {
        _cutString = pStr;
        _ret = true;
    }

    if (!_ret) {
        for (var i = 0; i < _strLen ; i++ ) {
            if (isFull(pStr.charAt(i))) {
                _lenCount += 2;
            } else {
                _lenCount += 1;
            }

            if (_lenCount > pLen) {
                _cutString = pStr.substring(0, i);
                _ret = true;
                break;
            } else if (_lenCount == pLen) {
                _cutString = pStr.substring(0, i + 1);
                _ret = true;
                break;
            }
        }
    }

    if (!_ret) {
        _cutString = pStr;
        _ret = true;
    }

    if (_cutString.length == _strLen) {
        _cutFlag = "0";
    }

    return {"cutstring":_cutString, "cutflag":_cutFlag};
}

/*
 * 判断是否为全角
 *
 * pChar:长度为1的字符串
 * return: true:全角
 *          false:半角
 */
function isFull (pChar) {
    if ((pChar.charCodeAt(0) > 128)) {
        return true;
    } else {
        return false;
    }
}
